import Icon from "@/components/Icon/Icon";
import MultipleChoiceQuestionResults from "@/components/Results/MultipleChoiceQuestionResults";
import TextQuestionResults from "@/components/Results/TextQuestionResults";
import NavLayout from "@/layouts/NavLayout";
import { GET_SUBMISSIONS_BY_SURVEY_LINK } from "@/lib/queries/submission.queries";
import {
  GET_SURVEY_ANSWERS,
  GET_SURVEY_BY_LINK,
} from "@/lib/queries/survey.queries";
import { Question } from "@/types/question.type";
import { Answer } from "@/types/questionForAnswerPage.type";
import { Submission } from "@/types/submission.type";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

function Results() {
  const [submissions, setSubmisions] = useState<Submission[]>([]);

  const router = useRouter();
  const link = router.query.link;

  const {
    data: surveyData,
    loading: surveyLoading,
    error: surveyError,
  } = useQuery(GET_SURVEY_ANSWERS, {
    variables: {
      surveyLink: link,
    },
  });

  const {
    data: submissionData,
    loading: submissionLoading,
    error: submissionError,
  } = useQuery(GET_SUBMISSIONS_BY_SURVEY_LINK, {
    variables: {
      surveyLink: link,
    },
    onCompleted: (data) => {
      setSubmisions(data.getSubmissionsBySurveyLink);
    },
  });

  if (surveyLoading || submissionLoading) {
    return <div>Loading...</div>;
  }

  if (surveyError || submissionError) {
    return <div>Error</div>;
  }

  console.log("survey", surveyData);

  const questions: any = [1, 2, 1];
  return (
    <div className="results">
      <section className="survey-info">
        <div className="info-header">
          <h2>{surveyData.getSurveyByLink.title}</h2>
          {surveyData.getSurveyByLink.private && (
            <Icon name="lock" width="16" />
          )}
          <button className="button-sm-primary-outline">
            <Icon name="pen-clip" width="16" />
          </button>
        </div>
        <p className="description">{surveyData.getSurveyByLink.description}</p>
        <button className="button-md-primary-solid">
          Consulter chaque réponse
        </button>
      </section>
      {surveyData.getSurveyByLink.question.map((question: Question) => {
        return (
          <section className="question-results" key={question.id}>
            <div className="question-header">
              <div className="title">
                <Icon name={question.type.icon} width="16" />
                <h3>{question.title}</h3>
              </div>
              <p className="description">{question.description}</p>
            </div>

            {question.type.type === "text" && (
              <TextQuestionResults answers={question.answers} />
            )}

            {question.type.type === "checkboxes" && (
              <MultipleChoiceQuestionResults answers={question.answers} />
            )}
          </section>
        );
      })}
    </div>
  );
}

Results.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout backToForms signOut>
      {page}
    </NavLayout>
  );
};

export default Results;

