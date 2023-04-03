import { useQuery } from "@tanstack/react-query"

import { Avatar, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"
import { getAllNotificationsFromUser} from "@/services/notificationService"
import { NotificationInterface } from "@/interfaces/NotificationInterface";
import React from "react"
import {ConfirmationNumber, Paid,InsertInvitation} from '@mui/icons-material';
import { COLOR } from "@/theme/globalTheme";

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
      <List sx={{ width: '100%' }}>
      {noti?.map((notiDetail) => {     
          let icon;
          let avatarStyle;
          if (notiDetail.type === "coin") {
            icon = <Paid />;
            avatarStyle = { backgroundColor: "#4CAF50" };
          } else if (notiDetail.type === "decrequest") {
            icon = <ConfirmationNumber />;
            avatarStyle = { backgroundColor: "#F44336" };
          } else if (notiDetail.type === "nexttrip") {
            icon = <InsertInvitation />;
            avatarStyle = { backgroundColor: "#FFC107" };
          } else if (notiDetail.type === "newrequest" || notiDetail.type === "accrequest") {
            icon = <ConfirmationNumber />;
            avatarStyle = { backgroundColor: "#2196F3" };
          } else if (notiDetail.type === "endtrip") {
            icon = <InsertInvitation />;
            avatarStyle = { backgroundColor: "#9C27B0" };
          } else {
            icon = <Avatar alt="Remy Sharp" />;
            avatarStyle = {};
          }
          
          return(
              <>
              <ListItem key={notiDetail._id} alignItems="flex-start" sx={{borderBottom: '1px solid #ddd', backgroundColor: notiDetail.isRead ? 'inherit' : '#E3FCF8'}}>
              <ListItemAvatar>
                <Avatar style={{ ...avatarStyle, color: "#fff" }} variant="circular">
                  {icon}
                </Avatar>
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
        </>
      );
    })}
  </List>

      </>
    );
    
    
    
  }
