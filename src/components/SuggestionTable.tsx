import { Link, useNavigate } from "react-router-dom";
import TableComponent from "./Table";
import { suggestionProps } from "../types";
import { ReactNode } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import SuggestionStatusTag from "./SuggestionStatusTag";
import dayjs from "dayjs";

type Props = {
  isLoading: boolean;
  filteredData: suggestionProps[];
  //  columns: Array<object>;
};

const SuggestionTable = (props: Props) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_: ReactNode, record: { _id: string; title: string }) => (
        <a
          href={`/suggestion/${record._id}`}
          className="capitalize font-semibold text-primaryblue"
        >
          {record.title}
        </a>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: ReactNode, record: { createdAt: string }) =>
        dayjs(record.createdAt).format("DD.MM.YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: ReactNode, record: { status: string }) => (
        <SuggestionStatusTag status={record.status} />
      ),
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (_: ReactNode, record: { comments: Array<object> }) => (
        <div className="flex items-center gap-2">{record.comments.length}</div>
      ),
    },
    {
      title: "Upvotes",
      dataIndex: "upvotes",
      key: "upvotes",
      render: (_: ReactNode, record: { upVotes: Array<object> }) => (
        <div className="flex items-center gap-2">{record.upVotes.length}</div>
      ),
    },
    {
      title: "Downvotes",
      dataIndex: "downvotes",
      key: "downvotes",
      render: (_: ReactNode, record: { downVotes: Array<object> }) => (
        <div className="flex items-center gap-2">{record.downVotes.length}</div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "open",
      render: (_: ReactNode, record: { _id: string }) => (
        <Link
          className="text-gray-500 hover:text-primaryblue duration-200"
          to={`/suggestion/${record._id}`}
        >
          <FaLongArrowAltRight />
        </Link>
      ),
    },
  ];

  return (
    <div>
      {" "}
      <TableComponent
        loading={props.isLoading}
        data={props.filteredData}
        columns={columns}
        onRow={(record: suggestionProps) => {
          return {
            onClick: () => {
              navigate(`/suggestion/${record._id}`);
            },
          };
        }}
      />
    </div>
  );
};

export default SuggestionTable;
