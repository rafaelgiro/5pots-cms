export interface TextFieldProps {
  label: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
  className?: string;
  id?: string;
  name: string;
  errors?: { [key: string]: { message: string } };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
