import React from 'react';
import {IonHeader, IonToolbar, IonRow,IonCol, IonBackButton, IonButtons } from '@ionic/react'
import './SubPageHeaderComponent.css';


const SubPageHeaderComponent = (props:any) => {
  return (
    <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
                <IonBackButton defaultHref="/"/>
          </IonButtons>
        <IonRow>
          <IonCol size="10" className="header_title_col">
            <span className="header_title_text">{props.title}</span>
          </IonCol>
          <IonCol size="2">                    
          </IonCol>
        </IonRow>
        </IonToolbar>
      </IonHeader>
  );
};

export default SubPageHeaderComponent;