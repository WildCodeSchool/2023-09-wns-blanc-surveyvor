import { Option, Question } from "@/types/question.type";
import { Reorder } from "framer-motion";
import Input from "./Input";
import Icon from "./Icon/Icon";
import { useState } from "react";

export default function QuestionOptions({
  questions,
  setQuestions,
  questionId,
}: {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  questionId: string;
}) {
  const currentQuestion: Question | null =
    questions.find((question) => question.id === questionId) || null;

  const [questionOptions, setQuestionOptions] = useState<Option[] | []>(
    currentQuestion?.options || []
  );

  function handleQuestionOptionRemove(index: number, event: React.MouseEvent) {
    event.preventDefault();

    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          if (question.options) {
            question.options = question.options.filter(
              (option, optionIndex) => optionIndex !== index
            );
          }
        }
        return question;
      })
    );

    setQuestionOptions(
      questionOptions.filter((option, optionIndex) => optionIndex !== index)
    );
  }

  function handleQuestionOptionAdd(event: React.MouseEvent) {
    event.preventDefault();

    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          if (question.options) {
            question.options = [
              ...question.options,
              {
                id: "",
                content: "",
                sort: question.options.length + 1,
              },
            ];
          } else {
            question.options = [{ id: "", content: "", sort: 1 }];
          }
        }
        return question;
      })
    );

    setQuestionOptions([
      ...questionOptions,
      {
        id: "",
        content: "",
        sort: questionOptions.length + 1,
      },
    ]);
  }
  function updateQuestions(value: string, index: number) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          options:
            question.options &&
            question.options.map((option, optionIndex) =>
              optionIndex === index
                ? {
                    ...option,
                    content: value,
                    sort: optionIndex + 1,
                  }
                : option
            ),
        };
      }
      return question;
    });

    setQuestions(updatedQuestions);

    setQuestionOptions(
      questionOptions.map((option, optionIndex) =>
        optionIndex === index
          ? {
              ...option,
              content: value,
              sort: optionIndex + 1,
            }
          : option
      )
    );
  }

  function handleOptionsReorder(options: Option[]) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          options: options.map((option, optionIndex) => ({
            id: option.id,
            content: option.content,
            sort: optionIndex + 1,
          })),
        };
      }
      return question;
    });
    console.log("passing here 104");
    setQuestionOptions(options);
    setQuestions(updatedQuestions);
  }

  return (
    <div className="options">
      <p className="subtitle">Options</p>
      {questionOptions.length > 0 && (
        <Reorder.Group
          axis="y"
          values={questionOptions}
          onReorder={handleOptionsReorder}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {questionOptions.map((option, index) => (
            <Reorder.Item key={index} value={option}>
              <div className="option" key={index}>
                <Input
                  inputName={`option-${index}`}
                  value={option.content}
                  setValue={(value: string) => updateQuestions(value, index)}
                  placeholder="Option"
                />
                <button
                  className="button-md-grey-outline"
                  onClick={(event) => handleQuestionOptionRemove(index, event)}
                >
                  <Icon name="trash" />
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
      <button
        className="button-md-grey-outline"
        onClick={(event) => handleQuestionOptionAdd(event)}
      >
        Ajouter une option
        <Icon name="plus" />
      </button>
    </div>
  );
}
