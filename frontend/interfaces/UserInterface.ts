import { ProgramInterface } from "./ProgramInterface";

export interface UserInterface {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  isGuide?: boolean;
  remainingAmount?: number;
  licenseId?: string;
  image?: string;
  draft?: {[key:string]:ProgramInterface};
}
