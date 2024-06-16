import { Button, Popconfirm, Table, message } from "antd";
import { ReactNode } from "react";
import { FaBan } from "react-icons/fa";
import EmployeeStatusTag from "../components/EmployeeStatusTag";
import { SectionHeading } from "../components/Suggestions";
import useGetEmployees from "../hooks/useGetEmployees";
import { useUpdateEmployeeRoleMutation } from "../redux/data/employees";
import { handleUpdateEmployeeRole } from "./Profile";

type Props = {};

const Moderators = () => {
  const { employees, isLoading } = useGetEmployees();
  const [updateEmployeeRole] = useUpdateEmployeeRoleMutation();

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
          <Button
            className="flex items-center text-red-500 border-red-500 hover:!border-red-500 hover:!text-red-500 hover:!outline outline-red-200"
            icon={<FaBan />}
          >
            Remove Admin Priviledges
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="pt-24 px-4 w-full">
      <SectionHeading heading={"Moderators"} />
      <div className="w-full">
        <Table dataSource={moderators} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
};

export default Moderators;
