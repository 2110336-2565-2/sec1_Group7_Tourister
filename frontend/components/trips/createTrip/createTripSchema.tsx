import * as yup from "yup";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";

export type FormData = {
  _id?:string
  name: string;
  description: string;
  price: number;
  province: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  max_participant: number;
  language: string[];
  meetLocation: string;
  meetProvince: string;
  descriptionOfMeetLocation: string;
  endLocation: string;
  endProvince: string;
  descriptionOfEndLocation: string;
  num_pending: number;
}

export const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your trip name"),
  description: yup.string().required("Please enter your trip description"),
  price: yup.number().required('Please enter your price'),
  province: yup.string().required("Please enter your trip province"),
  startDate: yup.date().required('Please enter your start date'),
  startTime: yup.string().required('Please enter your start time'),
  endDate: yup.date().required('Please enter your end date'),
  endTime: yup.string().required('Please enter your end time'),
  max_participant: yup.number().required('Please enter max participant(s)'),
  // price: yup.string().required('Please enter your price')
  // .matches(/^[0-9]+$/, "Price must be only digits"),
  // max_participant: yup.string().required('Please enter your group size')
  // .matches(/^[0-9]+$/, "Group size must be only digits"),
  // language: yup.string().required('Please enter your trip language'),
  language: yup.array().required('Please enter your language'),
  meetLocation: yup.string().required('Please enter your trip meeting point'),
  meetProvince: yup.string().required('Please enter your trip meeting point province'),
  descriptionOfMeetLocation: yup.string(),
  endLocation: yup.string().required('Please enter your trip drop off location'),
  endProvince: yup.string().required('Please enter your trip drop off province'),
  descriptionOfEndLocation: yup.string(),
});

export function formDatatoProgramInterface(data: FormData, user: UserInterface, filterDayTrips: {date: string; attractions: AttractionInterface[];}[]) {
  let programData : ProgramInterface = {
    _id: data._id,
    name: data.name,
    price: data.price,
    startDate: data.startDate,
    endDate: data.endDate,
    startTime: data.startTime,
    endTime: data.endTime,
    province: data.province,
    max_participant: data.max_participant,
    num_participant: 0,
    descriptionOfMeetLocation: data.descriptionOfMeetLocation,
    guide: user,
    dayTrips : filterDayTrips,
    language: data.language,
    descriptionOfEndLocation: data.descriptionOfEndLocation,
    num_pending: 0,
    published: true,
  }
  if(data.description){programData = {...programData,description: data.description}}
  if(data.meetLocation){programData = {...programData,meetLocation: data.meetLocation}}
  if(data.meetProvince){programData = {...programData,meetProvince: data.meetProvince}}
  if(data.endLocation){programData = {...programData,endLocation: data.endLocation}}
  if(data.endProvince){programData = {...programData,endProvince: data.endProvince}}
  return programData;
}