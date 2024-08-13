import { OnSubmitAnswersType } from "@/types/onSubmitAnswers.type";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";
import { delay } from "./delay.tools";
import { TIME_TOAST } from "@/pages/answers/[link]";
import { FormEvent } from "react";

export const getNumberOfQuestions = (
  questions: QuestionForAnswerPage[] | undefined,
  defaultQuestions: QuestionForAnswerPage[] | undefined
): number => {
  let questionsTotalNumber: number = 0;
  let questionsNonDefaultNumber: number = 0;
  let questionsDefaulNumber: number = 0;
  if (questions) questionsNonDefaultNumber = questions.length;
  if (defaultQuestions) questionsDefaulNumber = defaultQuestions.length;
  questionsTotalNumber = questionsNonDefaultNumber + questionsDefaulNumber;
  return questionsTotalNumber;
};

export const onSubmitAnswers = (
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
    token,
    submissionId,
  }: OnSubmitAnswersType,
  event: FormEvent
): void => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const answersInForm: { [key: string]: string } = {};
  const unansweredQuestions: Array<string> = [];

  const formElement = event.target as HTMLFormElement;
  // Get all input elements
  const inputs = formElement.querySelectorAll("input");

  // Keep track of radio button and checkbox groups
  const radioGroups = new Set<string>();
  const checkboxGroups = new Set<string>();

  // Collect all radio groups and checkbox group
  inputs.forEach((input) => {
    if (input.type === "radio") {
      radioGroups.add(input.name);
    }
    if (input.type === "checkbox" && !input.id.startsWith("question-input")) {
      for (let i = 0; i < checkboxQuestion.length; i++) {
        if (checkboxQuestion[i] !== input.name) {
          checkboxGroups.add(input.name);
        }
      }
    }
    if (input.id.startsWith("question-input")) {
      answersInForm[input.name] = JSON.stringify(["no_answer"]);
    }
  });

  // Check formData for all keys and radio groups and checkboxes groups
  for (const key of formData.keys()) {
    if (formData.get(key)) {
      answersInForm[key] = JSON.stringify(formData.getAll(key));
      radioGroups.delete(key); // Remove from radio groups if answered
      checkboxGroups.delete(key); // Remove from checkbox groups if answered
    } else {
      unansweredQuestions.push(key);
    }
  }

  // Check any remaining radio groups
  radioGroups.forEach((group) => {
    const radios = formElement.querySelectorAll(`input[name="${group}"]`);
    let isChecked = false;
    radios.forEach((radio) => {
      if ((radio as HTMLInputElement).checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      unansweredQuestions.push(group);
    }
  });

  // Check any remaining checkbox groups
  checkboxGroups.forEach((group) => {
    const checkboxes = formElement.querySelectorAll(`input[name="${group}"]`);
    let isChecked = false;
    checkboxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      unansweredQuestions.push(group);
    }
  });

  // check if all questions are answered
  if (callbackGetNumberOfQuestions() === Object.keys(answersInForm).length) {
    setModal({
      isOpen: true,
      content: "Êtes-vous certain de vouloir envoyer vos réponses ?",
    });
    setPendingAction(() => async () => {
      let answersPosted: boolean = false;
      for (let [key, value] of Object.entries(answersInForm)) {
        if (value && JSON.parse(value).length === 0) {
          console.error("Answer is empty");
        } else {
          if (key.startsWith("input-date_") || key.startsWith("question_")) {
            key = key.split("_")[1];
          }

          const answersInValue = JSON.parse(value);
          const regexUUID =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
          let optionToSend: string = "";
          let contentToSend: string = "";
          if (answersInValue[0].match(regexUUID)) {
            optionToSend = answersInValue;
          } else {
            contentToSend = answersInValue[0];
          }
          try {
            console.log(submissionId);

            await postAnswer({
              variables: {
                user: token,
                option: optionToSend,
                question: key,
                content: contentToSend,
                submission: submissionId,
              },
            });
            answersPosted = true;
          } catch (error) {
            console.error("Error posting answer:", error);
          }
        }
      }
      if (answersPosted) {
        Toast.fire({
          icon: "success",
          title: "Votre formulaire a bien été envoyé.",
        });
        await delay(TIME_TOAST);
        router.push("/");
      } else {
        console.error("No answers posted");
      }
    });
  } else {
    Toast.fire({
      icon: "error",
      title: "Les champs ne sont pas tous remplis",
    });

    unansweredQuestions.forEach((question) => {
      let questionId: string = question;
      let questionsCopy = [...(questions as QuestionForAnswerPage[])];
      let defaultQuestionsCopy = [
        ...(defaultQuestions as QuestionForAnswerPage[]),
      ];
      if (questionsCopy) {
        if (question.startsWith("input-date_"))
          questionId = question.split("_")[1];
        for (let i = 0; i < questionsCopy.length; i++) {
          if (questionsCopy[i].id === questionId) {
            questionsCopy[i]["isError"] = true;
            setQuestions(questionsCopy);
          }
        }
      }
      if (defaultQuestionsCopy) {
        if (question.startsWith("question_"))
          questionId = question.split("_")[1];
        for (let i = 0; i < defaultQuestionsCopy.length; i++) {
          if (defaultQuestionsCopy[i].id === questionId) {
            defaultQuestionsCopy[i].isError = true;
            setDefaultQuestions(defaultQuestionsCopy);
          }
        }
      }
    });
  }
};

