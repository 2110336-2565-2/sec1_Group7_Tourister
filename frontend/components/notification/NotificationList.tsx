import { useMutation, useQuery } from "@tanstack/react-query"

import { Avatar, Button, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"
import { getAllNotificationsFromUser,readAllNotificationsFromUser,readNotificationsById} from "@/services/notificationService"
import { NotificationInterface } from "@/interfaces/NotificationInterface";
import React, { useEffect } from "react"
import {ConfirmationNumber, Paid,InsertInvitation, SyncAlt } from '@mui/icons-material';
import { COLOR } from "@/theme/globalTheme";
import { useNotification } from "./NotificationProvider"
import { useRouter } from 'next/router';

export const NotificationList = () => {
  const authUserData:AuthContextInterface = useAuth()
  const userId:string = authUserData.user?._id!
  const router = useRouter();



  const { notificationData, refetchNotification, isLoadingNotification} = useNotification();

  const handleMarkAllNotificationsAsRead = async () => {
    await readAllNotificationsFromUser(userId);
    refetchNotification();
  }

  if(isLoadingNotification) return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <CircularProgress/>
    </div>
  )
  console.log("noti-data",notificationData)

  if((notificationData?.length)===0){
    return <>
    <br />
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"max-content"}}>
    <h3>Sorry, There aren't any notification</h3>
    </div>
    </>
  }

  const handleClickNoti = (pushPath: string, notiID: string) => {
    router.push(pushPath);
    readNotificationsById(notiID)
  };

  return (
    <>
    <Button onClick={handleMarkAllNotificationsAsRead}>Mark all as read</Button>

    <List sx={{ width: '100%' }}>
      {notificationData?.map((notiDetail,index) => {     
          let icon;
          let avatarStyle;
          let pushPath: string;


          //guide,tourist: withdraw and top up
          if (notiDetail.type === "coin") {
            icon = <SyncAlt />;
            avatarStyle = { backgroundColor: "#4CAF50" };
            pushPath = `/manage_account`

          //tourist: tourister pay for booking
          } else if (notiDetail.type === "payment") {
            icon = <Paid />;
            avatarStyle = { backgroundColor: "#4CAF50" };
            pushPath = `/booking`
          
          
          //guide: recieve money after end trip
          } else if (notiDetail.type === "paymentguide") {
            icon = <Paid />;
            avatarStyle = { backgroundColor: "#4CAF50" };
            pushPath = `/manage_account`

          //tourist: refund when cancel booking before guide accept
          } else if (notiDetail.type === "refund") {
            icon = <Paid />;
            avatarStyle = { backgroundColor: "#FFC107" };
            pushPath = `/manage_account`

          //guide,tourist: notify upcoming trip
          } else if (notiDetail.type === "nexttrip") {
            icon = <InsertInvitation />;
            avatarStyle = { backgroundColor: "#FFC107" };
            pushPath = `/trips/programDetail/${notiDetail.program}`

          //tourist: notify end trip
          } else if (notiDetail.type === "endtrip") {
            icon = <InsertInvitation />;
            avatarStyle = { backgroundColor: "#2196F3" };
            pushPath = `/trips/programDetail/${notiDetail.program}`

          
          //guide: cancel request
        } else if (notiDetail.type === "cancel") {
          icon = <ConfirmationNumber />;
          avatarStyle = { backgroundColor: "#F44336" };
          pushPath = `/request`


          //tourist: declined request
          } else if (notiDetail.type === "decrequest") {
            icon = <ConfirmationNumber />;
            avatarStyle = { backgroundColor: "#F44336" };
            pushPath = `/booking/history`

          
          //guide: new request 
          } else if (notiDetail.type === "newrequest") {
            icon = <ConfirmationNumber />;
            avatarStyle = { backgroundColor: "#2196F3" };
            pushPath = `/request`

          //tourist: accept request
          } else if (notiDetail.type === "accrequest") {
            icon = <ConfirmationNumber />;
            avatarStyle = { backgroundColor: "#2196F3" };
            pushPath = `/booking`

          } else {
            icon = <Avatar alt="" />;
            avatarStyle = {};
            pushPath = `/manage_account`
          }
          
          return(
              <>
              <ListItem 
              key={index}   
              onClick={() => handleClickNoti(pushPath,notiDetail._id)}
              alignItems="flex-start" 
              sx={{borderBottom: '1px solid #ddd', backgroundColor: notiDetail.isRead ? 'inherit' : '#E3FCF8'}}>
              <ListItemAvatar>
                <Avatar style={{ ...avatarStyle, color: "#fff" }} variant="circular">
                  {icon}
                </Avatar>
                </ListItemAvatar>
              <ListItemText
                  primary={notiDetail.title}
                  secondary={
                      notiDetail.message
                  }
              />
              </ListItem>
        </>
      );
    })
    }
  </List>
  </>
  );
    
    
    
}
