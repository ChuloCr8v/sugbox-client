import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  errorMsg?: string;
  className?: ClassNameValue;
};

const ErrorComponent = (props: Props) => {
  return (
    <div
      className={twMerge(
        "h-screen bg-gradient-to-tr from-primary/5 to-black w-full flex flex-col justify-center items-center",
        props.className
      )}
    >
      {props.errorMsg ? (
        props.errorMsg
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <img src="/error.gif" alt="error" className="-ml-12 lg:-ml-32 w-32" />
          <p className="ml-5 text-gray-300 text-xl">
            Oops!.An error occured.{" "}
            <span className="block text-center md:text-left text-gray-400 italic">
              Try again.
            </span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorComponent;
