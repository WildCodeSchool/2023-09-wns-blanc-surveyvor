import React, { useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import Icon from "../Icon/Icon";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { toast } from "@/lib/tools/toast.tools";
import { emailFormat } from "@/lib/tools/format.tools";
import { PUBLISH_SURVEY } from "@/lib/queries/survey.queries";

type SendInvitationsModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
};

const SEND_INVITATIONS = gql`
  mutation SendInvitations($link: String!, $emailList: [String!]!) {
    sendInvitations(link: $link, emailList: $emailList)
  }
`;

function SendInvitationsModal({
  setIsModalOpen,
  isModalOpen,
}: SendInvitationsModalProps) {
  const [value, setValue] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();
  const { link } = router.query;

  const [sendInvitations] = useMutation(SEND_INVITATIONS);
  const [publishSurvey] = useMutation(PUBLISH_SURVEY);

  function addEmail(email: string) {
    if (!emailFormat(email)) {
      setErrors([`Email invalide : ${email}`]);
      return;
    }
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
    }

    setErrors([]);
    setValue("");
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(value.trim());
    }
  };

  function removeEmail(email: string) {
    setEmails(emails.filter((e) => e !== email));
  }

  return (
    <Modal
      title="Inviter des personnes à répondre à l'enquête"
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}>
      <div className="send-invitations">
        <p>
          Ce formulaire est privé. Vous devez ajouter des participants avant de
          le publier. Un email de de demande de participation leur sera envoyé.
          Vous pourrez toujours ajouter des participants après la publication.
        </p>
        <Input
          inputName="email"
          value={value}
          setValue={setValue}
          focus={true}
          placeholder="Ajouter un email"
          onKeyDown={handleInputKeyDown}
        />
        {errors.length ? (
          <div className="badge-md-colored-error-square">
            {errors.map((error: string, index: number) => {
              return <p key={`error-${index}`}>{error}</p>;
            })}
          </div>
        ) : null}
        <div className="added-emails">
          {emails.map((email: string, index: number) => {
            return (
              <div
                className="badge-md-colored-success-square email"
                key={`email-${index}`}>
                <p>{email}</p>
                <button onClick={() => removeEmail(email)}>
                  <Icon name="cross" width="10" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button
            onClick={() => setIsModalOpen(false)}
            className="button-md-primary-outline">
            Annuler
          </button>
          <button
            className="button-md-primary-solid"
            disabled={emails.length === 0}
            aria-disabled={emails.length === 0}
            onClick={(e) => {
              e.preventDefault();
              sendInvitations({
                variables: {
                  link: link,
                  emailList: emails,
                },
              });
              publishSurvey({
                variables: { link: link },
                onCompleted: () => {
                  setIsModalOpen(false);
                  toast("success", "Invitations envoyées");
                  router.push("/dashboard");
                },
              });
            }}>
            Publier
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SendInvitationsModal;

