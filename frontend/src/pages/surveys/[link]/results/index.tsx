import Icon from "@/components/Icon/Icon";
import TextOrDateQuestionResults from "@/components/Results/TextOrDateQuestionResults/TextOrDateQuestionResults";
import MultipleChoiceQuestionResults from "@/components/Results/MultipleChoice/MultipleChoiceQuestionResults";
import SingleChoiceQuestionResults from "@/components/Results/SingleChoice/SingleChoiceQuestionResults";
import NavLayout from "@/layouts/NavLayout";
import { GET_SURVEY_ANSWERS } from "@/lib/queries/survey.queries";
import { Question } from "@/types/question.type";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import CheckQuestionResults from "@/components/Results/CheckQuestionResults/CheckQuestionResults";
import ResultsHeader from "@/components/Results/Header/ResultsHeader";
import { GET_NUMBER_OF_SUBMISSIONS } from "@/lib/queries/submission.queries";

function Results() {
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
    data: numberOfSubmissions,
    loading: numberOfSubmissionsLoading,
    error: numberOfSubmissionsError,
  } = useQuery(GET_NUMBER_OF_SUBMISSIONS, {
    variables: {
      surveyLink: link,
    },
  });

  if (surveyLoading || numberOfSubmissionsLoading) {
    return <div>Loading...</div>;
  }

  if (surveyError || numberOfSubmissionsError) {
    return <div>Error</div>;
  }

  return (
    <div className="results">
      <ResultsHeader
        surveyData={surveyData.getSurveyByLink}
        linkPath={`/surveys/${link}/results/submissions/1`}
        linkText="Consulter chaque réponse"
      />
      {!numberOfSubmissions.getNumberOfSubmissions ? (
        <div className="no-submissions">
          Aucune réponse n'a été soumise pour le moment.
        </div>
      ) : (
        surveyData.getSurveyByLink.question.map((question: Question) => {
          const props = {
            question: question,
            answers: question.answers,
          };

          return (
            <section className="question-results" key={question.id}>
              <div className="question-header">
                <div className="title">
                  <Icon name={question.type.icon} width="16" />
                  <h3>{question.title}</h3>
                </div>
                <p className="description">{question.description}</p>
              </div>

              {(question.type.type === "text" ||
                question.type.type === "date") && (
                <TextOrDateQuestionResults answers={question.answers} />
              )}

              {question.type.type === "checkboxes" && (
                <MultipleChoiceQuestionResults {...props} />
              )}

              {question.type.type === "radio" && (
                <SingleChoiceQuestionResults {...props} />
              )}

              {question.type.type === "checkbox" && (
                <CheckQuestionResults {...props} />
              )}
            </section>
          );
        })
      )}
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

