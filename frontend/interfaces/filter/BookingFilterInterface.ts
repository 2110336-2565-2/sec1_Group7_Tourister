import { BookingStatusInterface } from "../BookingInterface";

export interface BookingFilterInterface {
    status?: BookingFilterInterface | BookingFilterInterface[],
}