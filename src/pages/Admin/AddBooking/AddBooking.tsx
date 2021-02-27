import { IonPage,IonRow,IonCol } from '@ionic/react';
import React from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './AddBooking.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';

const AddBooking: React.FC<RouteComponentProps> = ({match, history}) => {

    return (
        <IonPage>
         <AdminSubHeader title={"Add Booking"}/>
          <div className="main_body_content_container">
             Add Booking
          </div>
        </IonPage>
    );
  }

export default AddBooking;