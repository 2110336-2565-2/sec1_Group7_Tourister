import { UserInterface } from "./UserInterface";
import { ProgramInterface } from "./ProgramInterface";

export type BookingStatusInterface = "pending" | "accepted" | "declined"
export interface BookingInterface {
  _id?: string;
  user?: UserInterface; //objectId User
  program?: ProgramInterface; //objectId Program
  request?: string;
  createdAt?: Date;
  status?: BookingStatusInterface;
}
