import React, { useEffect, useState } from "react";

interface DebouncedTextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  timer: number;
  initValue?: string;
}

const DebouncedTextInput = ({
  onChange,
  timer,
  initValue = "",
  ...rest
}: DebouncedTextInputProps) => {
  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(value);
    }, timer);

    return () => {
      clearTimeout(handler);
    };
  }, [value, timer]);

  return (
    <input
      {...rest}
      className="text-input"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

export default DebouncedTextInput;
