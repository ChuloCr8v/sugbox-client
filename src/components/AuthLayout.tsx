import { twMerge } from "tailwind-merge";
import { FormHeading } from "../pages/login";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  heading: string;
  subheading?: string;
}

const AuthLayout = ({ children, heading, subheading }: Props) => {
  return (
    <div
      className={twMerge(
        "h-screen w-screen flex flex-col items-center justify-start pt-12 md:pt-0 px-4 space-y-6"
      )}
    >
      <div className="md:h-[40vh] md:w-screen md:bg-gradient-to-b from-primary to-primary/20 flex flex-col justify-center items-start w-full md:items-center relative">
        <div className="pb-3 space-y-4 text-left md:text-center w-full md:px-4 max-w-3xl">
          <p className="text-5xl font-semibold text-white">SuggBox</p>
          <p className="text-base text-gray-300">
            Your NO.1 digital Suggestion Box
          </p>
        </div>
      </div>

      <div
        className={twMerge(
          "max-w-[450px] md:-mt-24 md:bg-black/20 md:rounded-3xl md:border border-outline/40 md:px-6 w-full backdrop-blur md:py-10 pt-16"
        )}
      >
        <FormHeading heading={heading} subheading={subheading} />
        <div className="w-full mt-12">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
