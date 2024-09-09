import React, { useState } from "react";

type CopyButtonProps = {
  textToCopy: string;
};

function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Erreur lors de la copie:", err);
      });
  };

  return (
    <button onClick={copyToClipboard} className="button-md-primary-outline">
      {copied ? "Copié !" : "Copier le lien"}
    </button>
  );
}

export default CopyButton;

