import Icon from "@/components/Icon/Icon";
import SendInvitationsModal from "@/components/Modal/SendInvitationsModal";
import { Survey } from "@/types/survey.type";
import Link from "next/link";
import { useState } from "react";

type ResultsHeaderProps = {
  surveyData: Survey;
  linkPath: string;
  linkText: string;
};

function ResultsHeader({ surveyData, linkPath, linkText }: ResultsHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(surveyData);
  return (
    <>
      <section className="survey-info">
        <div className="info-header">
          <h2>{surveyData.title}</h2>
          {surveyData.private && (
            <div>
              <Icon name="lock" width="16" />
              {surveyData.state.state === "published" && (
                <button
                  className="button-md-primary-outline"
                  onClick={() => setIsModalOpen(true)}>
                  <Icon name="user-add" width="12" />
                  <span className="hidden-mobile">Inviter</span>
                </button>
              )}
            </div>
          )}
        </div>
        <p className="description">{surveyData.description}</p>
        <Link href={linkPath} className="button-md-primary-solid">
          {linkText}
        </Link>
      </section>

      {isModalOpen && (
        <SendInvitationsModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
}

export default ResultsHeader;

