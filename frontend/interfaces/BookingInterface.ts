import { UserInterface } from "./UserInterface";
import { ProgramInterface } from "./ProgramInterface";

export type BookingStatusInterface = "pending" | "accepted" | "declined"
export interface BookingInterface {
  _id?: string;
  user: string | UserInterface; //objectId User
  program: string | ProgramInterface; //objectId Program
  request?: string;
  createdAt?: Date;
  status?: BookingStatusInterface;
}
