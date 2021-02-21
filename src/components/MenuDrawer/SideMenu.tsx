import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton } from '@ionic/react';

export const SideMenu: React.FC = () => (

  <IonMenu side="start" contentId="main-content" type="overlay">
  <IonHeader>
     <IonToolbar>
        <IonMenuButton slot="end" color="primary" />
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonList>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
 </IonMenu>
);