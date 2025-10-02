import { useState } from "react";
import axios from "axios";
import { message, Image } from "antd";
import { FaRegTrashAlt, FaFileAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import CardWrapper from "../global/CardWrapper";
import { API_URL } from "../..";
import UseGetAuth from "../../hooks/useGetAuth";
import Icon from "./Icon";
import { Image02FreeIcons } from "@hugeicons/core-free-icons";

interface FileUploadCardProps {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  allowUpload?: boolean; // readonly if false
}

const FileUploadCard = ({
  files,
  setFiles,
  allowUpload = true,
}: FileUploadCardProps) => {
  const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
  const { token } = UseGetAuth();

  // Manual upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: File[] = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;
    await uploadFiles(selectedFiles);
  };

  // Drag & drop upload
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles: File[] = Array.from(e.dataTransfer.files);
    if (!droppedFiles.length) return;
    await uploadFiles(droppedFiles);
  };

  // Core upload function
  const uploadFiles = async (fileList: File[]) => {
    for (const file of fileList) {
      // 1. Add temp file for instant UI
      const tempFile = {
        asset_id: file.name,
        public_id: file.name,
        secure_url: URL.createObjectURL(file),
        uploading: true,
      };
      setFiles((prev) => [...prev, tempFile]);

      const formData = new FormData();
      formData.append("files", file);

      try {
        const res = await axios.post(
          `${API_URL}/files/upload-files`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (evt) => {
              const percent = Math.round((evt.loaded * 100) / (evt.total || 1));
              setProgressMap((prev) => ({ ...prev, [file.name]: percent }));
            },
          }
        );

        const uploadedFile = Array.isArray(res.data) ? res.data[0] : res.data;

        // 2. Replace temp with real server response
        setFiles((prev) =>
          prev.map((f) =>
            f.asset_id === file.name ? { ...uploadedFile, uploading: false } : f
          )
        );

        message.success(`${file.name} uploaded`);
      } catch (err) {
        console.error(err);
        message.error(`${file.name} failed to upload`);
        // remove temp file
        setFiles((prev) => prev.filter((f) => f.asset_id !== file.name));
      } finally {
        setProgressMap((prev) => ({ ...prev, [file.name]: 0 }));
      }
    }
  };

  const handleRemove = (asset_id: string) => {
    setFiles(files.filter((f) => f.asset_id !== asset_id));
  };

  const renderFilePreview = (file: any) => {
    const isImage = file.secure_url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

    if (isImage) {
      return (
        <Image
          src={file.secure_url}
          alt={file.public_id}
          className="w-full h-full object-cover rounded-md"
          preview={!file.uploading}
        />
      );
    }
    return (
      <CardWrapper className="flex flex-col items-center justify-center">
        <FaFileAlt className="text-gray-200 text-2xl" />
        <p className="text-xs text-gray-400 text-center truncate w-24">
          {file.public_id || "document"}
        </p>
      </CardWrapper>
    );
  };

  return (
    <div className="space-y-3">
      {/* Upload Section */}
      {allowUpload && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative"
        >
          <CardWrapper className="py-8 px-3 gap-2 !rounded-lg items-center cursor-pointer relative border-dashed border-2 border-gray-300 hover:border-blue-400 transition">
            <div className="flex flex-col justify-center items-center w-full">
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                multiple
                onChange={handleUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Icon icon={Image02FreeIcons} size={50} />
              <p className="text-xs mt-2">Drag & drop or click to upload</p>
            </div>
          </CardWrapper>
        </div>
      )}

      {/* File Previews */}
      <div className="grid grid-cols-2 gap-3 relative">
        {files.map((file: any) => (
          <CardWrapper
            key={file.asset_id}
            className="relative !p-0 h-24 overflow-hidden"
          >
            {renderFilePreview(file)}

            {/* Progress bar */}
            {file.uploading && progressMap[file.asset_id] > 0 && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                <div
                  className={twMerge(
                    "h-1 transition-all duration-200",
                    progressMap[file.asset_id] < 50
                      ? "bg-red-500"
                      : "bg-primary"
                  )}
                  style={{ width: `${progressMap[file.asset_id]}%` }}
                />
              </div>
            )}

            {/* Delete button */}
            {allowUpload && (
              <button
                onClick={() => handleRemove(file.asset_id)}
                className="absolute top-2 right-2 bg-white/70 hover:bg-white p-1 rounded-full"
              >
                <FaRegTrashAlt className="text-red-500" />
              </button>
            )}
          </CardWrapper>
        ))}
      </div>
    </div>
  );
};

export default FileUploadCard;
