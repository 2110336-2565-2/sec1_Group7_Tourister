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
  amount: number;
};
export const defaultValues = {
  bankAccount: "kbank" as accountType,
  accountNumber: "",
  amount: 0,
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
  //   amount: yup
  //     .number()
  //     .typeError("amount must be a number")
  //     .nullable(true)
  //     .required("Please enter amount (THB)")
  //     .moreThan(-1, "Amount(THB) must be greater than ฿100")
  //     .lessThan(7, "Amount(THB) must be less than or equal to ฿1000000"),
  amount: yup
    .string()
    .nullable(false)
    .required("Please enter a number")
    .matches(/^\d+$/, "Please enter a valid number")
    .test("is-in-range", "Number is not in range", (value) => {
      // Define the range of valid values
      const min = 100;
      const max = 10000000;

      // Convert the string to a number and check if it's within the range
      return yup.number().min(min).max(max).isValidSync(Number(value));
    }),
});
