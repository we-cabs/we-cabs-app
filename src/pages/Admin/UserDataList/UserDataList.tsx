import { IonPage,IonRow,IonCol, IonGrid, IonContent, IonToast,IonLabel,IonToggle,IonCard,IonAvatar,IonCardContent,IonItem } from '@ionic/react';
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
      <IonCard className="user_profile_card_section">
        <IonGrid>
        <IonRow>
        <IonCol size="4">
          <IonRow>
            <IonCol>
              <div className="user_profile_pic_profile_section">
                <span className="user_profile_image"><img src={user.profileImgUrl}/></span>
              </div>
            </IonCol>
          </IonRow>  
          <IonRow>
            <IonCol>
              <button  onClick={()=>updateUserCarDataPage(user)} className="user_edit_button">Edit</button>
            </IonCol>                        
        </IonRow>
        <IonRow>
          <IonCol>
            <button onClick={()=>getUserCarsData(user.userId)} className="user_cars_button">Cars</button>
          </IonCol>                        
        </IonRow>
        </IonCol>  
        <IonCol size="8">
        <IonItem>
          <h2>{user.name}</h2>
        </IonItem> 
        <IonCardContent className="user_data_list_card_content">
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
      </IonCardContent>
        </IonCol>
        </IonRow>
        </IonGrid>
      </IonCard>
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
          <div className="user_data_list_main_top_container">
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
          </div>
        </IonContent>
        </IonPage>
    );
  }

export default UserDataList;