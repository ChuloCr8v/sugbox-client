import type { GetProp, UploadProps } from "antd";
import { Button, Spin, message } from "antd";
import { useState } from "react";
import { FaBan, FaCamera, FaUser } from "react-icons/fa";
import UseGetAuth from "../hooks/useGetAuth";
import { useUploadProfilePictureMutation } from "../redux/data/profilePicture";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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

  const convertBase64 = (file: FileType) => {
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
    <div className="w-fit space-y-4 relative">
      {uploadUrl && (
        <FaBan
          className="absolute -right-2 -top-2 text-xl text-red-600 z-[99999]"
          onClick={() => setUploadUrl("")}
        />
      )}{" "}
      <div className="relative rounded-lg bg-blue-100 w-[200px] h-[200px] flex flex-col items-center justify-center overflow-hidden group">
        {uploadingImage && (
          <div className="h-full w-full bg-black bg-opacity-50 absolute left-0 top-0 flex items-center justify-center z-[99999]">
            <Spin />
          </div>
        )}
        <div className="relative">
          <input
            type="file"
            onChange={getImage}
            className="relative z-[9999] !h-[200px] !w-[200px] opacity-0"
          />
          <div className="flex flex-col items-center justify-center h-[200px] w-[200px] absolute z-[999] top-0 left-0 opacity-0 group-hover:opacity-100 duration-300">
            <div className="border rounded-full p-4">
              <FaCamera className="text-white text-5xl " />
            </div>
            <div className="h-full w-full bg-black bg-opacity-25 absolute z-30 left-0 top-0"></div>
          </div>
        </div>
        {uploadUrl ? (
          <img
            src={uploadUrl && uploadUrl}
            alt=""
            className="object-cover h-full w-full absolute top-0 left-0 z-50"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
            {props.data?.profilePicture ? (
              <img
                src={props.data?.profilePicture}
                alt={props.data.firstName}
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
