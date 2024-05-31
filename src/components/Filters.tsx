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
      props.data.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
      }) || [];

    console.log(filter);
    props.setFilteredData(filter);
  };

  const filterByLatest = () => {
    const filter =
      props.data.slice().sort((a, b) => {
        const timestampA = new Date(a.createdAt).getTime();
        const timestampB = new Date(b.createdAt).getTime();
        return timestampB - timestampA;
      }) || [];

    console.log(filter);
    props.setFilteredData(filter);
  };

  const filterByUpVotes = () => {
    const filter =
      props.data.slice().sort((a, b) => {
        return b.upVotes.length - a.upVotes.length;
      }) || [];

    console.log(filter);
    props.setFilteredData(filter);
  };

  const filterByDownVotes = () => {
    const filter =
      props.data.slice().sort((a, b) => {
        return b.upVotes.length - a.downVotes.length;
      }) || [];

    console.log(filter);
    props.setFilteredData(filter);
  };

  const items = [
    {
      onClick: () => props.setFilteredData(props.data),
      key: 1,
      label: <button className="">All</button>,
      icon: <FaHashtag />,
    },
    {
      onClick: filterByLatest,
      key: 2,
      label: <button className="">Latest</button>,
      icon: <FaUpload />,
    },
    {
      onClick: filterByRelevance,
      key: 3,
      label: <button className="">Relevance</button>,
      icon: <FaArrowUp />,
    },
    {
      key: 4,
      label: <button className="">Upvotes</button>,
      icon: <FaRegThumbsUp />,
      onClick: filterByUpVotes,
    },
    {
      key: 5,
      label: <button className="">Downvotes</button>,
      icon: <FaRegThumbsDown />,
      onClick: filterByDownVotes,
    },
    // {
    //   key: 4,
    //   label: <button className="">Comments</button>,
    //   icon: <FaRegComment />,
    // },
  ];

  const StatusItems = [
    {
      onClick: () => props.setFilteredData(props.data),
      key: 1,
      label: <button className="">All</button>,
      icon: <FaHashtag />,
    },
    {
      onClick: () => props.setFilteredData(approvedSuggestions),
      key: 2,
      label: <button className="">Approved</button>,
      icon: <FaCheck />,
    },
    {
      onClick: () => props.setFilteredData(rejectedSuggestions),
      key: 3,
      label: <button className="">Rejected</button>,
      icon: <FaBan />,
    },
    {
      onClick: () => props.setFilteredData(pendingSuggestions),
      key: 4,
      label: <button className="">Pending</button>,
      icon: <FaEllipsisV />,
    },
  ];

  const handleSearchSuggestion = (value: string) => {
    console.log(value);
    setFilterValue((prev) => ({ ...prev, searchValue: value }));
    const searchResult = props.data.filter((d: { title: string }) =>
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
    <div className="flex items-center gap-2">
      <Input
        value={filterValue.searchValue}
        onChange={(e) => handleSearchSuggestion(e.target.value)}
        placeholder="Enter search term"
        prefix={<FaSearch className="text-[#777777] pr-1" />}
        className="border-gray-300 border h-8 rounded w-full"
      />
      <Dropdown placement="bottom" menu={{ items }} className="cursor-pointer">
        <a
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-between gap-2 "
        >
          <button
            className={twMerge(
              "flex items-center justify-center text-sm text-gray-500 hover:text-primaryblue gap-2 border border-gray-300 bg-white hover:border-primaryblue w-[100px] h-8 rounded duration-200",
              showMobileFilter && "border-primaryColor text-primaryColor"
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
          className="flex items-center justify-between gap-2 "
        >
          <button
            className={twMerge(
              "flex items-center justify-center text-sm text-gray-500 hover:text-primaryblue gap-2 border border-gray-300 bg-white hover:border-primaryblue w-[100px] h-8 rounded duration-200",
              showMobileFilter && "border-primaryColor text-primaryColor"
            )}
            //   onClick={() => setShowMobileFilter(!showMobileFilter)}
          >
            <FaInfo className="-ml-1" />
            Status
          </button>
        </a>
      </Dropdown>
      <Button
        className="text-gray-500 rounded"
        onClick={handleRefresh}
        loading={props.isRefreshing}
        icon={<FaCircleNotch className="leading-none text-[13px] -mb-0.5" />}
      >
        Refresh
      </Button>
    </div>
  );
};

export default Filter;
