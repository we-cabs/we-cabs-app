import React from 'react';
import {IonHeader, IonToolbar, IonRow,IonCol, IonBackButton, IonButtons } from '@ionic/react'
import './AdminSubHeader.css';
import { useHistory } from "react-router";


const AdminSubHeader = (props:any) => {
  const history = useHistory();
  const openAddUserCarPage = () =>{
    history.push('/tabs/dashboard/add-user-cars');
  }
  const openAddUserPage = () =>{
    history.push('/tabs/dashboard/add-user');
  }
  return (
    <IonHeader className="admin_sub_header_class">
       <IonToolbar className="admin_sub_header_toolbar">
          <IonButtons className="back_button_group" slot="start">
                <IonBackButton defaultHref="/"/>
          </IonButtons>
        <IonRow>
          <IonCol size="10" className="header_title_col_user_list">
            <span className="header_title_text_admin">{props.title}</span>
          </IonCol>
          <IonCol size="2" className="header_title_col_add_car">   
            {(props.title === 'User Cars') ? 
               <svg onClick={()=>openAddUserCarPage()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M154.245 230h80.068a6 6 0 0 0 0-12h-80.068a6 6 0 0 0 0 12zm99.231 19h31.068a20.5 20.5 0 1 0 0-41h-25.451a5.948 5.948 0 0 0-5.891 4.8l-5.617 29.036a6.019 6.019 0 0 0 5.891 7.164zm10.568-29h20.5a8.5 8.5 0 1 1 0 17h-23.8zm-123.069 21.823l-5.619-29.013a5.953 5.953 0 0 0-5.89-4.81h-25.45a20.5 20.5 0 1 0 0 41h31.068a6.039 6.039 0 0 0 5.891-7.177zM104.016 237a8.5 8.5 0 1 1 0-17h20.5l3.3 17zm168.376 57l.145 20.376a14.673 14.673 0 0 0 4.321 10.337A14.514 14.514 0 0 0 287.026 329h.111l23.019-.38a14.423 14.423 0 0 0 14.391-14.494L324.4 294h.279c4.556 0 8.317-4.151 8.317-8.708V265.1a8.838 8.838 0 0 0-6-7.959v-42.677a23.353 23.353 0 0 0-19.979-23.021l-16.277-44.621A24.208 24.208 0 0 0 267.957 131H124.446a24.168 24.168 0 0 0-22.756 15.823l-16.01 44.682A23.031 23.031 0 0 0 66 214.464v42.675c-4 .964-7 4.162-7 7.959v20.194A9.065 9.065 0 0 0 67.722 294h.178l.146 20.6A14.519 14.519 0 0 0 82.534 329h.109l23.018-.38a14.423 14.423 0 0 0 14.392-14.494L119.909 294zm37.68 22.731l-23.039.269a2.538 2.538 0 0 1-1.752-.946 2.2 2.2 0 0 1-.744-1.651l-.145-20.4H312.4l.143 20.1a2.6 2.6 0 0 1-2.471 2.628zM112.97 150.819A12.045 12.045 0 0 1 124.446 143h143.511a12.046 12.046 0 0 1 11.477 7.819L294.105 191H98.3zM78 214.464C78 208.252 82.582 203 88.794 203H303.61A11.556 11.556 0 0 1 315 214.464V257h-67.2l-10.264-17.844a6.162 6.162 0 0 0-5.187-3.156H155.6a6.162 6.162 0 0 0-5.189 3.156L140.151 257H78zM233.924 257h-79.9l5.03-9H228.9zm-128.347 59.731L82.539 317a2.505 2.505 0 0 1-2.5-2.483L79.9 294h28.012l.144 20.1a2.6 2.6 0 0 1-2.479 2.631zM71 282v-13h250v13zM43 121.714a6 6 0 0 0-6 6v93a6 6 0 1 0 12 0v-93a6 6 0 0 0-6-6zm0-23.887a6 6 0 0 0-6 6v4.95a6 6 0 0 0 12 0v-4.95a6 6 0 0 0-6-6zm51.881 269.99a8.838 8.838 0 0 1 8.828 8.829 6.03 6.03 0 0 0 12.06 0c0-9.4-6.769-17.356-14.769-19.939v-3.038a6 6 0 0 0-12 0v3.038a20.4 20.4 0 0 0-14.889 19.939 20.828 20.828 0 0 0 20.8 20.828A8.826 8.826 0 0 1 95 415.126h-.219a8.836 8.836 0 0 1-8.723-8.823 5.971 5.971 0 1 0-11.942 0A20.4 20.4 0 0 0 89 426.242v3.712a6 6 0 0 0 12 0v-3.712c8-2.584 14.769-10.54 14.769-19.939a20.878 20.878 0 0 0-20.859-20.829 8.829 8.829 0 1 1-.029-17.657zM278.665 355H140.781a6 6 0 0 0 0 12h137.884a6 6 0 0 0 0-12zm-50.676 61h-87.208a6 6 0 1 0 0 12h87.208a6 6 0 1 0 0-12zm222.134-129.794L382 330.86V84.959A39.218 39.218 0 0 0 343.029 46H301V25.931a6 6 0 1 0-12 0V46h-56V25.931a6 6 0 0 0-12 0V46h-56V25.931a6 6 0 0 0-12 0V46H96V25.931a6 6 0 1 0-12 0V46H48.7A38.988 38.988 0 0 0 10 84.959v368.468A38.658 38.658 0 0 0 48.7 492h294.329C364.37 492 382 474.734 382 453.427v-42.5L486.955 342.1a33.415 33.415 0 0 0 9.554-46.315 33.58 33.58 0 0 0-46.386-9.579zm-.728 14.825l8.5 12.909-165.674 108.6-8.5-12.908zM294.648 448.052l-34.214.895 15.527-29.283zm.226-371.294a12.073 12.073 0 1 1-12.106 12.073 12.1 12.1 0 0 1 12.106-12.073zm-68.157 0a12.073 12.073 0 1 1-12.107 12.073 12.1 12.1 0 0 1 12.107-12.073zm-68.156 0a12.073 12.073 0 1 1-12.108 12.073 12.1 12.1 0 0 1 12.108-12.073zm-68.158 0A12.073 12.073 0 1 1 78.3 88.831a12.1 12.1 0 0 1 12.1-12.073zM370 453.427C370 468.118 357.754 480 343.029 480H48.7A26.644 26.644 0 0 1 22 453.427V84.959A26.975 26.975 0 0 1 48.7 58H84v7.513a24.1 24.1 0 0 0 6.3 47.387 23.988 23.988 0 0 0 23.955-24.073A23.609 23.609 0 0 0 96 65.513V58h57v7.513a23.669 23.669 0 0 0-18.327 23.318 24.134 24.134 0 0 0 48.268 0A24.431 24.431 0 0 0 165 65.513V58h56v7.513a23.6 23.6 0 0 0-18.248 23.318 24.125 24.125 0 0 0 48.249 0 24.484 24.484 0 0 0-18-23.318V58h56v7.513a23.532 23.532 0 0 0-18.17 23.318 24.115 24.115 0 0 0 48.23 0A24.537 24.537 0 0 0 301 65.513V58h42.029A27.205 27.205 0 0 1 370 84.959v253.767l-86.338 56.593a6 6 0 0 0-5-9.319H140.781a6 6 0 1 0 0 12h137.884a5.956 5.956 0 0 0 1.058-.1l-7.608 4.987a6.006 6.006 0 0 0-2.01 2.208h0L245.019 452.4a6 6 0 0 0 5.3 8.811h.283l55.4-1.454a5.767 5.767 0 0 0 3.008-.972L370 418.793zm-62.687-7.96l-8.5-12.908 165.675-108.6 8.5 12.907zm182.24-126.977a21.247 21.247 0 0 1-6.676 11.577l-23.3-35.386a21.532 21.532 0 0 1 26.888 7.706 21.258 21.258 0 0 1 3.088 16.103z"/></svg>                 
            
               : (props.title === 'User List') ? 
               <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>openAddUserPage()} className="add_user_icon" viewBox="0 0 512 512"><path d="M226 232c-63.963 0-116-52.037-116-116S162.037 0 226 0s116 52.037 116 116-52.037 116-116 116zm45 85c0-25.68 7.21-49.707 19.708-70.167C271.193 256.526 249.228 262 226 262c-30.128 0-58.152-9.174-81.429-24.874-28.782 11.157-55.186 28.291-77.669 50.774C24.404 330.397 1 386.899 1 446.999V497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15v-50.001l-.036-2.708C436.892 449.277 421.759 452 406 452c-74.439 0-135-60.561-135-135zm135-105c-57.897 0-105 47.103-105 105s47.103 105 105 105 105-47.103 105-105-47.103-105-105-105zm30 120h-15v15c0 8.284-6.716 15-15 15s-15-6.716-15-15v-15h-15c-8.284 0-15-6.716-15-15s6.716-15 15-15h15v-15c0-8.284 6.716-15 15-15s15 6.716 15 15v15h15c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/></svg>
              : ''
             }
            </IonCol>
        </IonRow>
        </IonToolbar>
      </IonHeader>
  );
};

export default AdminSubHeader;