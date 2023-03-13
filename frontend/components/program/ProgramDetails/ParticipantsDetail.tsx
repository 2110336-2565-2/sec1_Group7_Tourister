import React, { FC } from "react";
import { BookingInterface } from "@/interfaces/BookingInterface";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

interface ParticipantsDetailProps {
  bookings: BookingInterface[];
}

const ParticipantsDetail: FC<ParticipantsDetailProps> = ({ bookings }) => {
    // console.log(bookings);
    if (bookings.length === 0) {
      return <div>There are no participants at the moment.</div>;
    }
  return (
    <List>
      {bookings.map((booking) => {
        const user = booking.user;
        return (
          <ListItem key={booking._id} style={{ borderBottom: "0.5px solid gray" }}>
            {typeof user !== "string" && (
              <>
                <ListItemAvatar>
                  <Avatar src={`${user.image}`} />
                </ListItemAvatar>
                <ListItemText 
                    primary={
                        <div>
                            {`${user.name} ${user.surname}`}

                        </div>
                        } 
                    secondary={
                        <div>
                            <div>{`Tel: ${user.phoneNumber}`}</div>
                            {booking.request && <div>{`Information: ${booking.request}`}</div>}
                        </div>
                        
                    } />
                
              </>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default ParticipantsDetail;
