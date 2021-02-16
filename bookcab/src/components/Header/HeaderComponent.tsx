
import { IonContent, IonHeader, IonPage,IonBackButton, IonTitle, IonToolbar,IonIcon } from '@ionic/react';
import React, { useState,useEffect } from 'react';
import './HeaderComponent.css';
import { useHistory } from "react-router-dom";
import {getUserSigninInfo} from '../../services/userservice';
import {eventBus} from "../../hooks/EventBus";
import Logout from '../AlertPopup/Logout';
interface ContainerProps { }

const HeaderComponent: React.FC<ContainerProps> = () => {
  const logoutThisSession =()=>{
    eventBus.dispatch("open-logout-popup", { message: "" });
  }
  
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
        <Logout></Logout>
          <div className="header_section">
            <div className={'user_avatar_image_icon'}>
              <img src={getUserSigninInfo().avatar}/>
            </div>
            <div onClick={() => logoutThisSession()}className={'app_logout_button'}>
              <svg viewBox="0 0 512 512"><path d="M505.664 243.739l-54.783-38.622c-9.926-6.997-23.645.128-23.645 12.26v23.622h-263.04c-8.284 0-15.001 6.716-15.001 15.001s6.717 15 15.001 15h263.038v23.621c0 12.212 13.792 19.204 23.644 12.26l54.783-38.622c8.366-5.894 8.535-18.492.003-24.52zm-75.193 108.578c-7.169-4.146-16.347-1.698-20.496 5.474-35.236 60.916-101.103 101.811-176.372 101.811-112.266 0-203.602-91.336-203.602-203.602S121.337 52.398 233.603 52.398c75.319 0 141.156 40.933 176.371 101.809 4.148 7.172 13.328 9.619 20.496 5.474s9.621-13.325 5.474-20.496C395.418 69.127 319.729 22.397 233.603 22.397 104.49 22.397 0 126.876 0 256c0 129.113 104.479 233.603 233.603 233.603 86.163 0 161.833-46.763 202.342-116.79 4.147-7.171 1.697-16.347-5.474-20.496z"/></svg>
            </div>
          </div>
        </IonTitle>
      </IonToolbar>
   </IonHeader>
  );
};

export default HeaderComponent;
