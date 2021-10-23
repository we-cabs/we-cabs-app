import { IonPage,IonRow,IonCol, IonGrid, IonContent, IonToast,IonLabel,IonToggle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import './UserDataList.css';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import Loader from '../../../components/Loader/Loader';
import { actionToGerSelectedUserCarData, actionToSetEditUserData,actionToUpdatedUserImageUrl,actionToUpdatedUserDocImageUrl, actionToUpdateUserData, actionToSendNotificationToUser} from '../../../actions/AdminAction';
import $ from 'jquery';
import NoDataFound from '../../../components/NoDatFound/NoDataFound';
import moment from 'moment';

const UserDataList: React.FC<RouteComponentProps> = ({match, history}) => {
  let userData = useSelector((state:RootStateOrAny) => state.allUserData.userData);
  const [filteredUserData,setFilteredUserData] = useState(userData);
  const [noDataFound,setNoDataFound] = useState(false);
  const [goldCheckedArray,setGoldCheckedArray]:any = useState([]);
  
  const [userBalanceDataInput,setUserBalanceDataInput] = useState('');
  const [searchTextData,setSearchTextData] = useState('');
  const [userBalanceData,setUserBalanceData] = useState(0);
  const [showToast,setShowToast] = useState(false);
  const [buttonPauseId,addButtonPauseId] = useState('');


  const dispatch = useDispatch();
    const getUserCarsData = (id:any) =>{
      history.push('/tabs/dashboard/user-cars');
      dispatch(actionToGerSelectedUserCarData(id));
    }
    const updateUserCarDataPage = (user:any) =>{
      history.push('/tabs/dashboard/update-user-data');
      dispatch(actionToSetEditUserData(user));
    }
    const searchUserPhoneInList = (text:any) =>{
      setSearchTextData(text);
      setNoDataFound(false);
      let filter = text.toLowerCase();
      const result = userData.filter((user:any) => user.phone.indexOf(filter) >= 0);

      if(result.length){
        setNoDataFound(false);
      }else{
        setNoDataFound(true);
      }
      setFilteredUserData(result);
    }
    const setUserBalanceDataInputOnClick = (user:any) =>{
      if(user.balance != undefined){
        setUserBalanceDataInput(user.userId);
        setUserBalanceData(user.balance.balance);
       }else{
        setUserBalanceDataInput(user.userId);
         let a = 0;
         setUserBalanceData(a);
       }
    }
    const setUserBalance = (val:any) =>{
      setUserBalanceData(val);
    }
    const updateUserBalanceData = async (data:any)=>{
      setUserBalanceDataInput('');
      if(userBalanceData != data.balance.balance && buttonPauseId != data.userId){
          addButtonPauseId(data.userId);
          dispatch(actionToUpdatedUserImageUrl(data.profileImgUrl));
          let newDocImages = [];
          if(data.images.doc != undefined)
              newDocImages = data.images.doc;
          dispatch(actionToUpdatedUserDocImageUrl(newDocImages));
          const userUpdateData = {
            userId:data.userId,
            phone:data.phone,
            location:data.location,
            approvalStatus:data.approvalStatus,
            email:data.email,
            name:data.name,
            password:data.password,
            role:data.role,
            notifications:data.notifications,
            balance:{date:moment(new Date()).valueOf(),balance:Number(userBalanceData)},
            deviceToken:data.deviceToken,
          }
          dispatch(actionToUpdateUserData(userUpdateData));
          let notification = {
            "message": {
                "notification": {
                    "title": "Wecab Wallet Balance Updated",
                    "body": `Your wallet balance updated to ${userBalanceData}`,
                    "sound": 'notification.wav',
                    "android_channel_id":"fcm_default_channel",
                    "channel_id":"fcm_default_channel",
                    "icon":"ic_launcher_round"
                },    
                "data": {"page":"user_detail"}       
            }
        }

        dispatch(actionToSendNotificationToUser(data.userId,notification));
        setTimeout(function(){
          setShowToast(true);
          addButtonPauseId('');
          setUserBalanceData(0);
        },1000)
      }
    }

    const acionToSetGoldChecked = (data:any)=>{
      const goldCheckedArrayTemp:any = goldCheckedArray;

      let notificationTitle = "WeCab Gold Member";
      let notificationBody = "You Are Gold Member Of WeCab Now";

      let userRoleData = data.role;
      if(goldCheckedArrayTemp.includes(data.userId)){
        goldCheckedArrayTemp.splice(goldCheckedArrayTemp.indexOf(data.userId),1);
        notificationTitle = "WeCab Gold Member";
        notificationBody = "You Are No Longer Gold Member Of WeCab Now";
        userRoleData = 'driver';
      }else{
        goldCheckedArrayTemp.push(data.userId);
        userRoleData = 'goldDriver';
      }

      setGoldCheckedArray(goldCheckedArrayTemp);
      dispatch(actionToUpdatedUserImageUrl(data.profileImgUrl));
      let newDocImages = [];
      if(data.images.doc != undefined)
          newDocImages = data.images.doc;
      dispatch(actionToUpdatedUserDocImageUrl(newDocImages));
      const userUpdateData = {
        userId:data.userId,
        phone:data.phone,
        location:data.location,
        approvalStatus:data.approvalStatus,
        email:data.email,
        name:data.name,
        password:data.password,
        role:userRoleData,
        notifications:data.notifications,
        balance:data.balance,
        deviceToken:data.deviceToken,
      }
      dispatch(actionToUpdateUserData(userUpdateData));
    
      let notification = {
          "message": {
              "notification": {
                  "title":notificationTitle,
                  "body": notificationBody,
                  "sound": 'notification.wav',
                  "android_channel_id":"fcm_default_channel",
                  "channel_id":"fcm_default_channel",
                  "icon":"ic_launcher_round"
              },    
              "data": {"page":"user_detail"}       
          }
      }

      dispatch(actionToSendNotificationToUser(data.userId,notification));
    }

    useEffect(()=>{
      if(userData != undefined){
      const goldCheckedArrayTemp:any = [];
      userData.map((user:any)=>{
        if(user.role == 'goldDriver'){
          goldCheckedArrayTemp.push(user.userId);
        }
      })
      setGoldCheckedArray(goldCheckedArray);
      setFilteredUserData(userData);
    }
    },[userData])
    useEffect(()=>{
      if(userData != undefined){
      const goldCheckedArrayTemp:any = [];
      userData.map((user:any)=>{
     
        if(user.role == 'goldDriver'){
          goldCheckedArrayTemp.push(user.userId);
        }
      })
     
      setGoldCheckedArray(goldCheckedArrayTemp);
    }
    },[])

    // Item contents are cached properly with React.memo
  const InnerItem = React.memo(({ index }:any) => {
    const user = filteredUserData[index]; 

    return (
      <IonGrid key={user.userId} className="user_data_list_container">
                   <IonRow>
                     <IonCol>
                       <div className="user_profile_pic">
                         <span className="user_profile_image"><img src={user.profileImgUrl}/></span>
                         <div onClick={()=>updateUserCarDataPage(user)} className="user_update_date">
                            Edit
                         </div>
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
                               Phone
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              <a className="phone_number">{user.phone}</a>
                            </IonCol>
                          </IonRow>                        
                        </div>
                        <div className="user_data_grid">
                        <IonRow>
                            <IonCol size="3">
                            Email
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
                            Role
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
                            Status
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              {(user.approvalStatus == 'notApproved' ? 'Not Approved' : 'Approved')}
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol size="3">
                            Is Gold
                            </IonCol>
                              <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              <IonToggle
                               className="user_data_grid_toggle_section" 
                               checked={user.role == 'goldDriver' ? true : false}
                               onIonChange={e => acionToSetGoldChecked(user)} />
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol size="3">
                              Balance
                            </IonCol>
                            <IonCol size="1">
                              -
                              </IonCol>
                            <IonCol size="6">
                              {userBalanceDataInput == user.userId ? 
                                       <input className="user_balance_input_data 1"                               
                                       value={userBalanceData}                                      
                                       onChange={(e)=>setUserBalance(e.target.value)}
                                       type="number"/>                           
                                  :
                                      <input className="user_balance_input_data 2"
                                      value={(user.balance != undefined) ? user.balance.balance : 0}
                                      onClick={()=>setUserBalanceDataInputOnClick(user)}
                                      type="number"/>                   
                                }
                                {userBalanceDataInput == user.userId ? 
                                <>
                                  &nbsp;&nbsp;
                                  <button onClick={()=>{updateUserBalanceData(user)}}className="add_wallet_balance_class">{(buttonPauseId == user.userId) ? '...' : 'Add'}</button>                           
                                </>
                                :''}
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

    );
  })

    const itemContent = (index:any) => {
      return <InnerItem index={index} />
    }

    return (
        <IonPage>
              <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Balance updated"
                duration={1300}
              />
         <AdminSubHeader title={"User List"}/>
         <IonContent>
         <div className="user_search_by_phone_section">
              <input onChange={(e)=>searchUserPhoneInList(e.target.value)} value={searchTextData} type="number" placeholder="Search user by user id or phone number"/>
              <svg xmlns="http://www.w3.org/2000/svg" className="search_icon" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
              {(searchTextData.trim().length) ? 
              <svg onClick={()=>searchUserPhoneInList('')} xmlns="http://www.w3.org/2000/svg" className="remove_icon" viewBox="0 0 512 512"><path d="M256 512C114.84 512 0 397.16 0 256S114.84 0 256 0s256 114.84 256 256-114.84 256-256 256zm0-475.43C135.008 36.57 36.57 135.008 36.57 256S135.008 475.43 256 475.43 475.43 376.992 475.43 256 376.992 36.57 256 36.57zm91.43 329.145c-4.68 0-9.359-1.785-12.93-5.359L151.645 177.5c-7.145-7.145-7.145-18.715 0-25.855s18.715-7.145 25.855 0L360.355 334.5c7.145 7.145 7.145 18.715 0 25.855-3.57 3.574-8.246 5.359-12.926 5.359zm0 0"/><path d="M164.57 365.715c-4.68 0-9.355-1.785-12.926-5.359-7.145-7.141-7.145-18.715 0-25.855L334.5 151.645c7.145-7.145 18.715-7.145 25.855 0s7.145 18.715 0 25.855L177.5 360.355c-3.57 3.574-8.25 5.359-12.93 5.359zm0 0"/></svg>
              :''}
              </div>

          <div id="user_data_list_section_id" className="user_data_list_section">
          {(noDataFound) ? 
            <div className="no_data_found">
              <NoDataFound/>
            </div>
            : (filteredUserData != undefined && filteredUserData.length) ?
              <Virtuoso totalCount={filteredUserData.length} itemContent={itemContent} className="vertual_list_scroll" />
              : 
              <Loader/>
          }
          
          </div>
        </IonContent>
        </IonPage>
    );
  }

export default UserDataList;