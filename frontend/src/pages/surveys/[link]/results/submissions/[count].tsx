import Icon from "@/components/Icon/Icon";
import Header from "@/components/Results/Header/ResultsHeader";
import DisplayAnswers from "@/components/Results/Submission/DisplayAnswers";
import NavLayout from "@/layouts/NavLayout";
import {
  GET_NUMBER_OF_SUBMISSIONS,
  GET_SUBMISSION_BY_COUNT,
} from "@/lib/queries/submission.queries";
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
  const maxVisibleButtons = 8;
  const halfMax = Math.floor(maxVisibleButtons / 2);

  let startPage = Math.max(currentPage - halfMax, 1);
  let endPage = Math.min(currentPage + halfMax, totalPages);

  if (currentPage <= halfMax) {
    endPage = Math.min(maxVisibleButtons, totalPages);
  } else if (currentPage > totalPages - halfMax) {
    startPage = Math.max(totalPages - maxVisibleButtons + 1, 1);
  }

  return (
    <div className="submission-results">
      <Header
        surveyData={surveyData.getSurveyByLink}
        linkPath={`/surveys/${link}/results`}
        linkText="Retour aux statistiques"
      />

      <div className="pagination">
        <Link
          href={`/surveys/${link}/results/submissions/${currentPage - 1}`}
          className={currentPage === 1 ? "disabled" : ""}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : undefined}>
          <Icon name="arrow-left-small" width="20" />
        </Link>

        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const page = startPage + index;
          return (
            <Link
              className={currentPage === page ? "active" : ""}
              key={index}
              href={`/surveys/${link}/results/submissions/${index + 1}`}>
              {page}
            </Link>
          );
        })}

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

