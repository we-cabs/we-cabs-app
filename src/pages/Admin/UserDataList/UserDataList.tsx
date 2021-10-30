import { IonPage,IonRow,IonCol, IonGrid, IonContent, IonToast,IonLabel,IonToggle,IonCard,IonAvatar,IonCardContent,IonItem, IonInput } from '@ionic/react';
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
      setUserBalanceDataInput(user.phone);

      setTimeout(function(){
        if(user.balance != undefined){
          $('.user_balance_input_data').val(user.balance.balance);
        }else{
          $('.user_balance_input_data').val(0);
        }
      })

      setTimeout(function(){
        $('.user_balance_input_data').focus();
      })
    }
    const cancleEditingBalance = () =>{
      setUserBalanceDataInput('');
      $('.user_balance_input_data').val(0);
    }
    const updateUserBalanceData = async (data:any)=>{
      setUserBalanceDataInput('');
      let sameValue = false;
      let addedNumberBalance = Number($('.user_balance_input_data').val());

      if(data.balance != undefined && data.balance.balance != undefined && addedNumberBalance == Number(data.balance.balance)){
        sameValue = true;
      }

      if(!sameValue && buttonPauseId != data.phone && !isNaN(addedNumberBalance)){
          addButtonPauseId(data.phone);
          dispatch(actionToUpdatedUserImageUrl(data.profileImgUrl));
          let newDocImages = [];
          if(data.images != undefined && data.images.doc != undefined && data.images.doc != undefined)
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
            balance:{date:moment(new Date()).valueOf(),balance:addedNumberBalance},
            deviceToken:data.deviceToken,
          }
          dispatch(actionToUpdateUserData(userUpdateData));
          let notification = {
            "message": {
                "notification": {
                    "title": "Wecab Wallet Balance Updated",
                    "body": `Your wallet balance updated to ${addedNumberBalance}`,
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
      if(data != undefined && data.images != undefined && data.images.doc != undefined)
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
      const result = userData.filter((user:any) => user.phone.indexOf(searchTextData) >= 0);
      console.log(result);
      setFilteredUserData(result);
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
              <div className="user_balance_update_input_section">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>
                {userBalanceDataInput == user.phone ? 
                          <input className="user_balance_input_data"  
                          autoFocus={true}
                          type="number"/>                           
                    :
                      <span className="user_data_balance_span_value">{(user.balance != undefined && user.balance.balance != undefined) ? user.balance.balance : 0}</span>              
                  }
                  {userBalanceDataInput == user.phone ? 
                   <>
                    &nbsp;&nbsp;
                    <button onClick={()=>{updateUserBalanceData(user)}} className="add_wallet_balance_class add">{(buttonPauseId == user.phone) ? '...' : 'Add'}</button>  
                    &nbsp;&nbsp;
                    <button onClick={()=>{cancleEditingBalance()}} className="add_wallet_balance_class cancel">{'Cancel'}</button>                           
                   </>
                  :        
                  <>
                   &nbsp;&nbsp;
                   <button onClick={()=>setUserBalanceDataInputOnClick(user)} className="add_wallet_balance_class edit">{'Edit'}</button>                           
                  </>
                }
               </div>
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
          {(filteredUserData != undefined) ?
              <div className="user_search_by_phone_section">
                <input onChange={(e)=>searchUserPhoneInList(e.target.value)} value={searchTextData} type="number" placeholder="Search user by user id or phone number"/>
                <svg xmlns="http://www.w3.org/2000/svg" className="search_icon" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
                {(searchTextData.trim().length) ? 
                <svg onClick={()=>searchUserPhoneInList('')} xmlns="http://www.w3.org/2000/svg" className="remove_icon" viewBox="0 0 512 512"><path d="M256 512C114.84 512 0 397.16 0 256S114.84 0 256 0s256 114.84 256 256-114.84 256-256 256zm0-475.43C135.008 36.57 36.57 135.008 36.57 256S135.008 475.43 256 475.43 475.43 376.992 475.43 256 376.992 36.57 256 36.57zm91.43 329.145c-4.68 0-9.359-1.785-12.93-5.359L151.645 177.5c-7.145-7.145-7.145-18.715 0-25.855s18.715-7.145 25.855 0L360.355 334.5c7.145 7.145 7.145 18.715 0 25.855-3.57 3.574-8.246 5.359-12.926 5.359zm0 0"/><path d="M164.57 365.715c-4.68 0-9.355-1.785-12.926-5.359-7.145-7.141-7.145-18.715 0-25.855L334.5 151.645c7.145-7.145 18.715-7.145 25.855 0s7.145 18.715 0 25.855L177.5 360.355c-3.57 3.574-8.25 5.359-12.93 5.359zm0 0"/></svg>
                :''}
              </div>
              :''}
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