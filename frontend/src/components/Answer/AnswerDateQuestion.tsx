import { Question } from "@/types/question.type";
import { fr } from "date-fns/locale";
import { forwardRef, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Input from "../Input";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";
import "../../../node_modules/react-datepicker/src/stylesheets/datepicker.scss";
import "../../../node_modules/react-datepicker/src/stylesheets/datepicker-cssmodules.scss";

interface CustomInputProps {
  value: string;
  inputName: string;
  onClick?: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, inputName, setValue, type, ...rest }, ref) => {
    return (
      <Input
        value={value}
        onClick={onClick}
        ref={ref}
        type={type}
        inputName={inputName}
        setValue={setValue}
        {...rest}
      />
    );
  }
);
CustomInput.displayName = "CustomInput";

registerLocale("fr", fr);
function AnswerDateQuestion({
  question,
  questions,
  setQuestions,
}: {
  question: Question;
  questions: QuestionForAnswerPage[] | undefined;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionForAnswerPage[]>>;
}) {
  const [typeOfDate, setTypeOfDate] = useState<string>("");
  useEffect(() => {
    question.options && question.options[0].content
      ? setTypeOfDate(question.options[0].content)
      : setTypeOfDate("date");
  }, [question.options]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(``);
  const onChangePeriod = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const updatedQuestion =
      questions &&
      questions.map((q) => {
        if (q.id === question.id) {
          return { ...q, isError: false };
        } else {
          return q;
        }
      });
    if (updatedQuestion) {
      setQuestions(updatedQuestion);
    }
  };
  const onChangeDate = (date: any) => {
    const start = date;
    setStartDate(start);
    const updatedQuestion =
      questions &&
      questions.map((q) => {
        if (q.id === question.id) {
          return { ...q, isError: false };
        } else {
          return q;
        }
      });
    if (updatedQuestion) {
      setQuestions(updatedQuestion);
    }
  };
  return (
    <>
      <div>
        {typeOfDate === "period" ? (
          <DatePicker
            selected={startDate}
            onChange={onChangePeriod}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd/MM/yyyy"
            locale="fr"
            placeholderText="Sélectionner une période"
            customInput={
              <CustomInput
                type="text"
                inputName={`input-date_${question.id}`}
                value={date}
                setValue={setDate}
              />
            }
          />
        ) : (
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            dateFormat="dd/MM/yyyy"
            locale="fr"
            placeholderText="Sélectionner une date"
            customInput={
              <CustomInput
                type="text"
                inputName={`input-date_${question.id}`}
                value={date}
                setValue={setDate}
              />
            }
          />
        )}
      </div>
    </>
  );
}

export default AnswerDateQuestion;

