import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div className="my-8 flex md:grid grid-cols-2 xl:grid-cols-3 flex-col gap-3 items-center justify-center w-full">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="w-full rounded-xl border border-gray-700 bg-black/40 backdrop-blur-sm 
                     p-4"
        >
          <Skeleton
            active
            round
            title={{ width: "70%" }}
            paragraph={{ rows: 3, width: ["100%", "90%", "60%"] }}
          />
        </div>
      ))}
    </div>
  );
};

export default Loading;
