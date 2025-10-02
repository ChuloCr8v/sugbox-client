import { FaFileAlt } from "react-icons/fa";
import { Image } from "antd";
import CardWrapper from "./global/CardWrapper";

type Attachment = { secure_url: string; name?: string };
type Props = {
  suggestion: { attachments: Attachment[]; title: string };
};

const SuggestionAttachmentComponent = ({ suggestion }: Props) => {
  const attachments = suggestion?.attachments || [];

  const isImageFile = (url: string) =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

  return (
    <Image.PreviewGroup>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex flex-wrap gap-3">
        {attachments.map((attachment) => {
          const isImage = isImageFile(attachment.secure_url);

          return (
            <CardWrapper
              key={attachment.secure_url}
              className="overflow-hidden h-[100px] md:max-w-[250px] relative !p-0 group rounded-lg border shadow-sm hover:shadow-md transition"
            >
              {isImage ? (
                <Image
                  alt={suggestion.title}
                  src={attachment.secure_url}
                  className="object-cover h-full !w-full object-center"
                  height={100}
                  width={250}
                  preview={true}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 text-gray-600">
                  <FaFileAlt className="text-3xl mb-1 text-gray-400" />
                  <p className="text-xs truncate px-2 w-full text-center">
                    {attachment.name || "Document"}
                  </p>
                </div>
              )}

              {/* Hover overlay
              <div
                className={twMerge(
                  "absolute top-0 left-0 h-full w-full flex items-center justify-center gap-3 bg-black bg-opacity-0 group-hover:bg-opacity-50 duration-200 opacity-0 group-hover:opacity-100"
                )}
              >
                <Tooltip title="Download">
                  <a
                    href={attachment.secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-2 text-sm bg-white/80 px-2 py-1 rounded-md shadow hover:bg-white text-gray-700 hover:text-primary transition"
                  >
                    <FaDownload className="text-blue-500" />
                    Download
                  </a>
                </Tooltip>
              </div> */}
            </CardWrapper>
          );
        })}
      </div>
    </Image.PreviewGroup>
  );
};

export default SuggestionAttachmentComponent;
