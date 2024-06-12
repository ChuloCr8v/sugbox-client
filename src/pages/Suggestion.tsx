import { Button, Spin, Tooltip, message } from "antd";
import { useState } from "react";
import {
  FaDownload,
  FaRegCalendarAlt,
  FaRegCommentAlt,
  FaRegImage,
  FaRegUser,
  FaUserNinja,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CommentBox from "../components/CommentBox";
import Comments from "../components/Comments";
import ErrorComponent from "../components/ErrorComponent";
import SuggestionActionButtons from "../components/SuggestionActionButtons";
import SuggestionStatusTag from "../components/SuggestionStatusTag";
import TrendingSuggestionCard from "../components/TrendingSuggestionCard";
import VoteComponent from "../components/VoteComponent";
import AttachmentPreview from "../components/modals/AttachmentPreview";
import DeleteItemModal from "../components/modals/DeleteItemModal";
import useDownvoteSuggestion from "../hooks/suggestion/useDownVoteSuggestion";
import useUpvoteSuggestion from "../hooks/suggestion/useUpvoteSuggestion";
import UseGetAuth from "../hooks/useGetAuth";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { useAddCommentMutation } from "../redux/data/Comments";
import { useGetEmployeeQuery } from "../redux/data/employees";
import {
  useDeleteSuggestionMutation,
  useGetSuggestionQuery,
} from "../redux/data/suggestions";
import { hideNewCommentModal } from "../redux/modals";
import { suggestionProps } from "../types";
import { dateFormatter } from "../utils.ts/dateFormatter";

const Suggestion = () => {
  const { id: userId } = UseGetAuth();
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
  const { suggestions, isLoading: loadingAllSuggestions } = useGetSuggestions();
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

  const [previewAttachment, setPreviewAttachment] = useState({
    isOpen: false,
    src: "",
  });

  const upvotedAlready = suggestion?.upVotes?.includes(userId);
  const downvotedAlready = suggestion?.downVotes?.includes(userId);

  const { isAdmin } = UseGetAuth();

  const verifyAdmin = isAdmin ? true : false;

  const handleDeleteSuggestion = async () => {
    try {
      await deleteSuggestion(id).unwrap();
      message.success("Suggestion deleted successfully");
      setOpenDeleteItemModal(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      message.error("Unable to delete suggestion, please try again.");
    }
  };

  const disableVoteFunction = () => {
    return suggestion?.userId === userId || upvotedAlready;
  };

  const disableDownVoteFunction = () => {
    return suggestion?.userId === userId || downvotedAlready;
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center gap-2 text-primaryblue font-semibold">
        <Spin /> Loading...
      </div>
    );
  }

  const addCommentFunction = async () => {
    try {
      await addComment({
        comment: commentText,
        id: suggestion._id,
        isAdmin: verifyAdmin,
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

  return (
    <div className="py-24 px-4 w-full  grid gap-4">
      <div className="flex justify-between items-start">
        <div className="grid gap-2 title-box">
          <div className="flex items-center gap-2">
            <h1 className="text-xl capitalize font-semibold text-primaryblue leading-none">
              {suggestion?.title}
            </h1>
            <SuggestionStatusTag status={suggestion?.status} />
          </div>
          <div className="flex items-center gap-4 text-sm">
            {loadingSuggester ? (
              <Spin />
            ) : suggestion?.isAnonymous ? (
              <div className="flex items-center gap-2 text-gray-500 font-semibold">
                <FaUserNinja />
                Anonymous
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 ">
                <FaRegUser />
                <p className="">
                  {suggester?.firstName + " " + suggester?.lastName}
                </p>
              </div>
            )}

            <div className="text-gray-500  flex items-center gap-2">
              <FaRegCalendarAlt />
              {dateFormatter(suggestion?.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="suggestion-body border rounded-md p-4">
        <p className="pb-5">{suggestion?.suggestion}</p>

        <div className="flex items-center gap-2 mt-4">
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
            {" "}
            <Button
              icon={<FaRegCommentAlt className="text-sm mt-0.5" />}
              onClick={() => setOpenCommentSection(!openCommentSection)}
              className="flex items-center border-gray-200 rounded h-8 w-fit hover:text-hoverblue group"
            >
              {suggestion?.comments?.length > 0
                ? suggestion?.comments?.length
                : "0"}{" "}
              Comment
              {suggestion?.comments.length > 1 && "s"}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="grid gap-4">
        <SuggestionActionButtons
          id={suggestion?._id}
          setOpenDeleteItemModal={setOpenDeleteItemModal}
        />

        {suggestion?.attachments?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {suggestion?.attachments?.map(
              (attachment: { secure_url: string }) => (
                <div
                  className="border h-[150px] w-full md:w-[250px] overflow-hidden rounded relative bg-white group"
                  key={attachment.secure_url}
                >
                  <img
                    src={attachment.secure_url}
                    className="object-cover h-full w-full object-center"
                  />
                  <div
                    className={twMerge(
                      "flex gap-4 items-center justify-center absolute group top-0 left-0 h-full w-full bg-black bg-opacity-0 hover:bg-opacity-35 duration-200 opacity-0 group-hover:opacity-100 -z-10 group-hover:z-10"
                    )}
                  >
                    <button className="text-white flex items-center justify-center gap-2 text-sm hover:text-primaryblue  duration-200">
                      <FaDownload />
                      Download
                    </button>
                    <button
                      onClick={() => {
                        setPreviewAttachment({
                          isOpen: true,
                          src: attachment.secure_url,
                        });
                      }}
                      className="text-white flex items-center justify-center gap-2 text-sm hover:text-primaryblue duration-200"
                    >
                      <FaRegImage />
                      Preview
                    </button>
                  </div>
                </div>
              )
            )}
            {/* </div> */}
          </div>
        )}
      </div>

      <CommentBox
        handleBtnClick={addCommentFunction}
        placeholder={"Start typing..."}
        comment={commentText}
        onchange={(e) => {
          setCommentText(e.target.value);
        }}
        setComment={setCommentText}
        addCommentLoading={addCommentLoading}
      />

      {openCommentSection && (
        <div
          className={twMerge(
            "comment_section border rounded-md overflow-hidden"
          )}
        >
          <div className="">
            <Comments suggestionId={id} />
          </div>
        </div>
      )}

      {loadingAllSuggestions ? (
        <Spin />
      ) : (
        <div className="overflow-hidden">
          <p className="font-semibold text-lg ">Trending Suggestions</p>
          <div className="flex gap-4 mt-2 overflow-x-scroll py-2">
            {[...suggestions]
              ?.sort(
                (
                  a: { upVotes: Array<object> },
                  b: { upVotes: Array<object> }
                ) => b.upVotes.length - a.upVotes.length
              )
              .map((suggestion: suggestionProps) => (
                <a
                  href={`/suggestion/${suggestion._id}`}
                  className="rounded border shadow p-4 min-w-[350px]"
                  key={suggestion._id}
                >
                  <TrendingSuggestionCard suggestion={suggestion} />
                </a>
              ))
              .slice(0, 5)}
          </div>
        </div>
      )}

      <DeleteItemModal
        openDeleteItemModal={openDeleteItemModal}
        isLoading={deleteSuggestionLoading}
        disabled={deleteSuggestionLoading}
        okText={"Delete"}
        closeDeleteItemModal={() => setOpenDeleteItemModal(false)}
        handleDeleteItemOk={handleDeleteSuggestion}
        itemTitle={suggestion?.title}
        modalTitle={"Delete Suggestion"}
      />

      <AttachmentPreview
        previewAttachment={previewAttachment.isOpen}
        src={previewAttachment.src}
        suggestionTitle={suggestion?.title}
        setPreviewAttachment={setPreviewAttachment}
      />
    </div>
  );
};

export default Suggestion;
