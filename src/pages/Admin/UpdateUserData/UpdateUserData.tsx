import { IonPage,IonRow,IonCol, IonGrid, IonContent } from '@ionic/react';
import React from 'react';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import './UpdateUserData.css';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import Loader from '../../../components/Loader/Loader';
import { actionToGerSelectedUserCarData } from '../../../actions/AdminAction';

const UpdateUserData: React.FC<RouteComponentProps> = ({match, history}) => {
  const {userData} = useSelector((state:RootStateOrAny) => state.allUserData);
  const dispatch = useDispatch();
    const getUserCarsData = (id:any) =>{
      history.push('/tabs/dashboard/user-cars');
      dispatch(actionToGerSelectedUserCarData(id));
    }
    return (
        <IonPage>
         <AdminSubHeader title={"User List"}/>
         <IonContent>
          <div className="user_data_list_section">
               {(userData != undefined && userData.length) ?
               <>
                {(userData.map((user:any)=>(
               <IonGrid className="user_data_list_container">
                   <IonRow>
                     <IonCol>
                       <div className="user_profile_pic">
                         <span className="user_profile_image"><img src={user.profileImgUrl}/></span>
                       </div>
                     </IonCol>
                   </IonRow>
                    <IonRow>
                       <IonCol>
                        <div className="user_data_grid">
                         <IonRow>
                            <IonCol size="3">
                              Name
                            </IonCol>
                             <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              {user.name}
                            </IonCol>
                         </IonRow>
                        </div>
                        <div className="user_data_grid">
                          <IonRow>
                            <IonCol size="3">
                               Phone:
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              {user.phone}
                            </IonCol>
                          </IonRow>
                         
                        </div>
                        <div className="user_data_grid">
                        <IonRow>
                            <IonCol size="3">
                            Email:
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              {user.email}
                            </IonCol>
                          </IonRow>
            
                        </div>
                        <div className="user_data_grid">
                          <IonRow>
                            <IonCol size="3">
                            Role:
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              {user.role}
                            </IonCol>
                          </IonRow>                   
                        </div>  
                        <div className="user_data_grid">
                        <IonRow>
                            <IonCol size="3">
                            Status:
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                            <select>
                                 <option>Not Approved</option>
                                 <option selected>Approved</option>
                               </select> 
                            </IonCol>
                          </IonRow>
                          </div> 
                          <div className="user_data_grid">
                          <IonRow>
                            <IonCol className="user_cars_button_section">
                              <button onClick={()=>getUserCarsData(user.userId)} className="user_cars_button">Cars</button>
                            </IonCol>                        
                          </IonRow>                   
                        </div>          
                       </IonCol>
                    </IonRow>
               </IonGrid>
                )))}     
                </>
               :<Loader/>
               }
          </div>
        </IonContent>
        </IonPage>
    );
  }

export default UpdateUserData;