import * as yup from "yup";
import { sortByType } from "@/interfaces/filter/ProgramFilterInterface";
// export type FormData = {
//     location: string,
//     startDate: Date;
//     startTime: string;
//     endDate: Date;
//     endTime: string;
//     price: string;
// };
  
export const defaultValues = {
    province: "",
    sortBy: "date" as sortByType,
    startDate: null,
    endDate: null,
    minPrice: 1,
    maxPrice: 999999,
    minPeople: null,
    maxPeople: null,
    language: null,
    participant: null,
};
  
export const validationSchema = yup.object().shape({
    sortBy: yup.string().nullable(),
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable(),
    minPrice: yup.number().nullable(),
    maxPrice: yup.number().nullable(),
    minPeople: yup.number().nullable(),
    maxPeople: yup.number().nullable(),
    language: yup.string().nullable(),
    province: yup.string().nullable(),
    participant: yup.string().nullable(),
});