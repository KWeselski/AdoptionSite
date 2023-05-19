import React, { FC, ReactNode } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  variant: "primary" | "secondary";
  onClick?: () => void;
  icon?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  icon,
  type,
}) => {
  let buttonClass = "";

  if (variant === "primary") {
    buttonClass =
      "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center";
  } else if (variant === "secondary") {
    buttonClass =
      "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  flex items-center justify-center";
  }

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {icon && (
        <span className="mr-2">
          <img className="w-8 h-8" src={icon} alt="button icon" />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
