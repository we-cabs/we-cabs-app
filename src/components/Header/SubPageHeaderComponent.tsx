import React from 'react';
import {IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react'


const SubPageHeaderComponent: React.FC = () => {
  return (
    <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
  );
};

export default SubPageHeaderComponent;