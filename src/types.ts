import { AnyAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";
import { ChangeEventHandler, Dispatch, ReactNode } from "react";

export interface labelProps {
  labelClassName?: string;
  isRequired?: boolean;
  title: string;
}
export interface inputProps {
  inputClassName?: string;
  defaultValue?: string | undefined;
  required?: boolean;
  type?: any;
  onchange: any;
  placeholder?: string;
  name: string;
  value?: string;
  inputError?: string;
}
export interface selectProps {
  options: DefaultOptionType[] | undefined;
  className?: string | undefined;
  defaultValue?: string | undefined;
  required?: boolean;
  type?: string | undefined;
  onchange: any;
  placeholder?: string;
  name: string;
  value?: string;
}

export interface formGroupProps {
  options?: DefaultOptionType[] | undefined;
  defaultValue?: string | undefined;
  selectOnchange?: (arg: string) => void;
  labelClassName?: string;
  className?: string;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  inputType?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  value?: string;
  inputClassName?: string;
  inputError?: string;
}

export interface ModalComponentProps {
  onOk?: () => void;
  onCancel: () => void;
  children: ReactNode;
  footer?: ReactNode;
  open: boolean;
  className?: string;
  title?: ReactNode;
  footerActionBtnText?: string;
}

export interface employeeType {
  adminRole: string;
  approvedSuggestions: Array<{}>;
  comments: Array<String>;
  companyId: String;
  createdAt: String;
  defaultAnonymousSuggestion: boolean;
  department: string;
  downVotes: Array<String>;
  email: string;
  firstName: String;
  isDisabled: boolean;
  isModerator: boolean;
  lastName: string;
  officeRole: string;
  suggestions: Array<suggestionProps>;
  upvotes: Array<String>;
  _id: String;
}

export interface employeeSignupProps {
  id: string;
  signUpData: { firstName: string };
  dispatch: Dispatch<AnyAction>;
  token: string;
  employees: [];
}

export interface suggestionProps {
  createdAt: string;
  _id: number;
  user: {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  };
  isAnonymous: boolean;
  suggester: string;
  status: string;
  title: string;
  suggestion: string;
  upVotes: Array<object>;
  downVotes: Array<object>;
  comments: Array<object>;
  userId: string;
}

export interface singleEmployeeStateProps {
  employees: {
    singleEmployee: {
      lastName: string;
      firstName: string;
    };
  };
}

export interface commentsProps {
  isAdmin: any;
  suggestionId: string;
  _id: string;
  comment: string;
  userId: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  };
  createdAt: string;
}

export interface companyProps {
  companyName: string;
  companyEmail: string;
  password: string;
  isVerified: boolean;
  img?: string;
  employees: Array<object>;
  suggestions: Array<suggestionProps>;
  isAdmin: boolean;
  approvedSuggestions: Array<string>;
  rejectedSuggestions: Array<string>;
}
