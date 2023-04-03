import * as yup from "yup";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

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
};
export const defaultValues = {
  bankAccount: "kbank" as accountType,
  accountNumber: "",
};

export const validationSchema = yup.object().shape({
//   bankAccount: yup.string().required("Please choose your bank account type"),
  accountNumber: yup
    .string()
    .required("Please enter bank account number")
    .matches(/^[0-9]+$/, "Bank account number must be only digits")
    .test(
      "len",
      "Bank account number must have 13 numbers",
      (val) => val?.length === 10
    ),
});
