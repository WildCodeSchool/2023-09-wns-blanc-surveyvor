import Link from "next/link";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Icon from "../Icon/Icon";
import { CREATE_SURVEY, PUBLISH_SURVEY } from "@/lib/queries/survey.queries";
import { useEffect, useState } from "react";
import PublishModal from "../Modal/PublishModal";
import SendInvitationsModal from "../Modal/SendInvitationsModal";

const GET_SURVEY_POLICY = gql`
  query GetSurveyByLink($surveyLink: String!) {
    getSurveyByLink(surveyLink: $surveyLink) {
      title
      private
    }
  }
`;

function NavHeader({
  newSurvey,
  backToForms,
  badge,
  signOut,
  profile,
  publish,
  signInOrSignUp,
  publicForms,
}: {
  newSurvey?: boolean;
  backToForms?: boolean;
  badge?: boolean;
  signOut?: boolean;
  profile?: boolean;
  publish?: boolean;
  signInOrSignUp?: boolean;
  publicForms?: boolean;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { link } = router.query;

  const { data } = useQuery(GET_SURVEY_POLICY, {
    variables: { surveyLink: link },
  });

  const [createSurvey] = useMutation(CREATE_SURVEY, {
    variables: { title: "Formulaire sans titre" },
    onCompleted: (data) => {
      router.push(`/surveys/${data.createSurvey}`);
    },
  });

  useEffect(() => {
    setIsConnected(Boolean(localStorage.getItem("token")));
  }, [router.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return (
    <nav className="nav-container">
      <Link href="/" className="logo">
        <img
          src="/Logo-baseline.svg"
          alt="Surveyvore's logo linked to home page"
          className="logo logo-desktop"
        />
        <img
          src="/Logo.svg"
          alt="Surveyvore's logo linked to home page"
          className="logo logo-mobile"
        />
      </Link>
      {badge && (
        <div className="badge">
          <Icon name="check-circle" width="16" />
          Votre formulaire est sauvegardé automatiquement
        </div>
      )}
      <div className="nav-buttons">
        {publicForms && (
          <Link href="/public/forms" className="button-md-primary-solid">
            <Icon name="unlock" />
            <span className="hidden-mobile">Formulaires publiques</span>
          </Link>
        )}
        {isConnected && backToForms && (
          <button
            className="button-md-grey-outline"
            onClick={() => router.push("/dashboard")}>
            <Icon name="arrow-left" />
            <span className="hidden-mobile">Mes formulaires</span>
          </button>
        )}
        {newSurvey && router.pathname !== "/answers" && isConnected && (
          <button
            className="button-md-primary-solid"
            onClick={() => createSurvey()}>
            <Icon name="plus" />
            <span className="hidden-mobile">Nouveau formulaire</span>
          </button>
        )}
        {newSurvey && router.pathname === "/answers" && !isConnected && (
          <button
            className="button-md-primary-solid"
            onClick={() => createSurvey()}>
            <Icon name="plus" />
            <span className="hidden-mobile">Nouveau formulaire</span>
          </button>
        )}

        {isConnected && profile && (
          <Link href="/profile" className="button-md-grey-outline">
            <Icon name="user" />
            <span className="hidden-mobile">Mon profil</span>
          </Link>
        )}
        {isConnected && publish && (
          <button
            className="button-md-primary-solid"
            onClick={() => setIsModalOpen(true)}>
            <Icon name="paper-plane-top" />
            <span className="hidden-mobile">Publier</span>
          </button>
        )}

        {!isConnected && signInOrSignUp && (
          <>
            <button
              className="button-md-primary-solid"
              onClick={() => router.push("/signup")}>
              <Icon name="sign-up" />
              <span className="hidden-mobile">Inscription</span>
            </button>
            <button
              className="button-md-grey-outline"
              onClick={() => router.push("/signin")}>
              <Icon name="sign-in" />
              <span className="hidden-mobile">Connexion</span>
            </button>
          </>
        )}
        {isConnected && signOut && (
          <button className="button-md-grey-outline" onClick={handleSignOut}>
            <Icon name="sign-out" />
          </button>
        )}
      </div>

      {isModalOpen &&
        (data?.getSurveyByLink?.private ? (
          <SendInvitationsModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        ) : (
          <PublishModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
    </nav>
  );
}

export default NavHeader;

