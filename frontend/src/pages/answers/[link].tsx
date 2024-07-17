import AnswerCheckboxQuestion from "@/components/Answer/AnswerCheckboxQuestion";
import AnswerCheckboxesQuestion from "@/components/Answer/AnswerCheckboxesQuestion";
import AnswerDateQuestion from "@/components/Answer/AnswerDateQuestion";
import AnswerDefaultQuestion from "@/components/Answer/AnswerDefaultQuestion";
import AnswerRadioQuestion from "@/components/Answer/AnswerRadioQuestion";
import AnswerTextQuestion from "@/components/Answer/AnswerTextQuestion";
import QuestionDispatcher from "@/components/Answer/QuestionDispatcher";
import Icon from "@/components/Icon/Icon";
import Modal from "@/components/Modal/Modal";
import NavLayout from "@/layouts/NavLayout";
import { POST_ANSWER } from "@/lib/queries/answer.queries";
import { GET_SURVEY_BY_LINK } from "@/lib/queries/survey.queries";
import {
  getNumberOfQuestions,
  onSubmitAnswers,
} from "@/lib/tools/answer.tools";
import { delay } from "@/lib/tools/delay.tools";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";

export const TIME_TOAST = 3000;

export type ModalProps = {
  isOpen: boolean;
  content: string;
};

function AnswerSurvey() {
  const [questions, setQuestions] = useState<
    QuestionForAnswerPage[] | undefined
  >(undefined);
  const [defaultQuestions, setDefaultQuestions] = useState<
    QuestionForAnswerPage[] | undefined
  >(undefined);
  const [checkboxQuestion, setCheckboxQuestion] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [answers, setAnswers] = useState({});

  const router = useRouter();
  const { link } = router.query as { link: string };

  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    content: "",
  });
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const [getSurveyByLink, { loading, error }] =
    useLazyQuery(GET_SURVEY_BY_LINK);

  useEffect(() => {
    if (link) {
      getSurveyByLink({
        variables: {
          surveyLink: link,
        },
        onCompleted: (data) => {
          setTitle(data.getSurveyByLink.title);
          setDescription(data.getSurveyByLink.description);
          setIsPrivate(data.getSurveyByLink.private);
          let nonDefaultQuestions = [];
          let defaultQuestions = [];
          let checkboxQuestion = [];
          for (let i = 0; i < data.getSurveyByLink.question.length; i++) {
            const question = {
              ...data.getSurveyByLink.question[i],
              isError: false,
            };
            if (question.defaultQuestion) {
              defaultQuestions.push(question);
            } else {
              nonDefaultQuestions.push(question);
            }
            if (question.type.type === "checkbox") {
              checkboxQuestion.push(question.id);
            }
          }
          setDefaultQuestions(defaultQuestions);
          setQuestions(nonDefaultQuestions);
          setCheckboxQuestion(checkboxQuestion);
        },
      });
    }
  }, [getSurveyByLink, link]);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: TIME_TOAST,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const callbackGetNumberOfQuestions = useCallback(
    () => getNumberOfQuestions(questions, defaultQuestions),
    [questions, defaultQuestions]
  );

  const [postAnswer] = useMutation(POST_ANSWER);

  const callbackOnSubmit = useCallback(
    (event: FormEvent) =>
      onSubmitAnswers(
        {
          questions,
          setQuestions,
          defaultQuestions,
          setDefaultQuestions,
          callbackGetNumberOfQuestions,
          postAnswer,
          setPendingAction,
          checkboxQuestion,
          setModal,
          Toast,
          router,
        },
        event
      ),
    [
      questions,
      defaultQuestions,
      callbackGetNumberOfQuestions,
      postAnswer,
      checkboxQuestion,
      Toast,
      router,
    ]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <form id="answer-form" onSubmit={callbackOnSubmit}>
        <div className="answer-survey-container">
          <div className="answer-survey-data-container">
            <div className="answer-survey-title-container">
              <h1 className="answer-survey-title">{title}</h1>
              {isPrivate && <Icon name="lock" height="1.5rem" width="1.5rem" />}
            </div>
            <p className="answer-survey-description">{description}</p>
          </div>
          {defaultQuestions && defaultQuestions.length > 0 && (
            <div className="answer-survey-default-questions-container">
              {defaultQuestions.map((defaultQuestion) => {
                if (defaultQuestion.id) {
                  return (
                    <div key={defaultQuestion.id}>
                      <AnswerDefaultQuestion
                        defaultQuestion={defaultQuestion}
                        setAnswers={setAnswers}
                        answers={answers}
                        isError={defaultQuestion.isError}
                        defaultQuestions={defaultQuestions}
                        setDefaultQuestions={setDefaultQuestions}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
          {questions && questions.length > 0 && (
            <div className="answer-survey-questions-container">
              {questions.map((question) => {
                return (
                  <div
                    id={question.id}
                    className={`answer-container ${
                      question.isError ? "is-error" : ""
                    }`}
                    key={question.id}
                  >
                    {question.type.type !== "checkbox" && (
                      <p className="answer-title">{question.title}</p>
                    )}
                    {question.type.type !== "checkbox" &&
                      question.description && (
                        <p className="answer-description">
                          {question.description}
                        </p>
                      )}
                    <QuestionDispatcher
                      question={question}
                      questionList={questions}
                      setQuestions={setQuestions}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <button className="button-send-answer button-md-primary-solid">
            <Icon name="paper-plane-top" />
            Envoyer la réponse
          </button>
        </div>
      </form>
      {modal.isOpen && (
        <Modal
          title={modal.content}
          isOpen={modal.isOpen}
          setIsOpen={() => setModal({ isOpen: false, content: "" })}
        >
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                pendingAction();
                setModal({ isOpen: false, content: "" });
              }}
              className="button-md-error-solid"
            >
              Confirmer
            </button>
            <button
              onClick={() => setModal({ isOpen: false, content: "" })}
              className="button-md-primary-outline"
            >
              Annuler
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

AnswerSurvey.getLayout = function getLayout(page: ReactElement) {
  let layoutNavToDisplay;
  const token = localStorage.getItem("token");
  if (token) {
    layoutNavToDisplay = (
      <NavLayout newSurvey backToForms profile signOut>
        {page}
      </NavLayout>
    );
  } else {
    layoutNavToDisplay = <NavLayout signInOrSignUp>{page}</NavLayout>;
  }
  return layoutNavToDisplay;
};

export default AnswerSurvey;
