
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
             {(match.title != 'My Bids') ?      
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
          <IonCol className="header_title_col_dashboard">
            <span className="header_title_text">{match.title}</span>
          </IonCol>
          <IonCol>
            {(match.title != 'My Bids') ?              
            <div className="notification_bell_icon" onClick={()=>history.push('/tabs/dashboard/notification')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.379 16.913A6.7 6.7 0 0 1 19 11.788V9c0-3.519-2.614-6.432-6-6.92V1a1 1 0 1 0-2 0v1.08C7.613 2.568 5 5.481 5 9v2.788c0 1.979-.867 3.847-2.388 5.133-.389.333-.612.817-.612 1.329 0 .965.785 1.75 1.75 1.75h16.5c.965 0 1.75-.785 1.75-1.75 0-.512-.223-.996-.621-1.337zM12 24c1.811 0 3.326-1.291 3.674-3H8.326c.348 1.709 1.863 3 3.674 3z"/></svg>
           </div>
            :''}
          </IonCol>
        </IonRow>
      </IonToolbar>
   </IonHeader>
  );
};

export default HeaderComponent;
