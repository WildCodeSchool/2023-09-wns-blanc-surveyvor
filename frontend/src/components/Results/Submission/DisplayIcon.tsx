import Icon from "@/components/Icon/Icon";
import { SubmissionAnswer } from "@/pages/surveys/[link]/results/submissions/[count]";
import { Option, Question } from "@/types/question.type";

type DisplayIconProps = {
  question: Question;
  selectedAnswer: Option | undefined;
  option: Option;
};

function DisplayIcon({ question, selectedAnswer, option }: DisplayIconProps) {
  const checkboxes = question.type.type === "checkboxes";

  if (selectedAnswer) {
    if (checkboxes) {
      return <Icon name="checkbox" width="14" />;
    } else {
      return <Icon name="check-circle" width="14" />;
    }
  } else {
    return <div className={checkboxes ? "empty-checkbox" : "empty-radio"} />;
  }
}

export default DisplayIcon;

