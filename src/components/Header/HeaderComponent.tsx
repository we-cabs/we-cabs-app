
import { IonContent, IonHeader, IonPage,IonBackButton, IonTitle, IonToolbar,IonIcon, IonButton, IonMenuButton, IonButtons, IonRow, IonCol } from '@ionic/react';
import React, { useState,useEffect, } from 'react';
import './HeaderComponent.css';
import { useHistory } from "react-router-dom";
import {getUserSigninInfo} from '../../services/userservice';
import {eventBus} from "../../hooks/EventBus";
import Logout from '../AlertPopup/Logout';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import { menuController } from '@ionic/core';

interface ContainerProps{
  title: string;
}

const HeaderComponent: React.FC<ContainerProps> = (match) => {
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const history = useHistory();
  const openMenu = () =>{
    console.log('menu');
    menuController.open()
  }
  return (
    <IonHeader className="user_header_class">
      <IonToolbar className="user_header_toolbar">
        <IonRow>
          <IonCol>
          <div className="header_section">
            <div onClick={(e)=>openMenu()} className={'user_avatar_image_icon'}>
             {(match.title != 'My Bid List') ?      
               <>
                 <img src={userInfo.profileImgUrl}/>
                 <div className="menu_drawer_icon_section">
                   <svg viewBox="0 0 512 512"><path d="M501.333 96H10.667C4.779 96 0 100.779 0 106.667s4.779 10.667 10.667 10.667h490.667c5.888 0 10.667-4.779 10.667-10.667S507.221 96 501.333 96zm0 149.333H10.667C4.779 245.333 0 250.112 0 256s4.779 10.667 10.667 10.667h490.667c5.888 0 10.667-4.779 10.667-10.667s-4.78-10.667-10.668-10.667zm0 149.334H10.667C4.779 394.667 0 399.445 0 405.333S4.779 416 10.667 416h490.667c5.888 0 10.667-4.779 10.667-10.667s-4.78-10.666-10.668-10.666z"/></svg>
                 </div>
               </>
              :
                <div className="menu_drawer_icon_section_full_icon">
                   <svg viewBox="0 0 512 512"><path d="M501.333 96H10.667C4.779 96 0 100.779 0 106.667s4.779 10.667 10.667 10.667h490.667c5.888 0 10.667-4.779 10.667-10.667S507.221 96 501.333 96zm0 149.333H10.667C4.779 245.333 0 250.112 0 256s4.779 10.667 10.667 10.667h490.667c5.888 0 10.667-4.779 10.667-10.667s-4.78-10.667-10.668-10.667zm0 149.334H10.667C4.779 394.667 0 399.445 0 405.333S4.779 416 10.667 416h490.667c5.888 0 10.667-4.779 10.667-10.667s-4.78-10.666-10.668-10.666z"/></svg>
                 </div>
                 }
            </div>
          </div>
          </IonCol>
          <IonCol className="header_title_col">
            <span className="header_title_text">{match.title}</span>
          </IonCol>
          <IonCol>
            {(match.title != 'My Bid List') ?              
            <div className="notification_bell_icon" onClick={()=>history.push('/tabs/dashboard/notification')}>
               <svg viewBox="0 0 512 512"><path d="M467.812 431.851l-36.629-61.056c-16.917-28.181-25.856-60.459-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04V42.667C298.66 19.136 279.524 0 255.993 0s-42.667 19.136-42.667 42.667V80.96C151.716 99.371 106.66 156.48 106.66 224v53.483c0 32.853-8.939 65.109-25.835 93.291L44.196 431.83c-1.984 3.307-2.027 7.403-.128 10.752s5.419 5.419 9.259 5.419H458.66c3.84 0 7.381-2.069 9.28-5.397s1.835-7.468-.128-10.753zm-278.997 37.482C200.847 494.464 226.319 512 255.993 512s55.147-17.536 67.179-42.667H188.815z"/></svg>
            </div>
            :''}
          </IonCol>
        </IonRow>
      </IonToolbar>
   </IonHeader>
  );
};

export default HeaderComponent;
