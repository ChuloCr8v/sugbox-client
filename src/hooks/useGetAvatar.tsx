import { twMerge } from "tailwind-merge";
import { useGetEmployeeQuery } from "../redux/data/employees";

const useGetAvatar = (userId?: string) => {
  const { data: employee } = useGetEmployeeQuery(userId);

  const avatar = () => {
    return (
      <div className="rounded-lg h-[350px] lg:h-[200px] lg:w-[200px] overflow-hidden">
        {employee?.profilePicture ? (
          <img
            src={employee?.profilePicture}
            alt={employee?.firstName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={twMerge(
              "h-[200px] w-full lg:h-40 bg-primaryblue text-[120px] lg:text-[80px] font-semibold rounded-xl text-white flex flex-col justify-center items-center"
            )}
          >
            {employee?.firstName.slice(0, 1) + employee?.lastName.slice(0, 1)}
          </div>
        )}
      </div>
    );
  };

  return { avatar };
};

export default useGetAvatar;
