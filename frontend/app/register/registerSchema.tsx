import * as yup from "yup";

export type FormData = {
  accountType: accountType;
  name: string;
  surname: string;
  citizenId: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  guideLicenseId?: string;
}

type accountType = "tourist" | "guide"

export const validationSchema = yup.object().shape({
  accountType: yup
    .string()
    .required("Please choose your account type"),
  name: yup.string().required("Please enter your name"),
  surname: yup.string().required("Please enter your surname"),
  citizenId: yup
    .string()
    .required("Please enter the citizen number")
    .matches(/^[0-9]+$/, "Citizen ID must be only digits")
    .test('len', 'Citizen ID must have 13 numbers', val => val?.length===13),
  phoneNumber: yup
    .string()
    .required("Please enter the phone number")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(9, 'Please enter the valid phone number')
    .max(10, 'Please enter the valid phone number'),
  email: yup
    .string()
    .required("Please enter email")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Please enter the valid email"),
  password: yup
    .string()
    .required("Please enter password")
    .min(8, 'Password must have atleast 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  guideLicenseId: yup.string()
});
