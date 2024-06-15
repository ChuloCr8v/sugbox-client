import { FaDownload, FaRegImage } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import AttachmentPreview from "../components/modals/AttachmentPreview";

type Props = {
  suggestion: { attachments: Array<{ secure_url: string }>; title: string };
};

const SuggestionAttachmentComponent = (props: Props) => {
  const [previewAttachment, setPreviewAttachment] = useState({
    isOpen: false,
    src: "",
  });

  return (
    <div className="flex flex-wrap gap-4">
      {props.suggestion?.attachments?.map(
        (attachment: { secure_url: string }) => (
          <div
            className="border h-[150px] w-full md:w-[250px] overflow-hidden rounded relative bg-white group"
            key={attachment.secure_url}
          >
            <img
              src={attachment.secure_url}
              className="object-cover h-full w-full object-center"
            />
            <div
              className={twMerge(
                "flex gap-4 items-center justify-center absolute group top-0 left-0 h-full w-full bg-black bg-opacity-0 hover:bg-opacity-35 duration-200 opacity-0 group-hover:opacity-100 -z-10 group-hover:z-10"
              )}
            >
              <button className="text-white flex items-center justify-center gap-2 text-sm hover:text-primaryblue  duration-200">
                <FaDownload />
                Download
              </button>
              <button
                onClick={() => {
                  setPreviewAttachment({
                    isOpen: true,
                    src: attachment.secure_url,
                  });
                }}
                className="text-white flex items-center justify-center gap-2 text-sm hover:text-primaryblue duration-200"
              >
                <FaRegImage />
                Preview
              </button>
            </div>
          </div>
        )
      )}
      <AttachmentPreview
        previewAttachment={previewAttachment.isOpen}
        src={previewAttachment.src}
        suggestionTitle={props.suggestion?.title}
        setPreviewAttachment={setPreviewAttachment}
      />
    </div>
  );
};

export default SuggestionAttachmentComponent;
