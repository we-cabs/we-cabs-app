import { IonPage,IonRow,IonCol } from '@ionic/react';
import React from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './UpdateUserData.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';

const UpdateUserData: React.FC<RouteComponentProps> = ({match, history}) => {

    return (
        <IonPage>
         <AdminSubHeader title={"Update User Details"}/>
          <div className="main_body_content_container">
             Update User Details
          </div>
        </IonPage>
    );
  }

export default UpdateUserData;