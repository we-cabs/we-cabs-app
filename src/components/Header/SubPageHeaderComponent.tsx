import React from 'react';
import {IonHeader, IonToolbar, IonRow,IonCol, IonBackButton, IonButtons } from '@ionic/react'
import './SubPageHeaderComponent.css';


const SubPageHeaderComponent = (props:any) => {
  return (
    <IonHeader className="user_header_class fixed_header_class">
       <IonToolbar className="user_header_toolbar">
          <IonButtons className="back_button_group" slot="start">
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