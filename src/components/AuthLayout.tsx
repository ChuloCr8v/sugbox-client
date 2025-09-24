import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import Logo from "./global/Logo";
import FormHeading from "./global/FormHeading";
import Portal from "../pages/portal";
import AuthPages from "./auth/AuthPages";
import { useDispatch } from "react-redux";
import BackAction from "./global/BackAction";
import { setAuthIndex, setSlideIndex } from "../redux/authSlide";
import { useAppSelector } from "../redux/store";

interface Props {
  children?: ReactNode;
  heading?: string;
  subheading?: string;
  slideIndex?: number;
}

const AuthLayout = ({ heading, subheading }: Props) => {
  const { slideIndex, authIndex } = useAppSelector((state) => state.authSlide);

  const dispatch = useDispatch();

  const isPortal = slideIndex === 0;
  const isSignup = authIndex === 1;

  // const backButtonConfig = () => {
  //   switch (slideIndex) {
  //     case 1:
  //       return {
  //         page: authIndex === 0 ? "Portal" : "Login",
  //         action: () =>
  //           dispatch(authIndex === 0 ? setSlideIndex(0) : setAuthIndex(0)),
  //       };

  //     default:
  //       return null;
  //   }
  // };

  console.log(authIndex, slideIndex);

  const renderView = () => {
    switch (slideIndex) {
      case 0:
        return <Portal />;
      default:
        return <AuthPages />;
    }
  };

  return (
    <div
      className={twMerge(
        "h-screen w-screen flex flex-col items-center p-4 gap-10 lg:gap-5 duration-200 overflow-hidden",
        !isPortal && "lg:grid grid-cols-2"
      )}
    >
      <div
        className={twMerge(
          "w-full h-40 rounded-[30px] overflow-hidden relative duration-200 z-50",
          "md:h-full",
          "lg:",
          isPortal && "h-72 md:h-[50vh]",
          // isPortal && "md:h-full w-full",
          isSignup && "!h-28 md:!h-full"
        )}
      >
        <div
          className={twMerge(
            "h-full w-full bg-gradient-to-br from-primary/40 to-secondary/70 backdrop-blur absolute",
            isPortal && "md:bg-gradient-to-b"
          )}
        />
      </div>

      <div
        className={twMerge(
          "!w-full md:backdrop-blur duration-200 relative z-50 flex flex-col justify-center items-center !max-w-[500px]",
          "md:px-8 md:rounded-[50px] md:!-mt-60 md:bg-background/60 md:backdrop-blur-[120px] md:border-[8px] md:border-background md:py-16 place-self-center ",
          !isPortal &&
            "lg:max-w-full lg:py-8 lg:!m-0 lg:border-0 lg:backdrop-blur-none lg:bg-transparent lg:space-y-8",
          isPortal && "md:!max-w-[600px] "
        )}
      >
        {authIndex !== 2 && <Logo />}

        {heading && <FormHeading heading={heading} subheading={subheading} />}
        <div className="w-full lg:mt-0 space-y-6 flex flex-col justify-center items-center">
          {renderView()}
          {slideIndex !== 0 && (
            // <BackAction
            //   page={backButtonConfig()?.page ?? ""}
            //   handleGoBack={backButtonConfig()?.action}
            // />

            <BackAction
              page={"Portal"}
              handleGoBack={() => {
                dispatch(setSlideIndex(0));
                dispatch(setAuthIndex(0));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
