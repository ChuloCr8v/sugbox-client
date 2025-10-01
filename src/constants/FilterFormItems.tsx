// constants/FilterFormItems.ts
import { employeeStatusOptions, roleOptions } from "../helpers";
import { FilterPage } from "../component/common/FilterComponent";

export const useFilterConfigs = (depts?: any[], levels?: any[]) => {
  return {
    [FilterPage.EMPLOYEES]: [
      {
        label: "Department",
        type: "select",
        options: depts?.map((d) => ({ label: d.name, value: d.id })) ?? [],
        name: "departments",
        mode: "multiple" as const,
      },
      {
        label: "Role",
        type: "select",
        options: roleOptions ?? [],
        name: "userRole",
        mode: "multiple" as const,
      },
      {
        label: "Job Type",
        type: "select",
        options: [
          { label: "Full Time", value: "FULL_TIME" },
          { label: "Contract", value: "CONTRACT" },
        ],
        name: "jobType",
      },
      {
        label: "Level",
        type: "select",
        options: levels?.map((d) => ({ label: d.name, value: d.id })) ?? [],
        name: "level",
      },
      {
        label: "Status",
        type: "select",
        options: employeeStatusOptions,
        name: "status",
      },
    ],
    [FilterPage.DEPARTMENTS]: [
      {
        label: "Department",
        type: "select",
        options: depts?.map((d) => ({ label: d.name, value: d.id })) ?? [],
        name: "departments",
        mode: "multiple" as const,
      },
      {
        label: "Role",
        type: "select",
        options: roleOptions ?? [],
        name: "userRole",
        mode: "multiple" as const,
      },
      {
        label: "Job Type",
        type: "select",
        options: [
          { label: "Full Time", value: "FULL_TIME" },
          { label: "Contract", value: "CONTRACT" },
        ],
        name: "jobType",
      },
      {
        label: "Level",
        type: "select",
        options: levels?.map((d) => ({ label: d.name, value: d.id })) ?? [],
        name: "level",
      },
      {
        label: "Status",
        type: "select",
        options: employeeStatusOptions,
        name: "status",
      },
    ],
  };
};
