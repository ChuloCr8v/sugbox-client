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

    updateEmployeeRole: mutation({
      query: (id) => ({
        url: `/employee/update-role/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["employees", "employee"],
    }),

    sendEmailToEmployee: mutation({
      query: (body) => ({
        url: `/employee/send-email`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["employees", "employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useEditEmployeeMutation,
  useUpdateEmployeeRoleMutation,
  useSendEmailToEmployeeMutation,
} = EmployeesApi;
