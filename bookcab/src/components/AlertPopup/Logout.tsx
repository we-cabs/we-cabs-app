import React, { useState,useEffect } from 'react';
import { IonAlert, IonButton, IonContent } from '@ionic/react';
import {eventBus} from "../../hooks/EventBus";
import { setUserSigninInfo } from '../../services/userservice';
export const Logout: React.FC = () => {

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    eventBus.on("open-logout-popup", () =>
      setShowAlert(true)
    );
  });
    return (
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'Logout Me'}
          subHeader={'Subtitle'}
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
                setUserSigninInfo('');
                localStorage.removeItem('userInfo');
                window.location.reload();
              }
            }
          ]}
          />
      </IonContent>
    );
}

export default Logout;
