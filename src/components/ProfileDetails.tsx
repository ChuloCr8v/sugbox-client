import UseGetAuth from "../hooks/useGetAuth";
import useGetAvatar from "../hooks/useGetAvatar";

const ProfileDetails = () => {
  const { isAdmin, user: others } = UseGetAuth();
  const { avatar } = useGetAvatar();

  const name = isAdmin ? others.companyName : "";
  const email = isAdmin ? others.companyEmail : "";
  const role = isAdmin ? "Admin" : "";
  return (
    <div className="profile_card w-full p-4 pr-8 bg-white rounded-md border flex justify-start items-center gap-4">
      <div className="h-24 w-24 bg-primaryblue flex items-center justify-center rounded-md">
        {avatar()}
      </div>
      <div className="space-y-1">
        <p className="text-left font-semibold text-primaryblue uppercase">
          <span className="text-gray-500 capitalize">organization: </span>
          {name}
        </p>
        <p className="text-left text-gray-500">
          {" "}
          <span className="text-gray-500 capitalize">email: </span>
          {email}
        </p>
        <p className="text-left text-gray-500">
          {" "}
          <span className="text-gray-500 capitalize">Role: </span>
          {role}
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;
