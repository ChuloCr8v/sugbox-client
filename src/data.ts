export const signupFormValues = [
  {
    label: "Email",
    type: "email",
    placeholder: "Oragnization email address",
    name: "companyEmail",
    required: true,
  },
  {
    name: "companyName",
    label: "Organization Name",
    type: "text",
    placeholder: "Oragnization name",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Choose a password",
    name: "password",
    required: true,
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm password",
    name: "confirmPassword",
    required: true,
  },
];

export const loginFormValues = [
  {
    label: "Email",
    type: "email",
    placeholder: "Enter organization email address",
    name: "email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter organization password",
    name: "password",
    required: true,
  },
];

export const newEmployeeFormItems = [
  {
    label: "First Name",
    placeholder: "Employee first name",
    required: true,
    type: "text",
    name: "firstName",
  },
  {
    label: "Last Name",
    placeholder: "Employee last name",
    required: true,
    type: "text",
    name: "lastName",
  },
  {
    label: "Email",
    placeholder: "Employee email",
    required: true,
    type: "email",
    name: "email",
  },
  {
    label: "Role",
    placeholder: "Select role",
    required: false,
    type: "select",
    name: "role",
    options: [
      { value: "staff", label: "Staff" },
      { value: "moderator", label: "Moderator" },
    ],
  },
  {
    label: "Password",
    placeholder: "Employee password",
    required: true,
    type: "password",
    name: "password",
  },
  {
    label: "Repeat Password",
    placeholder: "Repeat password",
    required: true,
    type: "password",
    name: "repeatPassword",
  },
];
