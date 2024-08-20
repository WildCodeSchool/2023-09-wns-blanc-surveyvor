import Icon from "@/components/Icon/Icon";
import Pagination from "@/components/Pagination/Pagination";
import DisplayAnswers from "@/components/Results/Submission/DisplayAnswers";
import NavLayout from "@/layouts/NavLayout";
import { GET_SUBMISSION_BY_COUNT } from "@/lib/queries/submission.queries";
import { formatDate } from "@/lib/tools/format.tools";
import { Option, Question } from "@/types/question.type";
import { Answer } from "@/types/questionForAnswerPage.type";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactElement } from "react";

export type SubmissionAnswer = {
  content: string;
  selectedOptions: Option[] | null;
  question: Question;
};

const GET_SURVEY_BY_LINK = gql`
  query Query($surveyLink: String!) {
    getSurveyByLink(surveyLink: $surveyLink) {
      title
      description
      publicationDate
      endDate
      private
      question {
        options {
          content
          id
          sort
        }
        title
        type {
          type
          icon
        }
        description
        defaultQuestion
        id
      }
      startDate
      state {
        state
        color
      }
    }
  }
`;

const GET_NUMBER_OF_SUBMISSIONS = gql`
  query Query($surveyLink: String!) {
    getNumberOfSubmissions(surveyLink: $surveyLink)
  }
`;

function Submission() {
  const router = useRouter();
  const { link, count } = router.query;

  const {
    data: numberOfSubmissions,
    loading: numberOfSubmissionsLoading,
    error: numberOfSubmissionsError,
  } = useQuery(GET_NUMBER_OF_SUBMISSIONS, {
    variables: {
      surveyLink: link,
    },
  });

  const {
    data: surveyData,
    loading: surveyLoading,
    error: surveyError,
  } = useQuery(GET_SURVEY_BY_LINK, {
    variables: {
      surveyLink: link,
    },
  });

  const {
    data: submissionData,
    loading: submissionLoading,
    error: submissionError,
  } = useQuery(GET_SUBMISSION_BY_COUNT, {
    variables: {
      surveyLink: link,
      count: Number(count),
    },
  });

  if (submissionLoading || surveyLoading || numberOfSubmissionsLoading) {
    return <div>Loading...</div>;
  }

  if (submissionError || surveyError || numberOfSubmissionsError) {
    return <div>Error</div>;
  }

  const submissionDate = formatDate(
    Number(submissionData.getSubmissionByCount.date)
  );

  const questions = surveyData.getSurveyByLink.question;

  const totalPages = numberOfSubmissions.getNumberOfSubmissions;
  const currentPage = Number(count);

  console.log("currentPage", currentPage);

  return (
    <div className="submission-results">
      <section className="survey-info">
        <div className="info-header">
          <h2>{surveyData.getSurveyByLink.title}</h2>
          {surveyData.getSurveyByLink.private && (
            <Icon name="lock" width="16" />
          )}
        </div>
        <p className="description">{surveyData.getSurveyByLink.description}</p>
      </section>

      <div className="pagination">
        <Link
          href={`/surveys/${link}/results/submissions/${currentPage - 1}`}
          className={currentPage === 1 ? "disabled" : ""}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : undefined}>
          <Icon name="arrow-left-small" width="20" />
        </Link>

        {[...Array(totalPages)].map((_, index) => (
          <Link
            className={currentPage === index + 1 ? "active" : ""}
            key={index}
            href={`/surveys/${link}/results/submissions/${index + 1}`}>
            {index + 1}
          </Link>
        ))}

        <Link
          href={`/surveys/${link}/results/submissions/${currentPage + 1}`}
          className={currentPage === totalPages ? "disabled" : ""}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : undefined}>
          <Icon name="arrow-right-small" width="20" />
        </Link>
      </div>

      <h3 className="submission-number">
        Soumission N° {count} <span className="date">{submissionDate}</span>
      </h3>
      <section className="submission">
        {questions.map((question: Question) => {
          const answerMatchQuestion: SubmissionAnswer =
            submissionData.getSubmissionByCount.answer.find(
              (answer: SubmissionAnswer) => answer.question.id === question.id
            );

          return (
            <div className="question-answer" key={question.id}>
              <div className="question-header">
                <div className="title">
                  <h3>{question.title}</h3>
                </div>
                <p className="description">{question.description}</p>
              </div>

              <DisplayAnswers
                answer={answerMatchQuestion}
                question={question}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}

Submission.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout backToForms signOut>
      {page}
    </NavLayout>
  );
};

export default Submission;

