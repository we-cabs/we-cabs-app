import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonRow, IonCol } from '@ionic/react';
import { eventBus } from '../../hooks/EventBus';
import './SideMenu.css';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useHistory } from "react-router-dom";
import { menuController } from '@ionic/core';

export const SideMenu: React.FC = () => {
  const logoutThisSession =(e:any)=>{
    e.preventDefault();
    eventBus.dispatch("open-logout-popup", { message: "" });
  }
  const history = useHistory();
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);

  return (
    <>     
      <IonMenu side="start" contentId="main-content" type="overlay">
        <IonHeader>
          <div className="menu_drawer_header_section">
            <img src={userInfo.profileImgUrl}/>
            <div className="name_section">
            <span className="my_profile_title_name">{userInfo.name}</span><br></br>
            {(userInfo.balance != undefined && userInfo.balance.balance != undefined && userInfo.balance.balance) ?
            <span className="rupee_sign">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"/></svg>
            </span>
            : ''
            }
            <span className="pending_balance">{(userInfo.balance != undefined && userInfo.balance.balance != undefined && userInfo.balance.balance) ? userInfo.balance.balance : ''}</span>
            </div>
          </div>
        </IonHeader>
        <IonContent>
           <IonRow onClick={()=>{menuController.close(); history.push(`/tabs/dashboard/my-profile`)}} className="menu_drawer_list_options_link_row">
            <IonCol size="3" className="menu_drawer_list_svg_icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-42 0 512 512.002"><path d="M210.352 246.633c33.883 0 63.223-12.152 87.195-36.129s36.125-53.305 36.125-87.191c0-33.875-12.152-63.211-36.129-87.191C273.566 12.152 244.23 0 210.352 0c-33.887 0-63.219 12.152-87.191 36.125s-36.129 53.309-36.129 87.188c0 33.887 12.156 63.223 36.133 87.195s53.313 36.125 87.188 36.125zm215.777 147.07c-.691-9.977-2.09-20.859-4.148-32.352-2.078-11.578-4.754-22.523-7.957-32.527-3.309-10.34-7.809-20.551-13.371-30.336-5.773-10.156-12.555-19-20.164-26.277-7.957-7.613-17.699-13.734-28.965-18.199-11.227-4.441-23.668-6.691-36.977-6.691-5.227 0-10.281 2.145-20.043 8.5l-20.879 13.461c-6.707 4.273-15.793 8.277-27.016 11.902-10.949 3.543-22.066 5.34-33.039 5.34s-22.086-1.797-33.047-5.34c-11.211-3.621-20.297-7.625-26.996-11.898l-20.898-13.469c-9.75-6.355-14.809-8.5-20.035-8.5-13.312 0-25.75 2.254-36.973 6.699-11.258 4.457-21.004 10.578-28.969 18.199-7.605 7.281-14.391 16.121-20.156 26.273-5.559 9.785-10.059 19.992-13.371 30.34-3.199 10.004-5.875 20.945-7.953 32.523-2.059 11.477-3.457 22.363-4.148 32.363C.344 403.512 0 413.68 0 423.949c0 26.727 8.496 48.363 25.25 64.32 16.547 15.746 38.441 23.734 65.066 23.734h246.531c26.625 0 48.512-7.984 65.063-23.734 16.758-15.945 25.254-37.586 25.254-64.324-.004-10.316-.352-20.492-1.035-30.242zm0 0"/><defs/></svg>
            </IonCol>
            <IonCol className="menu_drawer_list_title">My Profile</IonCol>
           </IonRow>
           <IonRow onClick={()=>{menuController.close(); history.push(`/tabs/dashboard/bookingdetail/oneway`)}} className="menu_drawer_list_options_link_row">
            <IonCol size="3" className="menu_drawer_list_svg_icon">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="M406.713 15.5H105.288C47.232 15.5 0 62.732 0 120.788c0 58.337 47.723 105.288 104.66 105.288h47.29v-82.494c0-36.944 30.055-67 66.998-67h.146c36.865.079 66.856 30.135 66.856 67v82.494h120.763c58.056 0 105.287-47.232 105.287-105.288S464.769 15.5 406.713 15.5zm29.794 90.606l-60 60c-5.857 5.858-15.355 5.859-21.213 0l-30-30c-5.858-5.858-5.858-15.355 0-21.213s15.355-5.858 21.213 0l19.394 19.393 49.394-49.393c5.857-5.858 15.355-5.858 21.213 0s5.857 15.356-.001 21.213zM352.514 268.29l-96.563-10.037V143.581c0-20.404-16.517-36.956-36.921-37-20.465-.044-37.079 16.534-37.079 37V335.5h-.336L145.092 305c-15.405-12.864-38.393-10.452-50.793 5.329-11.891 15.134-9.595 36.979 5.182 49.31l74.133 61.861H391.95V312.944c0-22.702-16.909-41.848-39.436-44.654zM181.95 481.5c0 8.284 6.716 15 15 15h180c8.284 0 15-6.716 15-15v-30h-210z"/><defs/></svg>
            </IonCol>
            <IonCol className="menu_drawer_list_title">Booking</IonCol>
           </IonRow>
           <IonRow onClick={()=>{menuController.close(); history.push(`/tabs/bidding-list`)}}  className="menu_drawer_list_options_link_row">
            <IonCol size="3" className="menu_drawer_list_svg_icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M0 88h56v8H0zm48-8.065a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4V84h40zm6.426-32.704a27.906 27.906 0 0 0-4.639 6.674l32.924 32.924a4 4 0 0 0 5.656 0l5.657-5.657a4 4 0 0 0 0-5.657L61.1 42.6a27.263 27.263 0 0 0-6.674 4.631zM34.627 27.432a34.686 34.686 0 0 1-10.34 6.629l20.674 20.674A35.253 35.253 0 0 1 51.6 44.4a34.715 34.715 0 0 1 10.34-6.63L41.265 17.1a35.282 35.282 0 0 1-6.638 10.332z"></path><rect height="40" rx="4" transform="matrix(.707 -.707 .707 .707 4.201 48.034)" width="16" x="52.083" y="-1.054"></rect><rect height="40" rx="4" transform="matrix(.707 -.707 .707 .707 -29.74 33.976)" width="16" x="18.142" y="32.887"></rect></svg>
            </IonCol>
            <IonCol className="menu_drawer_list_title">Bidding</IonCol>
           </IonRow>
           <IonRow onClick={()=>{menuController.close();  history.push('/tabs/dashboard/notification')}} className="menu_drawer_list_options_link_row">
            <IonCol size="3" className="menu_drawer_list_svg_icon">
            <svg viewBox="0 0 512 512"><path d="M467.812 431.851l-36.629-61.056c-16.917-28.181-25.856-60.459-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04V42.667C298.66 19.136 279.524 0 255.993 0s-42.667 19.136-42.667 42.667V80.96C151.716 99.371 106.66 156.48 106.66 224v53.483c0 32.853-8.939 65.109-25.835 93.291L44.196 431.83c-1.984 3.307-2.027 7.403-.128 10.752s5.419 5.419 9.259 5.419H458.66c3.84 0 7.381-2.069 9.28-5.397s1.835-7.468-.128-10.753zm-278.997 37.482C200.847 494.464 226.319 512 255.993 512s55.147-17.536 67.179-42.667H188.815z"></path></svg>
            </IonCol>
            <IonCol className="menu_drawer_list_title">Notification</IonCol>
           </IonRow>
           <IonRow onClick={()=>{menuController.close();  history.push('/tabs/dashboard/contact-us')}}  className="menu_drawer_list_options_link_row">
            <IonCol size="3" className="menu_drawer_list_svg_icon">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 405.332c-11.777 0-21.332-9.555-21.332-21.332s9.555-21.332 21.332-21.332 21.332 9.555 21.332 21.332-9.555 21.332-21.332 21.332zm33.77-135.637c-7.551 3.477-12.437 11.094-12.437 19.395v9.578c0 11.773-9.535 21.332-21.332 21.332s-21.332-9.559-21.332-21.332v-9.578c0-24.898 14.633-47.723 37.227-58.156 21.738-10.004 37.438-36.566 37.438-49.602C309.332 151.937 285.418 128 256 128s-53.332 23.938-53.332 53.332c0 11.777-9.539 21.336-21.336 21.336S160 193.109 160 181.332c0-52.926 43.07-96 96-96s96 43.074 96 96c0 28.824-25.004 71.191-62.23 88.363zm0 0"/><defs/></svg>
            </IonCol>
            <IonCol className="menu_drawer_list_title">Help & Support</IonCol>
           </IonRow>
           <IonRow className="menu_drawer_list_options_link_row">
            <IonCol size="3" className="menu_drawer_list_svg_icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512"><path d="M320 277.336c-11.797 0-21.332 9.559-21.332 21.332v85.336c0 11.754-9.559 21.332-21.336 21.332h-64v-320c0-18.219-11.605-34.496-29.055-40.555l-6.316-2.113h99.371c11.777 0 21.336 9.578 21.336 21.336v64c0 11.773 9.535 21.332 21.332 21.332s21.332-9.559 21.332-21.332v-64c0-35.285-28.715-64-64-64H48c-.812 0-1.492.363-2.281.469-1.027-.086-2.008-.469-3.051-.469C19.137.004 0 19.137 0 42.668v384c0 18.219 11.605 34.496 29.055 40.555l128.387 42.797c4.352 1.344 8.68 1.984 13.227 1.984 23.531 0 42.664-19.137 42.664-42.668v-21.332h64c35.285 0 64-28.715 64-64v-85.336c0-11.773-9.535-21.332-21.332-21.332zm185.75-79.082l-85.336-85.332a21.33 21.33 0 0 0-23.25-4.633C389.207 111.598 384 119.383 384 128.004v64h-85.332c-11.777 0-21.336 9.555-21.336 21.332s9.559 21.332 21.336 21.332H384v64c0 8.621 5.207 16.406 13.164 19.715 7.977 3.305 17.152 1.469 23.25-4.629l85.336-85.336c8.34-8.34 8.34-21.824 0-30.164zm0 0"/><defs/></svg>
            </IonCol>
            <IonCol className="menu_drawer_list_title" onClick={(e)=>logoutThisSession(e)}>Logout</IonCol>
           </IonRow>
          </IonContent>
    </IonMenu>
    </>
  )
}