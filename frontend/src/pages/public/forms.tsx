import Icon from "@/components/Icon/Icon";
import NavLayout from "@/layouts/NavLayout";
import { GET_PUBLIC_SURVEYS } from "@/lib/queries/survey.queries";
import { formatDate } from "@/lib/tools/format.tools";
import { Survey } from "@/types/survey.type";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { ReactElement } from "react";

function Forms() {
  const { data, loading, error } = useQuery(GET_PUBLIC_SURVEYS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="public-forms">
      <header>
        <h1>Formulaires publiques</h1>
        <button className="button-md-primary-outline">
          <Icon name="bulb" />
        </button>
      </header>
      <div className="cards">
        {data.getPublicSurveys.map((survey: Survey) => {
          return (
            <Link
              href={`/answers/${survey.link}`}
              className="card"
              key={survey.link}>
              <h3>{survey.title}</h3>
              <p className="publication-date">
                publié le
                <span>{formatDate(Number(survey.publicationDate))}</span>
              </p>
              <p className="description">{survey.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

Forms.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout backToForms signOut signInOrSignUp>
      {page}
    </NavLayout>
  );
};

export default Forms;

