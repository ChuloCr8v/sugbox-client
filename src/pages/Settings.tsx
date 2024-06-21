import { Button, Select, Switch, message } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ProfilePicture from "../components/ProfilePicture";
import { Label } from "../components/SmallerComponents";
import { SectionHeading } from "../components/Suggestions";
import ConfirmEmailUpdateModal from "../components/modals/ConfirmEmailUpdateModal";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../redux/data/employees";
import {
  useEditOrganizationMutation,
  useGetOrganizationQuery,
} from "../redux/data/organizations";
import UseGetAuth from "../hooks/useGetAuth";

const employeeDataFields = {
  email: "",
  firstName: "",
  lastName: "",
  defaultAnonymousSuggestion: false,
  adminRole: "",
  officeRole: "",
  notifications: {
    newSuggestionSubmitted: false,
    newLikeOnSuggestion: false,
    newCommentOnSuggestion: false,
    suggestionStatusUpdate: false,
    adminCommentsOnSuggestion: false,
    suggestionEdited: false,
    suggestionDeleted: false,
  },
};

const Settings = () => {
  const { id } = useParams();
  const { data: employee } = useGetEmployeeQuery(id);
  const [editEmployee, { isLoading: updatingPersonalInfo }] =
    useEditEmployeeMutation();
  const [editOrganization, { isLoading: updatingOrgInfo }] =
    useEditOrganizationMutation();
  const [confirmResetPasswordIsOpen, setResetPasswordIsOpen] = useState(false);

  const [employeeData, setEmployeeData] = useState(employeeDataFields);
  const { data: organization } = useGetOrganizationQuery(id);
  const [orgData, setOrgData] = useState({ companyName: "" });

  const { isAdmin } = UseGetAuth();

  useEffect(() => {
    isAdmin ? setOrgData(organization) : setEmployeeData(employee);
  }, [employee]);

  const officeRoles = [
    {
      title: "Frontend Developer",
      id: 1,
    },
    {
      title: "Backend Developer",
      id: 2,
    },
    {
      title: "UI/UX Developer",
      id: 3,
    },
  ];

  const organizationData = [
    {
      title: "email",
      type: "email",
      value: organization?.companyEmail,
      name: "email",
    },
    {
      title: "Organization name",
      type: "text",
      value: organization?.companyName,
      name: "companyName",
    },
  ];

  const personalInfoData = [
    {
      title: "email",
      type: "email",
      value: employeeData?.email,
      name: "email",
    },
    {
      title: "first name",
      type: "text",
      value: employeeData?.firstName,
      name: "firstName",
    },
    {
      title: "last name",
      type: "text",
      value: employeeData?.lastName,
      name: "lastName",
    },
    {
      title: "admin role",
      type: "select",
      value: employeeData?.adminRole,
      options: ["Admin", "Moderator", "Staff"],
      name: "adminRole",
    },
    {
      title: "office role",
      type: "select",
      value: employeeData?.officeRole,
      options: officeRoles.map((item) => item.title),
      name: "officeRole",
    },
    {
      title: "anonymous by default",
      type: "select",
      value: employeeData?.defaultAnonymousSuggestion,
      options: [true, false],
      name: "defaultAnonymous",
    },
  ];

  const notificationData = [
    {
      title: "New suggestion submitted",
      type: "switch",
      value: employeeData?.notifications?.newSuggestionSubmitted,
      name: "newSuggestionSubmitted",
    },
    {
      title: "New like on my suggestion",
      type: "switch",
      value: employeeData?.notifications?.newLikeOnSuggestion,
      name: "newLikeOnSuggestion",
    },
    {
      title: "New comment on my suggestion",
      type: "switch",
      value: employeeData?.notifications?.newCommentOnSuggestion,
      name: "newCommentOnSuggestion",
    },
    {
      title: "Suggestion status update",
      type: "switch",
      value: employeeData?.notifications?.suggestionStatusUpdate,
      name: "suggestionStatusUpdate",
    },
    {
      title: "Suggestion Deleted",
      type: "switch",
      value: employeeData?.notifications?.suggestionDeleted,
      name: "suggestionDeleted",
    },
    {
      title: "Suggestion Edited",
      type: "switch",
      value: employeeData?.notifications?.suggestionEdited,
      name: "suggestionEdited",
    },
    {
      title: "Admin comments on my suggestion",
      type: "switch",
      value: employeeData?.notifications?.adminCommentsOnSuggestion,
      name: "adminCommentsOnSuggestion",
    },
  ];

  const handleChangeProfileDetail = (name: string, value: ReactNode) => {
    isAdmin
      ? setOrgData((prev) => ({ ...prev, [name]: value }))
      : setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEmployee = async () => {
    const editAction = isAdmin
      ? editOrganization(orgData)
      : editEmployee(employeeData);

    try {
      const res = await editAction.unwrap();
      message.success("Profile edited successfully.");
      console.log(res);
    } catch (error) {
      console.log(error);
      message.error("Error!, unable to edit profile, try again.");
    }
  };

  const handleUpdateNotificationsSettiings = (
    name: string,
    value: ReactNode
  ) => {
    setEmployeeData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: value,
      },
    }));
  };

  const profileDetail = isAdmin ? organizationData : personalInfoData;

  const disableUpdateButton = () => {
    if (isAdmin && orgData?.companyName === organization?.companyName) {
      return true;
    } else if (
      !isAdmin &&
      (employeeData?.firstName === employee?.firstName ||
        employeeData?.lastName === employee?.lastName)
    ) {
      return true;
    }
  };

  return (
    <div className="px-4 py-24 w-full flex flex-col relative">
      <div className="w-full flex flex-col gap-8">
        <SectionHeading heading={"Settings"} />
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="profile-pic w-fit relative">
            <ProfilePicture />
          </div>
          <div className="w-full grid gap-6 max-[390px]:pt-4">
            <div className="w-full md:border flex flex-col items-start gap-2 rounded-lg md:p-4">
              <div className="text-primaryblue font-bold !text-xl">
                <SectionHeading heading={"Personal Details"} />
              </div>
              <div className="flex flex-col lg:grid grid-cols-2 gap-4 w-full">
                {profileDetail.map((item: any) => (
                  <div
                    className={twMerge(
                      "grid gap-2 ",
                      item.title === "email" &&
                        !isAdmin &&
                        "col-span-2 w-full xl:w-1/2"
                    )}
                    key={item.title}
                  >
                    <label className="capitalize text-gray-500">
                      {item.title}
                    </label>
                    {item.type === "text" ? (
                      <input
                        name={item.name}
                        onChange={(e) =>
                          handleChangeProfileDetail(
                            e.target.name,
                            e.target.value
                          )
                        }
                        type="text"
                        defaultValue={item.value}
                        className="h-9 p-2 border border-gray-300 hover:border-primaryblue duration-200 rounded w-full"
                      />
                    ) : item.type === "email" ? (
                      <div className="flex items-center justify-between gap-2 border border-gray-300 h-9 px-2 pr-0.5 xl:mr-2 rounded-md">
                        <p className=""> {item.value}</p>
                        <Button
                          onClick={() => setResetPasswordIsOpen(true)}
                          className="bg-primaryblue hover:!bg-blue-700 hover:!text-white text-white h-8 flex items-center font-semibold"
                        >
                          Edit Email
                        </Button>
                      </div>
                    ) : item.name === "defaultAnonymous" ? (
                      <div className="">
                        <Switch
                          defaultChecked
                          className="bg-gray-400"
                          onChange={(value) =>
                            handleChangeProfileDetail(
                              "defaultAnonymousSuggestion",
                              value
                            )
                          }
                          value={item.value}
                        />
                      </div>
                    ) : (
                      <Select
                        onChange={(value) =>
                          handleChangeProfileDetail(item.name, value)
                        }
                        className="h-9 !outline-none hover:border-primaryblue duration-200 rounded w-full"
                        value={item.value}
                        options={item.options?.map((option: any) => ({
                          label: option,
                          value: option,
                        }))}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full border flex flex-col items-start gap-4 rounded-lg p-4">
              <div className="text-primaryblue font-bold !text-xl">
                <SectionHeading heading={"Notification Settings"} />
              </div>
              <div className="flex flex-col lg:grid grid-cols-2 gap-y-4 justify-between w-full">
                {notificationData.map((item) => (
                  <div className="grid gap-2" key={item.title}>
                    <Label title={item.title} labelClassName="text-gray-500" />

                    <Switch
                      defaultChecked
                      className="bg-gray-400 w-fit"
                      onChange={(value) => {
                        handleUpdateNotificationsSettiings(item.name, value);
                      }}
                      value={item.value}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button
          loading={updatingPersonalInfo || updatingOrgInfo}
          onClick={handleEditEmployee}
          disabled={disableUpdateButton()}
          className="fixed right-10 bottom-10 ring-4 border-none shadow-none bg-primaryblue  hover:!bg-blue-700 hover:!text-white text-white h-9 flex items-center font-semibold"
        >
          Update Profile{" "}
        </Button>
      </div>

      <ConfirmEmailUpdateModal
        setConfirmResetPasswordIsOpen={setResetPasswordIsOpen}
        confirmResetPasswordIsOpen={confirmResetPasswordIsOpen}
      />
    </div>
  );
};

export default Settings;
