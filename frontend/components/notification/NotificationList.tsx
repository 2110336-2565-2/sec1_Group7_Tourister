import { useQuery } from "@tanstack/react-query"

import { Avatar, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"
import { getAllNotificationsFromUser} from "@/services/notificationService"
import { NotificationInterface } from "@/interfaces/NotificationInterface";
import React from "react"
import {ConfirmationNumberOutlined, Paid,InsertInvitation} from '@mui/icons-material';


export const NotificationList = () => {
    const authUserData:AuthContextInterface = useAuth()
    const userId:string = authUserData.user?._id!
  
    const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
      queryKey: ['notificationPrograms', userId],
      queryFn: ()=>{
        if(!userId)return null;
        return getAllNotificationsFromUser(userId)
      }
    })
    
    if(isLoading) return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <CircularProgress/>
      </div>
    )
  
    const noti = programResponse?.data;
    console.log(noti);
  
  
    const today = new Date();
    // const showingNotication = noti?.filter(({program})=>{
    //   if(history) return new Date(program?.endDate!).getTime() < today.getTime();
    //   return new Date(program?.endDate!).getTime() >= today.getTime();
    // })
  
    if((noti?.length)===0){
      return <>
      <br />
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"max-content"}}>
      <h3>Sorry, There aren't any notification</h3>
      </div>
      </>
    }
  
    return (
        <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

        {noti?.map((notiDetail) => {     
            let icon;
            if (notiDetail.type === "coin") {
              icon = <Paid />;
            } else if (notiDetail.type === "newrequest") {
              icon = <ConfirmationNumberOutlined />;
            } else if (notiDetail.type === "upcoming trip") {
              icon = <InsertInvitation />;
            } else {
              icon = <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />;
            }       
            return(
                <>
                <ListItem alignItems="flex-start"  key={notiDetail._id}>
                <ListItemAvatar>
                {icon}

                    </ListItemAvatar>
                <ListItemText
                    primary={notiDetail.title}
                    secondary={
                        notiDetail.message
                        // <React.Fragment>
                        // <Typography
                        //     sx={{ display: 'inline' }}
                        //     component="span"
                        //     variant="body2"
                        //     color="text.primary"
                        // >
                        //     Ali Connors
                        // </Typography>
                        // {" — I'll be in your neighborhood doing errands this…"}
                        // </React.Fragment>
                    }
                />
                </ListItem>
                <Divider variant="inset" component="li" />

          </>
        );
      })}
    </List>

      </>
    );
    
    {/*       
      {upcomingBookings?.map(({program, status})=>{
        return program && <ProgramCardForTourist key={program._id} program={program} bookingStatus={status}/>
      })} */}
    
  }