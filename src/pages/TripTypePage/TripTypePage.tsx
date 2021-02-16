import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './TripTypePage.css';

const TripTypePage: React.FC<RouteComponentProps> = ({history}) => {
  const openTripBookingPage = (e:any,type:string) =>{
    e.preventDefault();
    history.push(`/dashboard/tripbooking/${type}`);
  }
  return (
    <IonPage>
      <HeaderComponent/>
      <div className="container">
        <IonRow>
            <IonCol>
              <IonButton onClick={(e) => openTripBookingPage(e,'oneway')} className="trip_type_button">One Way</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>     
            <IonCol>
              <IonButton onClick={(e) => openTripBookingPage(e,'round')} className="trip_type_button">Round Trip</IonButton>
            </IonCol>
          </IonRow>
      </div>
    </IonPage>
  );
};

export default TripTypePage;