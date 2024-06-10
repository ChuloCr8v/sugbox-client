import type { GetProp, UploadProps } from "antd";
import { Button, Spin, message } from "antd";
import { useState } from "react";
import { FaCamera, FaUser } from "react-icons/fa";
import UseGetAuth from "../hooks/useGetAuth";
import { useUploadProfilePictureMutation } from "../redux/data/profilePicture";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export const convertBase64 = (file: FileType) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
      console.log(error);
    };
  });
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const ProfilePicture = (props: {
  data: { profilePicture: string; firstName: string };
}) => {
  const [imageFile, setImageFile] = useState<any>("");
  const [uploadUrl, setUploadUrl] = useState<string>("");

  const [uploadProfilePicture, { isLoading: uploadingImage }] =
    useUploadProfilePictureMutation();

  const getImage = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setUploadUrl(objectUrl);
  };

  const { id } = UseGetAuth();

  const uploadImage = async () => {
    beforeUpload(imageFile);

    const profileImageUrl = await convertBase64(imageFile);

    try {
      await uploadProfilePicture({ id, profileImageUrl }).unwrap();
      setUploadUrl("");
      message.success("Profile picture updated successfully.");
    } catch (error) {
      console.log(error);
      message.error("Profile picture update failed.");
    }
  };

  return (
    <div className="grid gap-4 relative md:w-[200px] xl:w-[250px]">
      {uploadUrl && (
        <div
          className="font-semibold hover:opacity-100 duration-200 opacity-60 absolute right-2 top-2 text-sm text-white px-2
        rounded-full bg-red-600 z-[70]"
          onClick={() => setUploadUrl("")}
        >
          Remove
        </div>
      )}
      <div className="relative rounded-lg bg-blue-100 max-[350px]:w-[360px] w-auto h-[250px] flex flex-col items-center justify-center overflow-hidden group">
        {uploadingImage && (
          <div className="h-full w-full bg-black bg-opacity-50 absolute left-0 top-0 flex items-center justify-center z-50">
            <Spin />
          </div>
        )}
        <div className="relative">
          <input
            type="file"
            onChange={getImage}
            className="relative z-50 h-[400px] w-[400px] opacity-0"
          />
          <div className="flex flex-col items-center justify-center h-[400px] w-full absolute z-40 top-0 left-0 opacity-0 group-hover:opacity-100 duration-300">
            <div className="border rounded-full p-4">
              <FaCamera className="text-white text-5xl" />
            </div>
            <div className="h-full w-full bg-black bg-opacity-25 absolute z-50 left-0 top-0"></div>
          </div>
        </div>
        {uploadUrl ? (
          <img
            src={uploadUrl && uploadUrl}
            alt=""
            className="object-cover !object-center h-full w-full absolute top-0 left-0 z-30"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
            {props.data?.profilePicture ? (
              <img
                src={props.data?.profilePicture}
                alt={props.data.firstName}
                className="object-cover !object-center h-full w-full absolute top-0 left-0 z-30"
              />
            ) : (
              <FaUser className="text-9xl text-primaryblue opacity-50" />
            )}
          </div>
        )}
      </div>
      {uploadUrl && (
        <Button
          loading={uploadingImage}
          onClick={uploadImage}
          className="w-full shadow-none border-none bg-primaryblue hover:!bg-hoverblue hover:!text-white text-white font-semibold "
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default ProfilePicture;
