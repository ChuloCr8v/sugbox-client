import { Button, Popconfirm, message } from "antd";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import EmployeeStatusTag from "../components/EmployeeStatusTag";
import { SectionHeading } from "../components/Suggestions";
import TableComponent from "../components/Table";
import useGetEmployees from "../hooks/useGetEmployees";
import { useUpdateEmployeeRoleMutation } from "../redux/data/employees";
import { openAddModeratorModal } from "../redux/modals";
import { handleUpdateEmployeeRole } from "./Profile";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { LoadingModal } from "../components/HeaderProfile";
import SpinLoading from "../components/SpinLoading";

const Moderators = () => {
  const { employees, isLoading, isError } = useGetEmployees();
  const [updateEmployeeRole] = useUpdateEmployeeRoleMutation();

  const dispatch = useDispatch();

  const moderators = employees?.filter(
    (employee: { isModerator: boolean }) => employee.isModerator
  );

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (
        _: ReactNode,
        record: { _id: string; firstName: string; lastName: string }
      ) => (
        <a
          href={`/profile/${record._id}`}
          className="capitalize font-bold text-primaryblue"
        >
          {record.firstName + " " + record.lastName}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: ReactNode, record: { isDisabled: boolean }) => (
        <EmployeeStatusTag status={record.isDisabled} />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (
        _: ReactNode,
        record: { _id: string; firstName: string; lastName: string }
      ) => (
        <Popconfirm
          icon
          title={"Remove Moderator"}
          description={`Remove moderator priviledges for ${
            record?.firstName + " " + record?.lastName
          }`}
          onConfirm={() =>
            handleUpdateEmployeeRole(message, record?._id, updateEmployeeRole)
          }
          okText={"Remove"}
          okButtonProps={{
            rootClassName: "bg-primaryblue ",
          }}
          className="col-span-2"
        >
          <Button className="p-0 border-none hover:border-none h-0 flex items-center text-red-500 hover:!text-red-400">
            Remove Moderator Priviledges
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (isError) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <SpinLoading />;
  }

  return (
    <div className="pt-24 px-4 w-full space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading heading={"Moderators"} />
        <Button
          onClick={() => dispatch(openAddModeratorModal())}
          rootClassName="bg-primaryblue text-white border-none shadow-none hover:!bg-hoverblue hover:!text-white outline-blue-300"
        >
          Add Moderator
        </Button>
      </div>
      <div className="w-full">
        <TableComponent
          data={moderators}
          columns={columns}
          key={moderators}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Moderators;
