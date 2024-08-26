import NavLayout from "@/layouts/NavLayout";
import React, { ReactElement } from "react";

function LandingPage() {
  return <div>landing page</div>;
}

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout publicForms backToForms signOut signInOrSignUp>
      {page}
    </NavLayout>
  );
};

export default LandingPage;

