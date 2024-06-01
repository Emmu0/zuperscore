import type { UseFormRegister, RegisterOptions, FieldError } from "react-hook-form";

export interface IFormType {
  label?: string;
  id: string;
  name: string;
  value?: string | number | readonly string[];
  mode?: "primary" | "transparent" | "secondary" | "disabled";
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  disabled?: boolean;
  validations?: RegisterOptions;
  error?: FieldError;
  autoComplete?: "on" | "off";
}
