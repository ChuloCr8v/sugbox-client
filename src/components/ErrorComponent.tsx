type Props = {
  errorMsg?: string;
};

const ErrorComponent = (props: Props) => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {props.errorMsg ? (
        props.errorMsg
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <img src="/error.gif" alt="error" className="-ml-12 lg:-ml-32 w-32" />
          <p className="ml-2">
            Oops!.An error occured.{" "}
            <span className="block text-center text-gray-500 italic">
              Try again.
            </span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorComponent;
