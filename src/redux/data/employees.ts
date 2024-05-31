import { api } from "../api/base";

const EmployeesApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    // addemployee: mutation<void, employee>({
    //   query: ({ id, employee }) => ({
    //     url: `employee/new-employee/${id}`,
    //     method: "POST",
    //     body: employee,
    //   }),
    //   invalidatesTags: ["employees", "employee"],
    // }),
    getEmployees: query({
      query: () => `employee/all`,
      providesTags: ["employees", "employee"],
    }),

    getEmployee: query({
      query: (id) => `employee/${id}`,
      providesTags: ["employees", "employee"],
    }),

    editEmployee: mutation({
      query: ({ _id, ...employee }) => ({
        url: `/employee/edit-employee/${_id}`,
        method: "PUT",
        body: employee,
      }),
      invalidatesTags: ["employees", "employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useEditEmployeeMutation,
} = EmployeesApi;
