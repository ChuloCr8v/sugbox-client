import { twMerge } from "tailwind-merge";
import { useGetEmployeeQuery } from "../redux/data/employees";

const useGetAvatar = (userId?: string) => {
  const { data: employee } = useGetEmployeeQuery(userId);

  const avatar = () => {
    return (
      <div className="w-full md:w-[200px] rounded-lg overflow-hidden">
        {employee?.profilePicture ? (
          <img
            src={employee?.profilePicture}
            alt={employee?.firstName}
            className="object-cover !object-center h-[200px] w-full md:w-[200px] "
          />
        ) : (
          <div
            className={twMerge(
              "h-full w-full lg:h-40 bg-primaryblue text-[120px] lg:text-[80px] font-semibold rounded-xl text-white flex flex-col justify-center items-center"
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
