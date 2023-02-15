import { UserInterface } from "@/interfaces/UserInterface";

export interface UserCardInterface {
  _id?: string;
  programId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  max_participant: number;
  num_participant?: number;
  meetLocation?: string;
  descriptionOfMeetLocation?: string;
  // guide: string | UserInterface[], //objectId User
  attractions?: AttractionInterface[];
  imageUrl?: string;
  language?: string;
  endLocation?: string;
  descriptionOfEndLocation?: string;
  pending_participant?: string[] | UserInterface[]; //objectId User
  accepted_participant?: string[] | UserInterface[]; //objectId User
  declined_participant?: string[] | UserInterface[]; //objectId User
  published?: boolean;
  user: UserInterface[];
}