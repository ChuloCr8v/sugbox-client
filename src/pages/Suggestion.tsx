import { Button, Dropdown, Spin, Tooltip, message } from "antd";
import { useState } from "react";
import {
  FaBan,
  FaChevronDown,
  FaRegCalendarAlt,
  FaRegCheckCircle,
  FaRegCommentAlt,
  FaRegUser,
  FaUserNinja,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";
import Comments from "../components/Comments";
import ErrorComponent from "../components/ErrorComponent";
import SuggestionActionButtons from "../components/SuggestionActionButtons";
import SuggestionAttachmentComponent from "../components/SuggestionAttachmentComponent";
import SuggestionStatusTag from "../components/SuggestionStatusTag";
import TrendingSuggestions from "../components/TrendingSuggestions";
import VoteComponent from "../components/VoteComponent";
import DeleteItemModal from "../components/modals/DeleteItemModal";
import useDownvoteSuggestion from "../hooks/suggestion/useDownVoteSuggestion";
import useUpvoteSuggestion from "../hooks/suggestion/useUpvoteSuggestion";
import UseGetAuth from "../hooks/useGetAuth";
import { useAddCommentMutation } from "../redux/data/Comments";
import { useGetEmployeeQuery } from "../redux/data/employees";
import {
  useDeleteSuggestionMutation,
  useGetSuggestionQuery,
} from "../redux/data/suggestions";
import { hideNewCommentModal } from "../redux/modals";
import { dateFormatter } from "../utils.ts/dateFormatter";

const Suggestion = () => {
  const { id: userId, isAdmin } = UseGetAuth();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: suggestion,
    isLoading,
    error: getSuggestionError,
  } = useGetSuggestionQuery(id);

  const { data: suggester, isLoading: loadingSuggester } = useGetEmployeeQuery(
    suggestion?.userId
  );

  const { upvoteSuggestion, upvoteSuggestionLoading } = useUpvoteSuggestion(id);
  const { downvoteSuggestion, downvoteSuggestionLoading } =
    useDownvoteSuggestion(id);

  const [openCommentSection, setOpenCommentSection] = useState(true);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [addComment, { isLoading: addCommentLoading }] =
    useAddCommentMutation();
  const [deleteSuggestion, { isLoading: deleteSuggestionLoading }] =
    useDeleteSuggestionMutation();

  const upvotedAlready = suggestion?.upVotes?.includes(userId);
  const downvotedAlready = suggestion?.downVotes?.includes(userId);

  const handleDeleteSuggestion = async () => {
    try {
      await deleteSuggestion(id).unwrap();
      message.success("Suggestion deleted successfully");
      setOpenDeleteItemModal(false);
      navigate("/dashboard");
    } catch (error) {
      message.error("Unable to delete suggestion, please try again.");
    }
  };

  const disableVoteFunction = () =>
    suggestion?.userId === userId || upvotedAlready;

  const disableDownVoteFunction = () =>
    suggestion?.userId === userId || downvotedAlready;

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center gap-2 font-semibold text-gray-400">
        <Spin /> Loading...
      </div>
    );
  }

  const addCommentFunction = async () => {
    try {
      await addComment({
        comment: commentText,
        id: suggestion._id,
        isAdmin: isAdmin,
      }).unwrap();
      message.success("Comment added successfully");
      setCommentText("");
      dispatch(hideNewCommentModal());
    } catch (error) {
      message.error("Unable to add comment, please try again");
    }
  };

  if (getSuggestionError) {
    return <ErrorComponent />;
  }

  const actionItems = [
    {
      key: "approve",
      label: "Approve",
      icon: <FaRegCheckCircle />,
    },
    {
      key: "Reject",
      label: "Reject",
      icon: <FaBan />,
    },
  ];

  return (
    <div className="py-24 h-screen overflow-y-auto px-4 w-full gap-6 bg-gradient-to-t from-primary/5 backdrop-blur-xl to-transparent flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-gray-600 flex flex-col sm:flex-row justify-between items-center gap-3 pb-4">
          <div className="grid gap-2">
            <h1 className="text-xl sm:text-2xl font-bold capitalize text-primary leading-tight">
              {suggestion?.title}
            </h1>

            <div className="flex gap-2 flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
              <SuggestionStatusTag status={suggestion?.status} />

              <div className="border-l-2 mx-2 mr-2 h-6 w-0 border-gray-600"></div>

              {loadingSuggester ? (
                <Spin />
              ) : suggestion?.isAnonymous ? (
                <div className="flex items-center gap-2 font-medium">
                  <FaUserNinja />
                  Anonymous
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegUser />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/profile/${suggester?._id}`}
                    className="text-primaryblue hover:underline"
                  >
                    {suggester?.firstName + " " + suggester?.lastName}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt />
                {dateFormatter(suggestion?.createdAt)}
              </div>
            </div>
          </div>

          <Dropdown menu={{ items: actionItems }}>
            <Button className="w-[120px]" type="primary">
              Action
              <FaChevronDown />
            </Button>
          </Dropdown>
        </div>

        {/* Body */}
        <div className="">
          <p className="pb-5 text-gray-800 dark:text-gray-200 leading-relaxed">
            {suggestion?.suggestion}
          </p>

          <div className="flex items-center flex-wrap gap-3 mt-4">
            <VoteComponent
              downVoteLoading={downvoteSuggestionLoading}
              upVoteLoading={upvoteSuggestionLoading}
              upVotesLength={suggestion?.upVotes?.length}
              downVotesLength={suggestion?.downVotes?.length}
              downVotesClick={downvoteSuggestion}
              upVotesClick={upvoteSuggestion}
              suggestion={suggestion}
              disableVoteFunction={disableVoteFunction}
              disableDownVoteFunction={disableDownVoteFunction}
            />

            <Tooltip title="Click to view or hide comments">
              <Button
                icon={<FaRegCommentAlt className="text-sm" />}
                onClick={() => setOpenCommentSection(!openCommentSection)}
                className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-md h-9 px-3 bg-white dark:bg-black/40 hover:border-primaryblue hover:text-primaryblue transition"
              >
                {suggestion?.comments?.length || 0}{" "}
                {suggestion?.comments?.length === 1 ? "Comment" : "Comments"}
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Actions + Attachments */}
        <div className="grid gap-4">
          <SuggestionActionButtons
            id={suggestion?._id}
            setOpenDeleteItemModal={setOpenDeleteItemModal}
          />
          {suggestion?.attachments?.length > 0 && (
            <SuggestionAttachmentComponent suggestion={suggestion} />
          )}
        </div>

        {/* Comment Box */}
        <CommentBox
          handleBtnClick={addCommentFunction}
          placeholder="Start typing..."
          comment={commentText}
          onchange={(e) => setCommentText(e.target.value)}
          setComment={setCommentText}
          addCommentLoading={addCommentLoading}
        />

        {/* Comment Section */}
        {openCommentSection && (
          <div className="comment_section border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-black/40">
            <Comments suggestionId={id} />
          </div>
        )}
      </div>
      {/* Trending Suggestions */}
      <TrendingSuggestions />

      {/* Delete Modal */}
      <DeleteItemModal
        openDeleteItemModal={openDeleteItemModal}
        isLoading={deleteSuggestionLoading}
        disabled={deleteSuggestionLoading}
        okText="Delete"
        closeDeleteItemModal={() => setOpenDeleteItemModal(false)}
        handleDeleteItemOk={handleDeleteSuggestion}
        itemTitle={suggestion?.title}
        modalTitle="Delete Suggestion"
      />
    </div>
  );
};

export default Suggestion;
