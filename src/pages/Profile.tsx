import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentsCard";
import ErrorComponent from "../components/ErrorComponent";
import SuggestionTable from "../components/SuggestionTable";
import { NoDataComponent, SectionHeading } from "../components/Suggestions";
import UseGetAuth from "../hooks/useGetAuth";
import useGetAvatar from "../hooks/useGetAvatar";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { useGetCommentsQuery } from "../redux/data/Comments";
import { useGetEmployeeQuery } from "../redux/data/employees";
import { useGetOrganizationQuery } from "../redux/data/organizations";
import { suggestionProps } from "../types";

const Profile = () => {
  const { id } = useParams();
  const {
    data: employee,
    isError,
    isLoading: loadingEmployees,
  } = useGetEmployeeQuery(id);
  const { data: organization } = useGetOrganizationQuery(employee?.companyId);
  const { avatar } = useGetAvatar(id);
  const { suggestions, isLoading } = useGetSuggestions();
  const [filteredData, setFilteredData] = useState<Array<suggestionProps>>([]);
  const { data: comments } = useGetCommentsQuery("");
  const userComments = comments?.filter(
    (comment: { userId: string }) => comment.userId === id
  );
  const { isAdmin } = UseGetAuth();

  const userSuggestions = suggestions?.filter(
    (suggestion: { userId: string }) => suggestion?.userId === id
  );

  const data = userSuggestions
    ?.slice()
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  useEffect(() => {
    setFilteredData(data);
  }, [suggestions]);

  // const PageTitle = (props: { data: Array<object>; title: ReactNode }) => {
  //   return (
  //     <div className="flex items-center gap-2">
  //       <p className="capitalize">{props.title}</p>{" "}
  //       <div className="bg-primaryblue rounded-full text-white h-6 w-6 flex items-center justify-center">
  //         {props?.data?.length ? props?.data?.length : 0}
  //       </div>
  //     </div>
  //   );
  // };

  const anonymousSuggestions = () => {
    return employee?.defaultAnonymous ? "ON" : "OFF";
  };

  const profileData = [
    {
      title: "first name",
      data: employee?.firstName,
    },
    {
      title: "last name",
      data: employee?.lastName,
    },
    {
      title: "Email",
      data: employee?.email,
    },
    {
      title: "Organization",
      data: organization?.companyName,
    },
    {
      title: "department",
      data: employee?.department,
    },
    {
      title: "role",
      data: employee?.adminRole,
    },
    {
      title: "anonymous suggestions",
      data: anonymousSuggestions(),
    },
    {
      title: "total suggestions",
      data: employee?.suggestions.length,
    },
  ];

  if (loadingEmployees) {
    return (
      <div className="h-screen w-full flex justify-center items-center gap-4">
        <Spin /> Loading...
      </div>
    );
  } else if (isError) {
    return (
      <div className="">
        <ErrorComponent />
      </div>
    );
  }

  return (
    <div className="px-4 py-24 w-full flex flex-col">
      <div className="w-full flex flex-col gap-8">
        {/* <SectionHeading heading={isAdmin ? profileTitle : userProfileTitle} /> */}

        <div className="flex flex-col justify-center items-start lg:grid grid-cols-12 gap-4">
          <div className="profile-pic col-span-2 w-full">{avatar()}</div>
          <div className="col-span-10 grid gap-4 w-full border border-gray-300 rounded-lg p-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {profileData.map((item) => (
                <div className="flex flex-col items-start" key={item.title}>
                  <p className="text-gray-500 capitalize">{item.title}</p>
                  <p className="font-semibold capitalize">{item.data}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="">
          <div className="grid gap-8">
            <SectionHeading
              heading={
                <SectionHeading
                  heading={<>{isAdmin ? "Employee" : "My"} Suggestions</>}
                  count={filteredData?.length}
                />
              }
            />
          </div>

          {userSuggestions?.length > 0 ? (
            <div className="grid gap-4 mt-4">
              <SuggestionTable
                isLoading={isLoading}
                filteredData={filteredData}
              />
            </div>
          ) : (
            <NoDataComponent message="No Suggestions from this employee yet" />
          )}
        </div>

        {!isAdmin && (
          <div className="grid gap-4">
            <SectionHeading
              heading={
                <SectionHeading
                  heading={"My Comments"}
                  count={userComments?.length}
                />
              }
            />
            <CommentCard userId={id} userSuggestions={userSuggestions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
