import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton } from '@ionic/react';
import { eventBus } from '../../hooks/EventBus';

export const SideMenu: React.FC = () => {
  const logoutThisSession =(e:any)=>{
    e.preventDefault();
    eventBus.dispatch("open-logout-popup", { message: "" });
  }
  return (
    <>     
      <IonMenu side="start" contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar>
            <IonMenuButton slot="end" color="primary" />
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
              <IonItem>History</IonItem>
              <IonItem>Booking</IonItem>
              <IonItem>Bidding</IonItem>
              <IonItem>Notification</IonItem>
              <IonItem onClick={(e)=>logoutThisSession(e)}>Logout</IonItem>
            </IonList>
          </IonContent>
    </IonMenu>
    </>
  )
  }