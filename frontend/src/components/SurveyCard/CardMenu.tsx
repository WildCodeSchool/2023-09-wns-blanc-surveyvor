import { cardMenuOptions } from "@/lib/data/data";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { Survey } from "@/types/survey.type";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ARCHIVE_SURVEY, DELETE_SURVEY } from "@/lib/queries/survey.queries";
import useClickOutside from "@/lib/hooks/useClickOutside";
import Modal from "../Modal/Modal";
import SendInvitationsModal from "../Modal/SendInvitationsModal";

function CardMenu({
  survey,
  surveys,
  setSurveys,
}: {
  survey: Survey;
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
}) {
  //   ------------------------------------------------hooks-----------------------------------------------

  const [isCardMenuOpen, setIsCardMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isInvitationModalOpen, setIsInvitationModalOpen] =
    useState<boolean>(false);
  const router: NextRouter = useRouter();
  const { ref } = useClickOutside(isCardMenuOpen, setIsCardMenuOpen);

  //   ------------------------------------------------queries-----------------------------------------------

  const [archiveSurvey] = useMutation(ARCHIVE_SURVEY);
  const [deleteSurvey] = useMutation(DELETE_SURVEY);

  //   ------------------------------------------------functions-----------------------------------------------

  const onClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      option: string,
      survey: Survey
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setIsCardMenuOpen(false);

      const canArchive =
        survey.state.state === "closed" || survey.state.state === "archived";

      switch (option) {
        case "Modifier":
          return router.push(`/surveys/${survey.link}`);

        case "Inviter":
          return setIsInvitationModalOpen(true);

        case "Archiver":
          return (
            canArchive &&
            archiveSurvey({
              variables: {
                link: survey.link,
                archive: survey.archived ? false : true,
              },
              onCompleted: (data) => {
                const index = surveys.findIndex(
                  (survey) => survey.link === data.archiveSurvey.link
                );

                const newSurveys = [...surveys];
                newSurveys.splice(index, 1, data.archiveSurvey);

                setSurveys(newSurveys);
              },
              onError: (error) => {
                console.error("Error archiving survey:", error);
              },
            })
          );

        case "Supprimer":
          return setIsDeleteModalOpen(true);
      }
    },
    [
      survey,
      archiveSurvey,
      setIsDeleteModalOpen,
      deleteSurvey,
      surveys,
      setSurveys,
    ]
  );

  //   ------------------------------------------------return-----------------------------------------------

  return (
    <div className="filters-container">
      <button
        className="settings"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsCardMenuOpen(!isCardMenuOpen);
        }}>
        <Icon name="dots" height="1rem" width="1rem"></Icon>
      </button>
      {isCardMenuOpen && (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="dropdown-wrapper"
          onBlur={() => setIsCardMenuOpen(false)}>
          {cardMenuOptions.map((option) => {
            const disableArvhive =
              option.option === "Archiver" &&
              survey.state.state !== "closed" &&
              survey.state.state !== "archived";

            const disableEdit =
              option.option === "Modifier" && survey.state.state !== "draft";

            if (!survey.private && option.option === "Inviter") {
              return null;
            }

            return (
              <button
                key={option.id}
                className="dropdown-item"
                type="button"
                value={option.option}
                name={option.option}
                disabled={disableArvhive || disableEdit}
                onClick={(e) => onClick(e, option.option, survey)}>
                <Icon name={option.icon} height="1rem" width="1rem" />
                {survey.archived && option.option === "Archiver"
                  ? "Restaurer"
                  : option.option}
              </button>
            );
          })}
        </div>
      )}

      {isInvitationModalOpen && (
        <SendInvitationsModal
          isModalOpen={isInvitationModalOpen}
          setIsModalOpen={setIsInvitationModalOpen}
          link={survey.link}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Supprimer un formulaire"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}>
          <>
            <p>
              Etes-vous certain de vouloir supprimer le sondage
              <span className="bold">{survey.title}</span> ?
            </p>
            <div className="modal-actions">
              <button
                className="button-md-primary-outline"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleteModalOpen(false);
                }}>
                Annuler
              </button>
              <button
                className="button-md-error-solid"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  deleteSurvey({
                    variables: {
                      link: survey.link,
                    },
                    onCompleted: () =>
                      setSurveys(surveys.filter((s) => s.link !== survey.link)),
                  });
                }}>
                Supprimer
              </button>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
}

export default CardMenu;

