import { IonPage,IonRow,IonCol } from '@ionic/react';
import React from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './SelectBidForBooking.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';

const SelectBidForBooking: React.FC<RouteComponentProps> = ({match, history}) => {

    return (
        <IonPage>
         <AdminSubHeader title={"Select Bid"}/>
          <div className="main_body_content_container">
             Select bid for booking
          </div>
        </IonPage>
    );
  }

export default SelectBidForBooking;