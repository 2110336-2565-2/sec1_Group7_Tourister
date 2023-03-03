import { UserInterface } from "./UserInterface";

export interface AuthContextInterface {
  isAuthenticated?: boolean,
  user?: UserInterface,
  loading?: boolean
}