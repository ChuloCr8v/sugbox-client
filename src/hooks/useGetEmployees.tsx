import { useGetEmployeesQuery } from "../redux/data/employees";
import useGetAuth from "./useGetAuth";

const useGetEmployees = () => {
  const { id } = useGetAuth();

  const { data, isLoading, refetch, isFetching, isError } =
    useGetEmployeesQuery("");
  const employees = data?.filter(
    (e: { companyId: string }) => e.companyId === id
  );

  const disabledEmployees = employees?.filter(
    (employee: { isDisabled: boolean }) => employee?.isDisabled === true
  );
  const activeEmployeesData = employees?.filter(
    (employee: { isDisabled: boolean }) => employee?.isDisabled === false
  );
  const activeEmployees = employees?.length - disabledEmployees?.length;

  return {
    isFetching,
    isLoading,
    refetch,
    employees,
    activeEmployees,
    disabledEmployees,
    activeEmployeesData,
    isError,
  };
};

export default useGetEmployees;
