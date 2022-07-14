import { useEffect, useState } from "react";

interface FormFieldProps {
  htmlFor: string;
  placeholder: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
}

const FormField = ({
  htmlFor,
  placeholder,
  type = "text",
  value,
  onChange = () => {},
  error = "",
}: FormFieldProps) => {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <>
    <div className="mb-3">

      <input
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        aria-invalid={true}
        type={type}
        id={htmlFor}
        name={htmlFor}
        value={value}
        required
        placeholder={placeholder}
        className={`block border-1 rounded-2xl px-5 w-full h-[3.5rem] bg-grayish  ${errorText && 'border-[2px] border-red-500'}`}
      />
      <div className="text-red-600">{errorText || ""}</div>
    </div>
    </>
  );
};
export default FormField;
