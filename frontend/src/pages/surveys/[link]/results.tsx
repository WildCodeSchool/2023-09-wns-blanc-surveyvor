import Icon from "@/components/Icon/Icon";
import NavLayout from "@/layouts/NavLayout";
import { ReactElement } from "react";

function Results() {
  const questions: any = [1, 2, 1];
  return (
    <div className="results">
      <section className="survey-info">
        <div className="info-header">
          <h2>Titre du Formulaire</h2>
          <Icon name={/*survey.private && */ "lock"} width="16" />
          <button className="button-sm-primary-outline">
            <Icon name="pen-clip" width="16" />
          </button>
        </div>
        <p className="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          veritatis cumque deserunt a, magnam, similique velit provident
          adipisci, dicta nisi odio consequuntur est illum iure at atque
          exercitationem vitae in!
        </p>
        <button className="button-md-primary-solid">
          Consulter chaque réponse
        </button>
      </section>
      {questions.map((question: any) => {
        return (
          <section className="question-result">
            <h3>Titre de la question</h3>
            <p className="description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
              odit iure a autem mollitia eum esse quidem aperiam sint architecto
              officiis repellendus, maxime accusantium deleniti, cumque corporis
              sequi vel fugiat.
            </p>
          </section>
        );
      })}
    </div>
  );
}

Results.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout backToForms signOut>
      {page}
    </NavLayout>
  );
};

export default Results;

