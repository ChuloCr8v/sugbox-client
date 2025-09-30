import { Button, Dropdown, Input } from "antd";
import { useState } from "react";
import {
  FaArrowUp,
  FaBan,
  FaCheck,
  FaCircleNotch,
  FaEllipsisV,
  FaFunnelDollar,
  FaHashtag,
  FaInfo,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaSearch,
  FaUpload,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { suggestionProps } from "../types";

type Props = {
  data: Array<suggestionProps>;
  isRefreshing: boolean;
  setFilteredData: (arg0: any) => void;
  refetch: () => void;
};

const Filter = (props: Props) => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filterValue, setFilterValue] = useState({ searchValue: "" });
  const { approvedSuggestions, rejectedSuggestions, pendingSuggestions } =
    useGetSuggestions();

  const filterByRelevance = () => {
    const filter =
      props.data
        .slice()
        .sort((a, b) => b.comments.length - a.comments.length) || [];
    props.setFilteredData(filter);
  };

  const filterByLatest = () => {
    const filter =
      props.data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) || [];
    props.setFilteredData(filter);
  };

  const filterByUpVotes = () => {
    const filter =
      props.data.slice().sort((a, b) => b.upVotes.length - a.upVotes.length) ||
      [];
    props.setFilteredData(filter);
  };

  const filterByDownVotes = () => {
    const filter =
      props.data
        .slice()
        .sort((a, b) => b.downVotes.length - a.downVotes.length) || [];
    props.setFilteredData(filter);
  };

  const items = [
    {
      onClick: () => props.setFilteredData(props.data),
      key: 1,
      label: "All",
      icon: <FaHashtag />,
    },
    { onClick: filterByLatest, key: 2, label: "Latest", icon: <FaUpload /> },
    {
      onClick: filterByRelevance,
      key: 3,
      label: "Relevance",
      icon: <FaArrowUp />,
    },
    {
      onClick: filterByUpVotes,
      key: 4,
      label: "Upvotes",
      icon: <FaRegThumbsUp />,
    },
    {
      onClick: filterByDownVotes,
      key: 5,
      label: "Downvotes",
      icon: <FaRegThumbsDown />,
    },
  ];

  const StatusItems = [
    {
      onClick: () => props.setFilteredData(props.data),
      key: 1,
      label: "All",
      icon: <FaHashtag />,
    },
    {
      onClick: () => props.setFilteredData(approvedSuggestions),
      key: 2,
      label: "Approved",
      icon: <FaCheck />,
    },
    {
      onClick: () => props.setFilteredData(rejectedSuggestions),
      key: 3,
      label: "Rejected",
      icon: <FaBan />,
    },
    {
      onClick: () => props.setFilteredData(pendingSuggestions),
      key: 4,
      label: "Pending",
      icon: <FaEllipsisV />,
    },
  ];

  const handleSearchSuggestion = (value: string) => {
    setFilterValue((prev) => ({ ...prev, searchValue: value }));
    const searchResult = props.data.filter((d) =>
      d.title.toLowerCase().includes(value.toLowerCase())
    );
    props.setFilteredData(searchResult);
  };

  const handleRefresh = () => {
    setFilterValue({ searchValue: "" });
    props.refetch();
    props.setFilteredData(props.data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-3 mt-4">
      {/* Search */}
      <Input
        size="large"
        value={filterValue.searchValue}
        onChange={(e) => handleSearchSuggestion(e.target.value)}
        placeholder="Enter search term"
        prefix={<FaSearch className="text-gray-400 dark:text-gray-500 pr-1" />}
        className="col-span-3 border-gray-600 dark:border-gray-700 w-full dark:bg-black/40 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 max-w-[400px]"
      />

      {/* Buttons */}
      <div className="grid grid-cols-3 md:flex items-center gap-2">
        <Dropdown
          placement="bottom"
          menu={{ items }}
          className="cursor-pointer"
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between gap-2"
          >
            <button
              className={twMerge(
                " w-full min-w-[100px] flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:text-primaryblue gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/40 hover:border-primaryblue h-9 rounded-md px-3 transition duration-200",
                showMobileFilter && "border-primaryblue text-primaryblue"
              )}
              onClick={() => setShowMobileFilter(!showMobileFilter)}
            >
              <FaFunnelDollar className="-ml-1" />
              Filter
            </button>
          </a>
        </Dropdown>

        <Dropdown
          placement="bottom"
          menu={{ items: StatusItems }}
          className="cursor-pointer"
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between gap-2"
          >
            <button className="w-full min-w-[100px] flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:text-primaryblue gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/40 hover:border-primaryblue h-9 rounded-md px-3 transition duration-200">
              <FaInfo className="-ml-1" />
              Status
            </button>
          </a>
        </Dropdown>

        <Button
          className="text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/40 hover:border-primaryblue rounded-md h-9 flex items-center"
          onClick={handleRefresh}
          loading={props.isRefreshing}
          icon={<FaCircleNotch className="leading-none text-[13px] -mb-0.5" />}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Filter;
