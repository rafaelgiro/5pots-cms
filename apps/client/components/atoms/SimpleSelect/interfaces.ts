export interface SimpleSelectProps {
  options: { value: string; label: string }[];
  className?: string;
  searchable?: boolean;
  handleChange: (selectValue: string) => void;
  defaultValue?: string;
}
