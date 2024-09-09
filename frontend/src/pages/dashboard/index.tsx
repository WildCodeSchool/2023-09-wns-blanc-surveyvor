import NavLayout from "@/layouts/NavLayout";
import { ReactElement, useEffect, useState } from "react";
import { Survey } from "@/types/survey.type";
import { useLazyQuery, useQuery } from "@apollo/client";
import Icon from "@/components/Icon/Icon";
import { removeAccents } from "@/lib/tools/format.tools";
import { SurveyState } from "@/types/surveyState.type";
import {
  GET_SURVEY_BY_OWNER,
  GET_SURVEY_STATES,
} from "@/lib/queries/survey.queries";
import { sortSurveys } from "@/lib/tools/survey.tools";
import { sortOptions } from "@/lib/data/data";
import DropdownItem from "@/components/Dropdown/Dropdown";
import SurveyCard from "@/components/SurveyCard/SurveyCard";

export default function Dashboard() {
  // ----------------------------------States----------------------------------

  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveyStates, setSurveyStates] = useState<SurveyState[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [searchSurveysValue, setSearchSurveysValue] = useState<string>("");

  // ----------------------------------Queries----------------------------------
  const getStates = useQuery<{ getSurveyStates: SurveyState[] }>(
    GET_SURVEY_STATES,
    {
      onCompleted: (data) => setSurveyStates(data.getSurveyStates),
    }
  );

  const [getSurveys, { loading, error }] = useLazyQuery<{
    getSurveysByOwner: Survey[];
  }>(GET_SURVEY_BY_OWNER);

  useEffect(() => {
    getSurveys({
      fetchPolicy: "network-only",
      onCompleted: (data) => setSurveys(data.getSurveysByOwner),
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // ----------------------------------Functions----------------------------------

  const filteredSurveys: Survey[] = surveys
    .filter(
      (survey: Survey) =>
        removeAccents(survey.title.toLowerCase()).includes(
          searchSurveysValue
        ) ||
        (survey.description &&
          removeAccents(survey.description.toLowerCase()).includes(
            searchSurveysValue
          ))
    )
    .filter((survey: Survey) =>
      selectedState ? survey.state.state === selectedState : true
    );
  const searchSurveys = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSurveysValue(
      removeAccents(e.target.value).toLocaleLowerCase().trim()
    );
  };

  const SortedSurveys = sortSurveys(selectedSortOption, filteredSurveys);

  // ----------------------------------return----------------------------------

  return (
    <div className="home-page">
      <section className="my-surveys-header">
        <h2 className="text--medium">Mes formulaires</h2>
        <label
          className="search-surveys-label input-field"
          htmlFor="search-surveys">
          <div className="input">
            <Icon name="search" height="1rem" width="1rem" />
            <input
              type="search"
              name="search-surveys"
              id="search-surveys"
              placeholder="Rechercher..."
              onChange={(e) => searchSurveys(e)}
            />
          </div>
        </label>
        <DropdownItem
          options={surveyStates}
          buttonName="Filtrer"
          icon="filter"
          selectedOption={selectedState}
          setSelectedOption={setSelectedState}
        />

        <DropdownItem
          options={sortOptions}
          buttonName="Trier"
          icon="sort-alt"
          selectedOption={selectedSortOption}
          setSelectedOption={setSelectedSortOption}
        />
      </section>
      <section className="my-surveys surveys">
        {SortedSurveys.map(
          (survey: Survey) =>
            !survey.deleteDate && (
              <SurveyCard
                key={survey.id}
                survey={survey}
                surveys={surveys}
                setSurveys={setSurveys}
              />
            )
        )}
      </section>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout newSurvey profile signOut>
      {page}
    </NavLayout>
  );
};

