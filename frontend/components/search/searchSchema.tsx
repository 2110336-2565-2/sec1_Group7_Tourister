import * as yup from "yup";
import { ProgramFilterInterface, sortByType } from "@/interfaces/filter/ProgramFilterInterface";
// export type FormData = {
//     location: string,
//     startDate: Date;
//     startTime: string;
//     endDate: Date;
//     endTime: string;
//     price: string;
// };

export type FormData = {
    province?: string | null,
    sortBy: sortByType,
    startDate?: Date | null,
    endDate?: Date | null,
    minPrice?: number | null,
    maxPrice?: number | null,
    // minPeople: null,
    // maxPeople: null,
    language?: string | null,
    participant?: string | null,
};
  
export const defaultValues = {
    province: "",
    sortBy: "date" as sortByType,
    startDate: null,
    endDate: null,
    minPrice: 1,
    maxPrice: 999999,
    // minPeople: null,
    // maxPeople: null,
    language: "",
    participant: "",
};
  
export const validationSchema = yup.object().shape({
    sortBy: yup.string().nullable(),
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable(),
    minPrice: yup.number().nullable(),
    maxPrice: yup.number().nullable(),
    // minPeople: yup.number().nullable(),
    // maxPeople: yup.number().nullable(),
    language: yup.string().nullable(),
    province: yup.string().nullable(),
    participant: yup.string().nullable(),
});

export function formDataToProgramFilter(data: FormData) {
    const programFilter:ProgramFilterInterface = {
        ...data,
        participant: null,
        language: null,
        province: null,
    } as ProgramFilterInterface

    if(data.province !== "") {
        programFilter["province"] = data.province;
    }
    if(data.language !== "") {
        programFilter["language"] = data.language;
    }
    if(data.participant) {
        switch(data.participant){
            case "1-5":
                programFilter["minPeople"] = 1;
                programFilter["maxPeople"] = 5;
                break;
            case "6-15":
                programFilter["minPeople"] = 6;
                programFilter["maxPeople"] = 15;
                break;
            case "16-40":
                programFilter["minPeople"] = 16;
                programFilter["maxPeople"] = 40;
                break;
            case "41+":
                programFilter["minPeople"] = 41;
                break;
        }
    }
    return programFilter;
}