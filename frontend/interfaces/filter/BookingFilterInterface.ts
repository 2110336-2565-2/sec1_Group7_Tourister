import { BookingStatusInterface } from "../BookingInterface";

export interface BookingFilterInterface {
    status?: BookingStatusInterface | BookingStatusInterface[],
}