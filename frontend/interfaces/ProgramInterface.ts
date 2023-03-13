import { UserInterface } from "./UserInterface";
import { AttractionInterface } from "./AttractionInterface";

export interface ProgramInterface {
  _id: string;
  name: string;
  description?: string;
  price: number;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  province: string;
  max_participant: number;
  num_participant?: number;
  meetLocation?: string;
  meetProvince?: string;
  descriptionOfMeetLocation?: string;
  guide?: UserInterface, //objectId User
  // attractions?: AttractionInterface[];
  dayTrips? : {date:string,attractions: AttractionInterface[]}[]
  image?: string;
  language?: string[];
  endLocation?: string;
  endProvince?: string;
  descriptionOfEndLocation?: string;
  // pending_participant?: string[] | UserInterface[]; //objectId User
  // accepted_participant?: string[] | UserInterface[]; //objectId User
  // declined_participant?: string[] | UserInterface[]; //objectId User
  published?: boolean;
  status?: String;
  num_pending?: number;
}