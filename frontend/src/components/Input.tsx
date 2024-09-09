import { forwardRef, useEffect, useRef, useState } from "react";
import useCombinedRefs from "../lib/fixtures/useCombinedRefs";

interface InputProps {
  disabled?: boolean;
  focus?: boolean;
  type?: string;
  inputName: string;
  placeholder?: string;
  labelName?: string;
  inputClassName?: string;
  labelClassName?: string;
  textarea?: boolean;
  value: string;
  width?: number;
  setValue: (value: string) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      disabled = false,
      focus,
      type,
      inputName,
      textarea,
      placeholder,
      labelName,
      inputClassName,
      labelClassName,
      value,
      width,
      setValue,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs(ref, internalRef);

    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValue(e.target.value);
    };

    useEffect(() => {
      if (focus && combinedRef.current) {
        combinedRef.current.focus();
      }
    }, [focus, combinedRef]);

    return (
      <div className={`input-field ${width ? `field--${width}` : ""}`}>
        {labelName && (
          <label htmlFor={inputName} className={labelClassName}>
            {labelName}
          </label>
        )}
        {textarea ? (
          <textarea
            ref={combinedRef as React.RefObject<HTMLTextAreaElement>}
            name={inputName}
            value={value ? value : ""}
            data-testid={inputName}
            onChange={handleChange}
            placeholder={placeholder}
            className={`textarea ${inputClassName || ""}`}
            onBlur={onBlur}
          />
        ) : (
          <div
            id={`div-${inputName}`}
            className={`input ${inputClassName || ""}`}>
            <input
              ref={combinedRef as React.RefObject<HTMLInputElement>}
              type={type}
              name={inputName}
              id={inputName}
              placeholder={placeholder}
              autoComplete={type === "password" ? "current-password" : ""}
              value={value}
              data-testid={inputName}
              onChange={handleChange}
              disabled={disabled}
              onBlur={onBlur}
              onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick();
              }}
              onKeyDown={onKeyDown}
              {...(inputName.startsWith("input-date_") && {
                style: { width: `200px` },
              })}
            />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

