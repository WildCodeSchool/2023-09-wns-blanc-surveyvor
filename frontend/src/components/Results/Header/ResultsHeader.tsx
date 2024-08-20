import Icon from "@/components/Icon/Icon";
import { Survey } from "@/types/survey.type";
import Link from "next/link";
import React from "react";

type ResultsHeaderProps = {
  surveyData: Survey;
  linkPath: string;
  linkText: string;
};

function ResultsHeader({ surveyData, linkPath, linkText }: ResultsHeaderProps) {
  return (
    <section className="survey-info">
      <div className="info-header">
        <h2>{surveyData.title}</h2>
        {surveyData.private && <Icon name="lock" width="16" />}
      </div>
      <p className="description">{surveyData.description}</p>
      <Link href={linkPath} className="button-md-primary-solid">
        {linkText}
      </Link>
    </section>
  );
}

export default ResultsHeader;

