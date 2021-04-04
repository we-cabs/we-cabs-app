import React, { useState,useEffect } from 'react';
import { IonAlert, IonButton, IonContent } from '@ionic/react';
import {eventBus} from "../../hooks/EventBus";
import { useDispatch } from 'react-redux';
import { signout } from '../../actions/UserAction';
export const Logout: React.FC = () => {

  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    eventBus.on("open-logout-popup", () =>
      setShowAlert(true)
    );
  },[]);
    return (
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'Logout Me'}

          message={'Are you sure? You want to logout from app.'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
               
              }
            },
            {
              text: 'Ok',
              handler: () => {
                dispatch(signout());
              }
            }
          ]}
          />
      </IonContent>
    );
}

export default Logout;
