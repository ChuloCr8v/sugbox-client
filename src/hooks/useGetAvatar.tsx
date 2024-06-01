import { twMerge } from "tailwind-merge";
import { useGetEmployeeQuery } from "../redux/data/employees";

const useGetAvatar = (userId?: string) => {
  const { data: employee } = useGetEmployeeQuery(userId);

  const avatar = () => {
    return (
      <div
        className={twMerge(
          "h-[300px] w-full lg:h-40 lg:w-40 bg-primaryblue text-[120px] lg:text-[80px] font-semibold rounded-xl text-white flex flex-col justify-center items-center"
        )}
      >
        <span className="leading-[0] -mt-2">
          {employee?.firstName.slice(0, 1) + employee?.lastName.slice(0, 1)}
        </span>
      </div>
    );
  };

  return { avatar };
};

export default useGetAvatar;
