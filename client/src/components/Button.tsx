import React, { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary";
};

const Button: FC<ButtonProps> = ({ children, variant }) => {
  let buttonClass = "";

  if (variant === "primary") {
    buttonClass =
      "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full";
  } else if (variant === "secondary") {
    buttonClass =
      "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded";
  }

  return <button className={buttonClass}>{children}</button>;
};

export default Button;
