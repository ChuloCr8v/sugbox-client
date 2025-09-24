import { ReactNode } from "react";

const FormHeading = (props: { subheading?: ReactNode; heading: string }) => {
  return (
    <div className="grid gap-2 text-center">
      <p className="text-3xl text-gray-100">{props.heading}</p>
      {props.subheading && (
        <p className="text-base text-gray-300">{props.subheading}</p>
      )}
      {/* <div className="h-2 w-8 bg-primaryblue rounded-full"></div> */}
    </div>
  );
};

export default FormHeading;
