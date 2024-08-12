import Link from "next/link";
import React from "react";
import Icon from "../Icon/Icon";
import { Survey } from "@/types/survey.type";
import CardMenu from "../CardMenu/CardMenu";
import {
  displayNumberOfQuestions,
  displayState,
} from "@/lib/tools/survey.tools";
import { formatDate } from "@/lib/tools/format.tools";

type CardProps = {
  survey: Survey;
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
};

function SurveyCard({ survey, surveys, setSurveys }: CardProps) {
  return (
    <Link
      className="survey-card"
      href={
        survey.state.state === "draft"
          ? `/surveys/${survey.link}`
          : `/surveys/${survey.link}/results`
      }
      key={survey.id}>
      <div className={`card-header ${survey.private && "private"}`}>
        {survey.private && <Icon name="lock" height="1rem" width="1rem" />}
        <div className={`badge-md-pale-${survey.state.color}-square`}>
          <span className="dot" />
          <p>{displayState(survey.state.state)}</p>
        </div>
        <div className="mode">
          <Icon
            name={
              survey.state.state === "draft"
                ? "attribution-pencil"
                : "chart-histogram"
            }
            width="16"
          />
          <p className="text-sm">
            {survey.state.state === "draft" ? "Mode Edition" : "Mode Analyse"}
          </p>
        </div>
        <CardMenu survey={survey} surveys={surveys} setSurveys={setSurveys} />
      </div>

      <h3 className="title text-lg text--medium">{survey.title}</h3>
      <p className="description text-sm">{survey.description}</p>

      <div className="badge-sm-colored-primary-round">
        <p>{displayNumberOfQuestions(survey)}</p>
      </div>

      <p className="creation-date text-sm">
        {formatDate(Number(survey.creationDate))}
      </p>
    </Link>
  );
}

export default SurveyCard;

