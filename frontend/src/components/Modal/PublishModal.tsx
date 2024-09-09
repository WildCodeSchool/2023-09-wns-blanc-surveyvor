import React, { useState } from "react";
import Modal from "./Modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PUBLISH_SURVEY } from "@/lib/queries/survey.queries";
import { useRouter } from "next/router";
import { toast } from "@/lib/tools/toast.tools";
import { emailFormat } from "@/lib/tools/format.tools";

type PublishModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PublishModal({ isModalOpen, setIsModalOpen }: PublishModalProps) {
  const router = useRouter();
  const { link } = router.query;

  const [publishSurvey] = useMutation(PUBLISH_SURVEY);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Publier le formulaire?">
      <>
        <p>Le formulaire ne pourra plus être modifier.</p>
        <div className="modal-actions">
          <button
            className="button-md-primary-outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}>
            Annuler
          </button>
          <button
            className="button-md-error-solid"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              publishSurvey({
                variables: {
                  link: link,
                },
                onCompleted: () => {
                  setIsModalOpen(false);
                  router.push("/dashboard");
                  toast("success", "Formulaire publié");
                },
              });
            }}>
            Publier
          </button>
        </div>
      </>
    </Modal>
  );
}

export default PublishModal;

