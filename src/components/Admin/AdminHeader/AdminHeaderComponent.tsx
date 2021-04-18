
import { IonHeader, IonToolbar,IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './AdminHeaderComponent.css';
import { useSelector,RootStateOrAny } from 'react-redux';
import { eventBus } from '../../../hooks/EventBus';

const AdminHeaderComponent: React.FC= () => {
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const logoutThisSession =(e:any)=>{
    e.preventDefault();
    eventBus.dispatch("open-logout-popup", { message: "" });
  }
  return (
    <IonHeader className="admin_header_class">
      <IonToolbar className="admin_header_toolbar">
        <IonRow>
          <IonCol>
          <div className="header_section">
            <div className={'user_avatar_image_icon'}>
              <img src={userInfo.profileImgUrl}/>
            </div>
          </div>
          </IonCol>
          <IonCol className="header_title_col_dashboard">
            <span className="header_title_text_admin">Admin</span>
          </IonCol>
          <IonCol>             
            <div onClick={(e)=>logoutThisSession(e)} className="admin_logout_botton">
               <svg viewBox="0 0 297 297"><path d="M155 6.5c-30.147 0-58.95 9.335-83.294 26.995-2.789 2.023-3.547 5.853-1.739 8.787L92.83 79.374c.962 1.559 2.53 2.649 4.328 3.004a6.59 6.59 0 0 0 5.145-1.129c14.23-10.323 31.069-15.78 48.698-15.78 45.783 0 83.03 37.247 83.03 83.03s-37.247 83.03-83.03 83.03c-17.629 0-34.468-5.456-48.698-15.78a6.58 6.58 0 0 0-5.145-1.129c-1.798.355-3.366 1.444-4.328 3.004l-22.863 37.093c-1.808 2.934-1.05 6.763 1.739 8.787C96.05 281.165 124.853 290.5 155 290.5c78.299 0 142-63.701 142-142s-63.701-142-142-142zM90.401 201.757c1.147-2.142 1.021-4.74-.326-6.76l-15.463-23.195h93.566c12.849 0 23.302-10.453 23.302-23.302s-10.453-23.302-23.302-23.302H74.612l15.463-23.195a6.58 6.58 0 0 0 .326-6.76c-1.146-2.141-3.377-3.478-5.806-3.478H40.019c-2.201 0-4.258 1.1-5.479 2.933L1.106 144.847c-1.475 2.212-1.475 5.093 0 7.306l33.433 50.149c1.221 1.832 3.278 2.933 5.479 2.933h44.577c2.43 0 4.661-1.337 5.806-3.478z"/></svg>
            </div>
          </IonCol>
        </IonRow>
      </IonToolbar>
   </IonHeader>
  );
};

export default AdminHeaderComponent;
