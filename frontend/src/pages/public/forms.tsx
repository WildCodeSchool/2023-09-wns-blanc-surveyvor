import NavLayout from "@/layouts/NavLayout";
import { ReactElement } from "react";

function Forms() {
  return <div> formulaires publiques</div>;
}

Forms.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout backToForms signOut signInOrSignUp>
      {page}
    </NavLayout>
  );
};

export default Forms;

