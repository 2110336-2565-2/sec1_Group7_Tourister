import { UserInterface } from "./UserInterface";

export interface NotificationInterface {
  _id: string;
  type: string;
  title: string;
  message?: string;
  user?: UserInterface, //objectId User
  notifyTime? : Date;
  isRead?: boolean;
}