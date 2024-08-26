import NavHeader from "@/components/NavHeader/NavHeader";

function NavLayout({
  children,
  newSurvey,
  backToForms,
  badge,
  signOut,
  profile,
  publish,
  signInOrSignUp,
  publicForms,
}: {
  children: React.ReactNode;
  newSurvey?: boolean;
  backToForms?: boolean;
  badge?: boolean;
  signOut?: boolean;
  profile?: boolean;
  publish?: boolean;
  signInOrSignUp?: boolean;
  publicForms?: boolean;
}) {
  return (
    <>
      <NavHeader
        newSurvey={newSurvey}
        backToForms={backToForms}
        badge={badge}
        signOut={signOut}
        profile={profile}
        publish={publish}
        signInOrSignUp={signInOrSignUp}
        publicForms={publicForms}
      />
      <main className="main main-nav">{children}</main>
    </>
  );
}

export default NavLayout;

