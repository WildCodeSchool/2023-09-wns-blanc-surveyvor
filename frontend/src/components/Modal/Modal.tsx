import { useEffect, useRef } from "react";
import useClickOutside from "@/lib/hooks/useClickOutside";

function Modal({
  title,
  children,
  setIsOpen,
  isOpen,
}: {
  title: string;
  children: JSX.Element;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const { ref } = useClickOutside(isOpen, setIsOpen);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    backgroundRef.current &&
      (backgroundRef.current.style.backdropFilter = "blur(5px)");

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      backgroundRef.current &&
        (backgroundRef.current.style.backdropFilter = "none");

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [backgroundRef]);

  return (
    <div ref={backgroundRef} className="modal-background">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
        <header className="modal-header">
          <p className="text-xl text--medium">{title}</p>
        </header>
        {children}
      </div>
    </div>
  );
}

export default Modal;

