import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

function QuestionType() {
  const [selectedType, setSelectedType] = useState("Texte libre");

  const typeButtons = [
    {
      type: "button" as "button",
      icon: "/text-box-edit.svg",
      alt: "text field icon",
      text: "Texte libre",
    },
    {
      type: "button" as "button",
      icon: "/list-check.svg",
      alt: "list icon",
      text: "Choix multiples",
    },
    {
      type: "button" as "button",
      icon: "/check-circle.svg",
      alt: "single choice icon",
      text: "Choix unique",
    },
    {
      type: "button" as "button",
      icon: "/checkbox.svg",
      alt: "checkbox icon",
      text: "Case à cocher",
    },
    {
      type: "button" as "button",
      icon: "/calendar-day.svg",
      alt: "calendar icon",
      text: "Date / période",
    },
  ];

  console.log(selectedType);

  return (
    <>
      <div className="question-type">
        {typeButtons.map((button) => (
          <Button
            key={button.text}
            icon={button.icon}
            type={button.type}
            text={button.text}
            alt={button.text}
            set={setSelectedType}
          />
        ))}
      </div>
      {selectedType === "Choix multiples" && <p>choix multiples</p>}
      {selectedType === "Choix unique" && <p>choix unique</p>}
      {selectedType === "Case à cocher" && <p>case à cocher</p>}
      {selectedType === "Date / période" && <p>date / période</p>}
    </>
  );
}

export default QuestionType;

