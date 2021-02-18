import React from 'react';
import {IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react'


const SubPageHeaderComponent = (props:any) => {
  return (
    <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard"/>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
  );
};

export default SubPageHeaderComponent;