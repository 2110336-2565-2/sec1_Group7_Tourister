import React, { createContext, useState, useContext, useEffect } from 'react'
import Swal from 'sweetalert2';

import { getAllNotificationsFromUser } from '@/services/notificationService';
import { NotificationContextInterface } from '@/interfaces/NotificationInterface';

import { useAuth } from '../AuthProvider';
import { AuthContextInterface } from '@/interfaces/AuthContextInterface';

import { useQuery } from '@tanstack/react-query';

const NotificationContext = createContext<NotificationContextInterface>({
  newNotificationCount: 0,
  notificationData: [],
  refetchNotification: () => {},
  isLoadingNotification: true,
  isErrorNotification: false,
});

interface Props {
  children: React.ReactElement
}

export const NotificationProvider = ({ children }: Props) => {
  const authUserData: AuthContextInterface = useAuth();
  const userId:string = authUserData.user?._id!

  const { 
    data:notificationResponse, 
    refetch:refetchNotification, 
    isLoading:isLoadingNotification, 
    isError:isErrorNotification 
  } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      if(!userId) return null;
      return getAllNotificationsFromUser(userId);
    },
    refetchInterval: 10000
  })

  const notificationData = notificationResponse?.data;
  const newNotificationCount = notificationData?.filter(notification => !notification.isRead).length;

  return (
      <NotificationContext.Provider value={{ 
          newNotificationCount, 
          notificationData, 
          refetchNotification, 
          isLoadingNotification, 
          isErrorNotification
        }}>
          {children}
      </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)