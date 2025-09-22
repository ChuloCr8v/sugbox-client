import { ReactNode } from "react";

interface Props {
  leftSideElements: ReactNode;
  rightSideElements: ReactNode;
}

const FormLayout = (props: Props) => {
  return (
    <div className="w-full md:h-full flex flex-col justify-center items-center gap-12 md:gap-0">
      <div className="w-full">
        <div className="h-full w-full hidden xl:flex flex-col items-center justify-center xl:-mt-10">
          {props.leftSideElements}
        </div>
        {props.rightSideElements}
      </div>
    </div>
  );
};

export default FormLayout;
