
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
              <div className="header_title_text_admin">Admin</div>
            </div>
          </div>
          </IonCol>
          <IonCol>     
           <div className="header_section_logout_button">        
            <a href="/tabs/dashboard" className="header_title_text_admin home">Home</a>
            <div onClick={(e)=>logoutThisSession(e)} className="header_title_text_admin logout">Logout</div>
            <div onClick={(e)=>logoutThisSession(e)} className="admin_logout_botton">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.016 512"><path d="M496 240.008H293.332a16.01 16.01 0 0 1-16-16 16.01 16.01 0 0 1 16-16H496a16.01 16.01 0 0 1 16 16 16.01 16.01 0 0 1-16 16zm0 0"/><path d="M416 320.008a15.89 15.89 0 0 1-11.309-4.691c-6.25-6.254-6.25-16.387 0-22.637l68.695-68.691-68.695-68.695c-6.25-6.25-6.25-16.383 0-22.633a16.01 16.01 0 0 1 22.637 0l80 80c6.25 6.25 6.25 16.383 0 22.633l-80 80c-3.137 3.156-7.23 4.715-11.328 4.715zm-245.332 192c-4.566 0-8.898-.641-13.227-1.984L29.055 467.25C11.586 461.148 0 444.871 0 426.676v-384C0 19.145 19.137.008 42.668.008c4.563 0 8.895.641 13.227 1.984l128.383 42.773c17.473 6.102 29.055 22.379 29.055 40.574v384c0 23.531-19.133 42.668-42.664 42.668zm-128-480C36.801 32.008 32 36.809 32 42.676v384c0 4.543 3.051 8.766 7.402 10.281l127.785 42.582c.918.297 2.113.469 3.48.469a10.7 10.7 0 0 0 10.664-10.668v-384c0-4.543-3.051-8.766-7.402-10.281L46.145 32.477c-.918-.297-2.113-.469-3.477-.469zm0 0"/><path d="M325.332 170.676a16.01 16.01 0 0 1-16-16v-96c0-14.699-11.965-26.668-26.664-26.668h-240a16.01 16.01 0 0 1-16-16 16.01 16.01 0 0 1 16-16h240c32.363 0 58.664 26.305 58.664 58.668v96a16.01 16.01 0 0 1-16 16zm-42.664 277.332h-85.336a16.01 16.01 0 0 1-16-16 16.01 16.01 0 0 1 16-16h85.336c14.699 0 26.664-11.969 26.664-26.668v-96a16.01 16.01 0 0 1 16-16 16.01 16.01 0 0 1 16 16v96c0 32.363-26.301 58.668-58.664 58.668zm0 0"/></svg>
            </div>
           </div>
          </IonCol>
        </IonRow>
      </IonToolbar>
   </IonHeader>
  );
};

export default AdminHeaderComponent;
