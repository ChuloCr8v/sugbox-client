import { Alert } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { hideAlert } from "../../redux/modals";

const PopUpAlert = () => {
  const { alert, alertText, alertType } = useSelector(
    (state: {
      modals: {
        alert: boolean;
        alertText: string;
        alertType: "error" | "success" | "info" | "warning" | undefined;
      };
    }) => state.modals
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert) {
      setTimeout(() => dispatch(hideAlert()), 3000);
    }
  }, [alert]);

  return (
    <div className="w-screen absolute -top-20  flex justify-center  duration-300">
      <Alert
        message={alertText}
        type={alertType}
        className={twMerge(
          "w-fit capitalize font-semibold pr-6 z-auto cursor-pointer",
          alertType === "error" ? "text-red-600" : "text-green-600",
          alert && "top-20"
        )}
        onClose={() => dispatch(hideAlert())}
        onClick={() => dispatch(hideAlert())}
      />
    </div>
  );
};

export default PopUpAlert;
