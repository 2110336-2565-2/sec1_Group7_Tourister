import { UserInterface } from "./UserInterface";
import { ApiResponseInterface } from "./ApiResponsetInterface";
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from "@tanstack/react-query";
import { ProgramInterface } from "./ProgramInterface";

export interface NotificationInterface {
  _id: string;
  type: string;
  title: string;
  message?: string;
  user?: UserInterface, //objectId User
  notifyTime? : Date;
  isRead?: boolean;
  program?: ProgramInterface; //objectId Program
}

export interface NotificationContextInterface {
  newNotificationCount?: number;
  notificationData?: NotificationInterface[];
  refetchNotification: any;
  isLoadingNotification?: boolean;
  isErrorNotification?: boolean;
}