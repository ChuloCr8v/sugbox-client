import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div className="my-8 flex md:grid grid-cols-2 xl:grid-cols-3 flex-col gap-4 items-center justify-center w-full opacity-50">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
        <Skeleton
          key={index}
          active
          round
          title
          paragraph
          className="bg-white w-full p-4 shadow rounded"
        />
      ))}
    </div>
  );
};

export default Loading;
