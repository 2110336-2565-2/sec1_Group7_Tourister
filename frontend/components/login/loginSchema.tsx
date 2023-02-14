import * as yup from "yup";

type accountType = "tourist" | "guide";

export type FormData = {
  accountType: accountType;
  email: string;
  password: string;
};

export const defaultValues = {
  accountType: "tourist" as accountType,
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  accountType: yup.string().required("Please choose your account type"),
  email: yup.string().required("Please enter email"),
  password: yup.string().required("Please enter password"),
});
