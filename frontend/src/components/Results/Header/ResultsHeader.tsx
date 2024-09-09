import CopyButton from "@/components/CopyButton";
import Icon from "@/components/Icon/Icon";
import Modal from "@/components/Modal/Modal";
import SendInvitationsModal from "@/components/Modal/SendInvitationsModal";
import { Survey } from "@/types/survey.type";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type ResultsHeaderProps = {
  surveyData: Survey;
  linkPath: string;
  linkText: string;
};

function ResultsHeader({ surveyData, linkPath, linkText }: ResultsHeaderProps) {
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isShowLinkModalOpen, setIsShowLinkModalOpen] = useState(false);
  const router = useRouter();
  const { link } = router.query as { link: string };

  const linkToShare = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/answers/${link}`;

  return (
    <>
      <section className="survey-info">
        <div className="info-header">
          <h2>{surveyData.title}</h2>
          <div>
            {!surveyData.private && (
              <button
                className="button-md-primary-outline"
                onClick={() => setIsShowLinkModalOpen(true)}>
                Afficher le lien
              </button>
            )}
            {surveyData.private && (
              <>
                <Icon name="lock" width="16" />
                {surveyData.state.state === "published" && (
                  <button
                    className="button-md-primary-outline"
                    onClick={() => setIsInvitationModalOpen(true)}>
                    <Icon name="user-add" width="12" />
                    <span className="hidden-mobile">Inviter</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <p className="description">{surveyData.description}</p>
        <Link href={linkPath} className="button-md-primary-solid">
          {linkText}
        </Link>
      </section>

      {isInvitationModalOpen && (
        <SendInvitationsModal
          setIsModalOpen={setIsInvitationModalOpen}
          isModalOpen={isInvitationModalOpen}
          link={link}
        />
      )}

      {isShowLinkModalOpen && (
        <Modal
          isOpen={isShowLinkModalOpen}
          setIsOpen={setIsShowLinkModalOpen}
          title="Lien du sondage">
          <>
            <p className="link">{linkToShare}</p>
            <CopyButton textToCopy={linkToShare} />
          </>
        </Modal>
      )}
    </>
  );
}

export default ResultsHeader;

