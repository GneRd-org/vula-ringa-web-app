import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "clear" | "solid" | "gradient" | "circle";
}
export const Button: FC<ButtonProps> = ({
  children,
  variant = "outline",
  ...rest
}) => {
  let btnStyle = "text-black px-4 py-2 font-semibold";

  switch (variant) {
    case "outline":
      btnStyle += " border border-secondary rounded-md";
      break;
    case "clear":
      break;
    case "solid":
      btnStyle += " bg-secondary text-white rounded-md";
      break;
    case "gradient":
      btnStyle +=
        " bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-md";
      break;
    case "circle":
      btnStyle += " bg-secondary text-white rounded-full p-2";
      break;
    default:
      btnStyle += " border-2 border-secondary";
  }

  return (
    <button {...rest} className={btnStyle}>
      {children}
    </button>
  );
};
