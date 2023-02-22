import * as yup from "yup";

// export type FormData = {
//     location: string,
//     startDate: Date;
//     startTime: string;
//     endDate: Date;
//     endTime: string;
//     price: string;
// };
  
export const defaultValues = {
    // sortBy: null,
    // startDate: null,
    // endDate: null,
    // minPrice: null,
    // maxPrice: null,
    // minPeople: null,
    // maxPeople: null,
    // language: null,
    // province: null,
};
  
export const validationSchema = yup.object().shape({
    sortBy: yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
    minPrice: yup.number(),
    maxPrice: yup.number(),
    minPeople: yup.number(),
    maxPeople: yup.number(),
    language: yup.string(),
    province: yup.string(),
});