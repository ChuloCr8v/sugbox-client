import dayjs from "dayjs";
import { FaUser } from "react-icons/fa";
import useGetAuth from "../hooks/useGetAuth";

const ProfileCard = () => {
  const { user } = useGetAuth();

  return (
    <button className="border rounded-md p-4 pt-2 pb-4 bg-white w-full shadow hover:shadow-blue-200 duration-200 ">
      <p className="uppercase text-[13px] text-left text-gray-500 font-semibold border-b mb-4">
        Profile
      </p>
      <div className="flex items-start gap-4">
        {/* {avatar()}{" "} */}
        <div className="w-[70px] h-[70px] bg-primaryblue text-5xl font-semibold rounded-xl text-white flex flex-col justify-center items-center">
          <FaUser />
        </div>
        <div className="flex flex-col items-start">
          <p className=" font-semibold">
            <span className="text-gray-500 font-normal">Organisation:</span>{" "}
            {user?.companyName}
          </p>
          <p className="font-semibold">
            <span className="text-gray-500 font-normal">Email:</span>{" "}
            {user?.companyName}
          </p>
          <p className="font-semibold">
            <span className="text-gray-500 font-normal">Created On:</span>{" "}
            {dayjs(user?.createdAt).format("DD.MM.YYYY")}
          </p>
        </div>{" "}
      </div>
      {/* <div className="capitalize text-sm text-gray-500 flex gap-2 mt-4 border-t pt-2">
        <p className="">
          <span className="text-primaryblue font-semibold">
            {employees.length}{" "}
          </span>
          employees
        </p>
        <p className="border-l pl-2">
          <span className="text-primaryblue font-semibold">
            {suggestions.length}
          </span>{" "}
          suggestions
        </p>
      </div> */}
    </button>
  );
};

export default ProfileCard;
