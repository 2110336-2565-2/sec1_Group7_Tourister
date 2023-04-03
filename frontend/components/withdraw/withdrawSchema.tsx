import * as yup from "yup";

type accountType =
  | "scb"
  | "TTB"
  | "kbank"
  | "bbl"
  | "krungsri"
  | "tmb"
  | "cimb"
  | "uob"
  | "icbc"
  | "bay"
  | "hsbc"
  | "deutsche"
  | "citibank"
  | "standardchartered"
  | "thanachart"
  | "mbanking"
  | "gsb"
  | "tbank"
  | "baac"
  | "gls"
  | "kkp"
  | "tcrb"
  | "ktb"
  | "lhb"
  | "tisco"
  | "citi";

export type FormData = {
  bankAccount: accountType;
  accountNumber: string;
  amount:number
};
export const defaultValues = {
  bankAccount: "kbank" as accountType,
  accountNumber: "",
  amount:0
};

export const validationSchema = yup.object().shape({
  bankAccount: yup.string().required("Please choose your bank account type"),
  accountNumber: yup
    .string()
    .required("Please enter bank account number")
    .matches(/^[0-9]+$/, "Bank account number must be only digits")
    .test(
      "len",
      "Bank account number must have 10 numbers",
      (val) => val?.length === 10
    ),
  amount: yup
    .string()
    .required("Please enter amount (THB)")
    .matches(/^[0-9]+$/, "Bank account number must be only digits")
    .test(
      "len",
      "Bank account number must have 7 numbers",
      (val) => val?.length === 7
    ),
});
