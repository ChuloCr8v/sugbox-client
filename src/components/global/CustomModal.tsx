import { Button, Checkbox, Modal, Spin } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { usePopup } from "../../context/PopupContext";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Activity01Icon } from "@hugeicons/core-free-icons";

export enum ModalTheme {
  WARNING = "WARNING",
  DEFAULT = "DEFAULT",
}

interface Props {
  title: string;
  children: ReactNode;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  modalSubtitle?: string;
  icon?: IconSvgElement;
  loading?: boolean;
  closable?: boolean;
  isDanger?: boolean;
  width?: number;
  center?: boolean;
  disabled?: boolean;
  step?: boolean;
  showConfirmation?: boolean; // Controls checkbox visibility
  confirmationText?: string;
  modalTheme?: ModalTheme;
  hideFooter?: boolean;
  maxHeight?: boolean;
}

export const CustomModal = ({
  children,
  loading,
  icon,
  onCancel,
  modalSubtitle,
  okText,
  step,
  showConfirmation,
  confirmationText,
  onOk,
  closable,
  title,
  isDanger = false,
  width = 500,
  // center = false,
  disabled = false,
  modalTheme = ModalTheme.DEFAULT,
  hideFooter = false,
  maxHeight = false,
}: Props) => {
  const [stepButtons, setStepButtons] = useState(step ?? false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { closeModal, isModalOpen } = usePopup();

  const warning = modalTheme === ModalTheme.WARNING;

  useEffect(() => {
    setStepButtons(step ?? false);
  }, [step]);

  return (
    <Modal
      okText={okText || "Submit"}
      onOk={onOk}
      okButtonProps={{ danger: isDanger, disabled }}
      open={isModalOpen}
      onCancel={closeModal}
      closable={closable}
      footer={false}
      maskClosable={closable}
      width={width}
      // centered={center}
      closeIcon={false}
      className="!p-0"
      classNames={{
        content:
          "!bg-black/5 backdrop-blur-lg bg-gradient-to-b from-black/5 to-transparent !border-gray-200",
        body: " !border-gray-200 !border !border-primary/20 overflow-hidden rounded-lg",
        mask: "backdrop-blur-sm bg-black/10",
      }}
      styles={{
        content: {
          padding: 0,
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className={twMerge(
            "modal-header flex items-center gap-3  w-full  px-6 py-4 border-b border-b-primary/20 bg-gradient-to-l from-primary/15 to-transparent ",
            warning && "from-red-50 to-red-100"
          )}
        >
          <div
            className={twMerge(
              "text-primary text-4xl bg-primary/40 p-3 rounded-full flex items-center justify-center",
              warning && "bg-red-200 text-red-600",
              !modalSubtitle && "p-2"
            )}
          >
            <HugeiconsIcon
              icon={icon ?? Activity01Icon}
              size={modalSubtitle ? 24 : 20}
              strokeWidth={1.5}
              color={warning ? "red" : "white"}
            />
          </div>

          <div className="text-left">
            <p
              className={twMerge(
                "font-semibold capitalize text-sm md:text-base text-gray-300",
                !modalSubtitle && "text-base"
              )}
            >
              {title}
            </p>
            {modalSubtitle && (
              <p className="text-gray-400 text-xs leading-5">{modalSubtitle}</p>
            )}
          </div>
        </div>

        <div
          className={twMerge(
            "w-full px-6 py-4 h-full overflow-y-auto overflow-x-hidden",
            !maxHeight ? "" : "max-h-[500px]"
          )}
        >
          {loading ? (
            <div className="h-full flex flex-col justify-center items-center py-10">
              <Spin className="" />
            </div>
          ) : (
            children
          )}
        </div>

        {/* Confirmation Checkbox */}
        {showConfirmation && !loading && (
          <div className="w-full px-6 flex items-start gap-2">
            <Checkbox
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="custom-checkbox"
              // style={{ color: "red" }}
            />
            <p className="text-sm text-gray">
              {confirmationText ?? "I confirm this action"}
            </p>
          </div>
        )}

        {!stepButtons && !hideFooter && (
          <div className="space-x-4 w-full px-6 py-4 border-t border-primary/20">
            <div className="flex items-center justify-end gap-3">
              <Button
                size="middle"
                className="!text-sm !px-6 bg-transparent text-gray-300 border-gray-600  !shadow-none"
                onClick={onCancel ?? closeModal}
              >
                Cancel
              </Button>
              <Button
                onClick={onOk}
                loading={loading}
                type="primary"
                size="middle"
                className={twMerge(
                  "!text-sm !px-6 !shadow-none",
                  warning && "!bg-red-400 !text-white"
                )}
                disabled={showConfirmation ? !isConfirmed : false} // Disable based on checkbox
              >
                {okText ?? "Submit"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
