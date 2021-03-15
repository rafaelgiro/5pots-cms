import { KeyboardEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { SimpleSelectProps } from "./interfaces";

import useClickOutside from "../../../core/hooks/useClickOutside";

import styles from "./styles.module.scss";

const SimpleSelect = (props: SimpleSelectProps) => {
  const {
    options,
    className,
    searchable = true,
    handleChange,
    defaultValue,
  } = props;
  const [selectValue, setSelectValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => setIsOpen(false));

  const selectClass = clsx(
    className,
    styles.select,
    isOpen && styles["select--open"]
  );

  function handleOpen() {
    setIsOpen(true);
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  function handleSelect(val: string) {
    setSelectValue(val);
    setIsOpen(false);
  }

  function handleInputChange(e: KeyboardEvent<HTMLInputElement>) {
    const key = e.key;

    if (key === "Enter" && visibleOptions.length > 0) {
      setSelectValue(visibleOptions[0].value);
      setIsOpen(false);
    }

    const re = new RegExp(inputRef.current?.value || "", "gi");

    setVisibleOptions(options.filter((champ) => champ.value.match(re)));
  }

  useEffect(() => {
    selectValue && handleChange(selectValue);
  }, [selectValue]);

  return (
    <div ref={selectRef} className={selectClass} onClick={handleOpen}>
      <input
        className={styles.select__input}
        readOnly={!searchable}
        type="text"
        ref={inputRef}
        onKeyUp={handleInputChange}
      />
      <p className={styles.select__value}>
        {options.find((option) => option.value === selectValue)?.label}
      </p>
      <div className={styles.select__options}>
        {visibleOptions.map((option) => (
          <button
            key={`select-option-${option.value}`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimpleSelect;
