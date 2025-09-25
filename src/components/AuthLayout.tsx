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
import { motion } from "framer-motion";

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
        !isPortal && "xl:grid grid-cols-2"
      )}
    >
      <div
        className={twMerge(
          "w-full flex flex-col justify-center items-center relative",
          !isPortal && "xl:h-full"
        )}
      >
        <motion.div
          initial={{
            y: -200,
          }}
          animate={{
            y: 0,
          }}
          // layout
          className={twMerge(
            "absolute z-0 !h-full !w-[94%] flex flex-col justify-center w-full rounded-[30px] overflow-hidden duration-200 z-50 bg-gradient-to-tl from-primary/40 to-secondary/70 backdrop-blur max-xl:hidden",
            "xl:!h-full",
            isPortal && "opacity-0"
          )}
        ></motion.div>
        <motion.div
          initial={{
            y: -100,
          }}
          animate={{
            y: 0,
          }}
          className={twMerge(
            "relative z-20 flex flex-col justify-center w-full h-[30vh] rounded-[30px] duration-200 z-50 bg-gradient-to-br from-primary/40 to-secondary/70 backdrop-blur",
            "md:h-[30vh]",
            "xl:shadow-xl xl:!h-[50vh]",
            isPortal && "h-[40vh] w-full",
            isPortal && "lg:h-[50vh]",
            isSignup && "md:!h-[30vh]"
          )}
        >
          <div className="place-self-center">{authIndex !== 2 && <Logo />}</div>
        </motion.div>
      </div>

      <motion.div
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
        }}
        className={twMerge(
          "!w-full duration-200 relative z-50 flex flex-col justify-center items-center !max-w-[500px] px-4 -mt-24 bg-background/60 backdrop-blur border-[8px] border-background place-self-center ",
          "md:px-8 rounded-[50px] md:!-mt-30",
          "lg:!-mt-20",
          !isPortal &&
            "xl:max-w-full xl:py-8 xl:!m-0 xl:border-0 xl:backdrop-blur-none xl:bg-transparent xl:space-y-8"
          // isPortal && "md:!max-w-[600px] "
        )}
      >
        {heading && <FormHeading heading={heading} subheading={subheading} />}
        <div className="w-full xl:mt-0 space-y-3 flex flex-col justify-center items-center">
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
      </motion.div>
    </div>
  );
};

export default AuthLayout;
