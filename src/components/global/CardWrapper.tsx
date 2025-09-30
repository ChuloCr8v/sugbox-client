import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: ClassNameValue;
};

const CardWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`backdrop-blur-xl flex justify-between p-4 bg-gradient-to-b to-90% from-primary/5 to-black/40 w-full rounded-xl border border-gray-600 ${className}`}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
