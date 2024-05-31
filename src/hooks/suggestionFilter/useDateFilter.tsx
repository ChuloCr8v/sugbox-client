// import { useGetFilesQuery } from "../api/file";
// import useGetFavDocs from "./useGetFavDocs";

// type Props = {
//   setFilteredData(filteredDocs: any): unknown;
//   setFilterActive(arg0: boolean): unknown;
//   setFilterInputs(arg0: (prev: any) => any): unknown;
//   viewDashboard: boolean;
// };

// const useDateFilter = (props: Props) => {
//   const { data: documents } = useGetFilesQuery("");
//   const { favDocuments } = useGetFavDocs();

//   const filterByDate = (timeRange: string) => {
//     props.setFilterActive(true);
//     props.setFilterInputs((prev) => ({ ...prev, date: timeRange }));

//     if (timeRange) {
//       const currentDate = new Date();
//       let startDate: string | number | Date;
//       let endDate: number | Date;

//       switch (timeRange) {
//         case "thisWeek":
//           startDate = new Date(currentDate);
//           startDate.setDate(currentDate.getDate() - currentDate.getDay());
//           endDate = new Date(currentDate);
//           endDate.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
//           console.log(startDate, endDate);
//           break;
//         case "lastWeek":
//           startDate = new Date(currentDate);
//           startDate.setDate(currentDate.getDate() - currentDate.getDay() - 7);
//           endDate = new Date(startDate);
//           endDate.setDate(startDate.getDate() + 6);
//           break;
//         case "thisMonth":
//           startDate = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             1
//           );
//           endDate = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth() + 1,
//             0
//           );
//           break;
//         case "lastMonth":
//           startDate = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth() - 1,
//             1
//           );
//           endDate = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             0
//           );
//           break;
//         case "thisQuarter":
//           startDate = new Date(
//             currentDate.getFullYear(),
//             Math.floor(currentDate.getMonth() / 3) * 3,
//             1
//           );
//           endDate = new Date(
//             startDate.getFullYear(),
//             startDate.getMonth() + 3,
//             0
//           );
//           break;
//         case "lastQuarter":
//           startDate = new Date(
//             currentDate.getFullYear(),
//             Math.floor(currentDate.getMonth() / 3) * 3 - 3,
//             1
//           );
//           endDate = new Date(
//             startDate.getFullYear(),
//             startDate.getMonth() + 3,
//             0
//           );
//           break;
//         case "thisYear":
//           startDate = new Date(currentDate.getFullYear(), 0, 1);
//           endDate = new Date(currentDate.getFullYear(), 11, 31);
//           break;
//         case "lastYear":
//           startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
//           endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
//           break;
//         default:
//           startDate = new Date(0);
//           endDate = new Date(currentDate);
//       }

//       const documentsToFilter = props.viewDashboard ? documents : favDocuments;
//       const filteredDocs = documentsToFilter?.filter((d: any) => {
//         const requestDate = new Date(d.createdAt);
//         return requestDate >= startDate && requestDate <= endDate;
//       });

//       props.setFilteredData(filteredDocs);
//     }
//   };

//   return { filterByDate };
// };

// export default useDateFilter;
