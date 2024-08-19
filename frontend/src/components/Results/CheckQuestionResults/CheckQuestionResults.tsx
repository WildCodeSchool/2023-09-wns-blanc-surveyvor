import { SingleChoiceQuestionResultsProps } from "../SingleChoice/SingleChoiceQuestionResults";

type ChecksCount = {
  checked: number;
  unchecked: number;
};

function CheckQuestionResults({
  answers,
  question,
}: SingleChoiceQuestionResultsProps) {
  if (!answers) return null;

  const numberOfChecks = answers.reduce<ChecksCount>(
    (acc, answer) => {
      if (answer.content === "no_answer") {
        acc.checked += 1;
      }
      if (answer.content === question.title) {
        acc.unchecked += 1;
      }
      return acc;
    },
    { checked: 0, unchecked: 0 }
  );

  console.log(
    "checkedOrNot",
    Object.entries(numberOfChecks).map(([key, value]) => ({ key, value }))
  );

  return (
    <div className="checks-results">
      {Object.entries(numberOfChecks).map(([key, value], index) => (
        <div className={key} key={`key-${index}`}>
          {/* <p>{key === "checked" ? "Oui" : "Non"}</p> */}
          <div className="circle">
            <p>{value}</p>
            <p>soit {`${Math.round((value / answers.length) * 100)} %`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckQuestionResults;

