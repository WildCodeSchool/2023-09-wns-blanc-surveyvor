import { Answer } from "@/types/question.type";

function AnswerCheckboxQuestion({ answerOption }: { answerOption: Answer }) {
  return (
    <div className="input-checkbox--sm checkbox-container">
      <label htmlFor={answerOption.id} className="checkbox-label">{answerOption.content}</label>
      <input id={answerOption.id} type="checkbox" className="checkbox-input"></input>
    </div>
  )
}

export default AnswerCheckboxQuestion;
