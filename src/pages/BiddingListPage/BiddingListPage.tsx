import React,{useEffect,useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './BiddingListPage.css';
import { actionToGetBookingData, addBookingData, editStartStopTripLocally } from '../../actions/BookingAction';
import { actionToGetUserCar } from '../../actions/UserAction';
import Loader from '../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import { _convertUnixToDateTimeFormat } from '../../hooks/DateTimeConverter';
import NoDataFound from '../../components/NoDatFound/NoDataFound';
import { actionToGetBidByUserId, addBiddingBookingData } from '../../actions/BiddingAction';
import moment from 'moment';

const BiddingListPage: React.FC<RouteComponentProps> = ({history}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const biddingDetailByUserId = useSelector((state:RootStateOrAny) => state.biddingDetailByUserId);
  const [bidDataClone,setBidDataClone] = useState([]);


  const [filterType,setFilterType] = useState('all');
  const [isFixedSubHeader,setIsFixedSubHeader] = useState(false);

  const filterAllBidDataByStatus = (type:any,bidDataProp:any) =>{
      setFilterType(type);
      let filterBidData = cloneDeep(bidDataProp);
      let data:any = [];
      if(filterBidData != undefined){
      if(type != 'all'){
        filterBidData.map((bid:any)=>{
          if(bid.status != 'cancel' && bid.bookingType != 'gold'){
            if(bid.bidStatus == type){
              data.push(bid);
            }
          }
        })
      }else{
        filterBidData.map((bid:any)=>{
          if(bid.status != 'cancel' && bid.bookingType != 'gold'){
            data.push(bid);
          }
        })
      }
    }
    setBidDataClone(data);
  }

   
  const openBiddingPage = (e:any,data:any) =>{
    dispatch(addBiddingBookingData(data));
    history.push(`/tabs/dashboard/show-bidding`);
  }

  const scrollProfileContent = (e:any) =>{
    if(e.detail.scrollTop > 83){
     setIsFixedSubHeader(true);
    }else{
     setIsFixedSubHeader(false);
    }
 }
 const setStartStopTrip = (e:any,bidData:any) =>{
console.log('setStartStopTrip',bidData)
    if(bidData.startStopTripMessage == 'stop') return;
    let tm = (bidData.startStopTripMessage && bidData.startStopTripMessage == 'pending') ? 'start' : (bidData.startStopTripMessage && bidData.startStopTripMessage  == 'start') ? 'stop' : 'start';
     let bookingData = bidData;
     bookingData.startStopTripMessage = tm;
    dispatch(editStartStopTripLocally(bookingData));
    dispatch(addBookingData(bookingData));
 }
  useEffect(()=>{
    if(biddingDetailByUserId.bidData != undefined && biddingDetailByUserId.bidData.length){
      filterAllBidDataByStatus('all',biddingDetailByUserId.bidData);
    } 
  },[biddingDetailByUserId]);
  
  useEffect(()=>{
    dispatch(actionToGetBidByUserId(userInfo.phone,0));
    if(biddingDetailByUserId.bidData != undefined && biddingDetailByUserId.bidData.length){
      filterAllBidDataByStatus('all',biddingDetailByUserId.bidData);
    } 
  },[])
  
  return (
    <IonPage>
      <HeaderComponent title="My Bids"/>
      <IonContent scrollEvents={true} onIonScroll={scrollProfileContent}>
        <div className="inner_contant_container">
        <div className="top_bidding_header_section">
            <div className="top_balance_header_section">
                <IonRow>
                  {(userInfo.balance != undefined && userInfo.balance.balance) ?
                  <IonCol className="top_balance_header_section_col">
                      <span className="rupee_sign">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"/></svg>
                      </span>
                      {userInfo.balance.balance}
                      <div className="avialable_balance_title_section">
                          Available Balance
                      </div>
                  </IonCol>
                  :
                  <IonCol className="top_balance_header_section_col">
                  <span className="rupee_sign">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"/></svg>
                  </span>
                 0
                  <div className="avialable_balance_title_section">
                      Available Balance
                  </div>
              </IonCol>
            }
                  <IonCol className="top_avatar_header_section_col">
                     <div className="user_avatar">
                       <svg  onClick={()=>history.push('/tabs/dashboard/notification')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.379 16.913A6.7 6.7 0 0 1 19 11.788V9c0-3.519-2.614-6.432-6-6.92V1a1 1 0 1 0-2 0v1.08C7.613 2.568 5 5.481 5 9v2.788c0 1.979-.867 3.847-2.388 5.133-.389.333-.612.817-.612 1.329 0 .965.785 1.75 1.75 1.75h16.5c.965 0 1.75-.785 1.75-1.75 0-.512-.223-.996-.621-1.337zM12 24c1.811 0 3.326-1.291 3.674-3H8.326c.348 1.709 1.863 3 3.674 3z"></path></svg>
                       <img onClick={()=>history.push('/tabs/dashboard/my-profile')} src={userInfo.profileImgUrl}/>
                     </div>
                  </IonCol>
                </IonRow>
            </div>
            <div className={isFixedSubHeader ? "top_sub_header_section fixed" : 'top_sub_header_section'}>
                <IonRow className="top_sub_header_row">
                    <IonCol size="2" className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('all',biddingDetailByUserId.bidData)}
                         className={"top_sub_header_menu_text border "+(filterType == 'all' ? 'active' : '')}>
                          ALL
                        </div>
                    </IonCol>
                    <IonCol  size="4"  className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('approved',biddingDetailByUserId.bidData)}
                           className={"top_sub_header_menu_text border "+(filterType == 'approved' ? 'active' : '')}>
                          APPROVED
                        </div>
                    </IonCol>
                    <IonCol  size="3"  className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('notApproved',biddingDetailByUserId.bidData)} 
                          className={"top_sub_header_menu_text border "+(filterType == 'notApproved' ? 'active' : '')}>
                         CANCEL                        
                        </div>
                    </IonCol>
                    <IonCol  size="3"  className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('pending',biddingDetailByUserId.bidData)} 
                         className={"top_sub_header_menu_text "+(filterType == 'pending' ? 'active' : '')}>
                         PENDING                 
                        </div>
                    </IonCol>
                    <IonCol  size="1"></IonCol>
                </IonRow>
            </div>
           </div>
           {(biddingDetailByUserId.loading || bidDataClone == undefined) ? <Loader/> : (bidDataClone.length) ?
                <div className={isFixedSubHeader ? "bidding_list_inner_container_section_bid fixed" : 'bidding_list_inner_container_section_bid'}>
                {bidDataClone.map((bids:any,key)=>(
            
                  <div key={key} className="bidding_list_inner_loop">    
                  {(bids.bidStatus == 'approved') ?         
                   <IonRow>
                       <IonCol onClick={(e)=>openBiddingPage(e,bids)} size="2" className={"bidding_list_inner_col_icon "+(bids.bidStatus == 'approved' ? 'success' : bids.bidStatus == 'pending' ? 'pending' : bids.bidStatus == "notApproved" ? 'cancel' : '')}>
                        <div>
                        {(bids.bidStatus == 'approved' ? 
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="rgb(122, 183, 30)"><path d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z"/><path d="M40 3c20.4 0 37 16.6 37 37S60.4 77 40 77 3 60.4 3 40 19.6 3 40 3m0-1C19 2 2 19 2 40s17 38 38 38 38-17 38-38S61 2 40 2h0z"/></g><path fill="#fff" d="M34 56L20.2 42.2l4.3-4.2 9.5 9.6 24.2-24.2 4.3 4.2z"/></svg>                      
                       : bids.bidStatus == 'pending' ? 
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 4A10.97 10.97 0 0 0 4 15a10.97 10.97 0 0 0 11 11 10.97 10.97 0 0 0 11-11A10.97 10.97 0 0 0 15 4zm6.7 12.8c-.1.4-.5.6-.9.5l-5.6-1.1c-.2 0-.4-.2-.6-.3-.4-.2-.6-.5-.6-.9l.2-8c0-.5.4-.8.8-.8s.8.4.8.8l.1 6.9 5.2 1.8c.5.1.7.6.6 1.1z" fill="rgb(255, 121, 0)"></path></svg>
                         : bids.bidStatus == "notApproved" ? 
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.934 93.934"><path d="M80.178 13.757c-18.341-18.342-48.08-18.342-66.421 0s-18.342 48.08 0 66.421 48.08 18.342 66.421 0 18.342-48.08 0-66.421zm-8.602 47.98l-9.838 9.838-14.771-14.77-14.771 14.77-9.838-9.838 14.77-14.771-14.77-14.771 9.838-9.838 14.771 14.771 14.771-14.771 9.838 9.838-14.77 14.772 14.77 14.77z"/></svg>
                       : '')}
                            </div>                  
                         <span className="status_name_type">{(bids.bidStatus == 'approved' ? 'Approved' : bids.bidStatus == 'pending' ? 'Pending' : bids.bidStatus == "notApproved" ? 'Cancel' : '')}</span>
                       </IonCol>
                       <IonCol onClick={(e)=>openBiddingPage(e,bids)} size="6" className="bidding_list_pick_point_col">
                           <span className="bidding_list_pick_point_text">
                             <span className="pickup_poini_head">
                              Your Pickup Point is
                             </span>
                   
                             <span className="pickup_poini_text">
                               &nbsp;{bids.pickupPoint}
                             </span>
                             <br>
                           </br>
                            <span className="pickup_poini_head">
                              Date is
                             </span>
                   
                             <span className="pickup_poini_text">
                               &nbsp;{_convertUnixToDateTimeFormat(bids.pickupTime)}
                             </span>     
                             </span>
                                      
                       </IonCol>
                      
                       
                       <IonCol onClick={(e)=>openBiddingPage(e,bids)} size="2" className="bidding_list_icon_col">
                         <div className="rupee_sign_bid_list">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>
                         </div>
                         <span className="bid_price">
                         {bids.amount}
                         </span>
                       </IonCol>
                       <IonCol size="2" className="bidding_list_icon_col_button">
                         <button onClick={(e)=>setStartStopTrip(e,bids)}
                         className={"start_trip_button "+((bids.startStopTripMessage && bids.startStopTripMessage == 'pending') ? 'start' : (bids.startStopTripMessage && bids.startStopTripMessage == 'start') ? 'stop' :(bids.startStopTripMessage && bids.startStopTripMessage == 'stop') ? 'end' : 'start')}>
                           {bids.startStopTripMessage && bids.startStopTripMessage == 'pending' ? 'Start' :(bids.startStopTripMessage && bids.startStopTripMessage == 'start') ? 'Stop' : (bids.startStopTripMessage && bids.startStopTripMessage == 'stop') ? 'End' : 'Start'}
                         </button>
                       </IonCol>
                  </IonRow>
                :
                <IonRow onClick={(e)=>openBiddingPage(e,bids)}>
                       <IonCol size="2" className={"bidding_list_inner_col_icon "+(bids.bidStatus == 'approved' ? 'success' : bids.bidStatus == 'pending' ? 'pending' : bids.bidStatus == "notApproved" ? 'cancel' : '')}>
                        <div>
                        {(bids.bidStatus == 'approved' ? 
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="rgb(122, 183, 30)"><path d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z"/><path d="M40 3c20.4 0 37 16.6 37 37S60.4 77 40 77 3 60.4 3 40 19.6 3 40 3m0-1C19 2 2 19 2 40s17 38 38 38 38-17 38-38S61 2 40 2h0z"/></g><path fill="#fff" d="M34 56L20.2 42.2l4.3-4.2 9.5 9.6 24.2-24.2 4.3 4.2z"/></svg>                      
                       : bids.bidStatus == 'pending' ? 
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 4A10.97 10.97 0 0 0 4 15a10.97 10.97 0 0 0 11 11 10.97 10.97 0 0 0 11-11A10.97 10.97 0 0 0 15 4zm6.7 12.8c-.1.4-.5.6-.9.5l-5.6-1.1c-.2 0-.4-.2-.6-.3-.4-.2-.6-.5-.6-.9l.2-8c0-.5.4-.8.8-.8s.8.4.8.8l.1 6.9 5.2 1.8c.5.1.7.6.6 1.1z" fill="rgb(255, 121, 0)"></path></svg>
                         : bids.bidStatus == "notApproved" ? 
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.934 93.934"><path d="M80.178 13.757c-18.341-18.342-48.08-18.342-66.421 0s-18.342 48.08 0 66.421 48.08 18.342 66.421 0 18.342-48.08 0-66.421zm-8.602 47.98l-9.838 9.838-14.771-14.77-14.771 14.77-9.838-9.838 14.77-14.771-14.77-14.771 9.838-9.838 14.771 14.771 14.771-14.771 9.838 9.838-14.77 14.772 14.77 14.77z"/></svg>
                       : '')}
                            </div>                  
                         <span className="status_name_type">{(bids.bidStatus == 'approved' ? 'Approved' : bids.bidStatus == 'pending' ? 'Pending' : bids.bidStatus == "notApproved" ? 'Cancel' : '')}</span>
                       </IonCol>
                       <IonCol size="4" className="bidding_list_pick_point_col">
                           <span className="bidding_list_pick_point_text">{bids.pickupPoint}</span>
                           <br>
                           </br>
                           <span className="bidding_list_pick_point_time">{_convertUnixToDateTimeFormat(bids.pickupTime,'DD MMMM')}</span>                    
                       </IonCol>
                       <IonCol size="4"  className="bidding_list_pick_point_col">
                       <span className="bidding_list_pick_point_text">{bids.dropPoint}</span>
                           <br>
                           </br>
                           <span className="bidding_list_pick_point_time">{_convertUnixToDateTimeFormat(bids.pickupTime,'HH:mm')}</span>      
                       </IonCol>
                       <IonCol size="2" className="bidding_list_icon_col">
                         <div className="rupee_sign_bid_list">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>
                         </div>
                         <span className="bid_price">
                         {bids.amount}
                         </span>
                       </IonCol>
                  </IonRow>
                }
                 </div>
         
                ))}
           </div>
           :
            <div className="no_data_found">
              <NoDataFound/>
            </div>
           }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BiddingListPage;