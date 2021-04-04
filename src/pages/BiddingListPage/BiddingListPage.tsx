import React,{useEffect,useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './BiddingListPage.css';
import { actionToGetBookingData } from '../../actions/BookingAction';
import { actionToGetUserCar } from '../../actions/UserAction';
import Loader from '../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import { _convertUnixToDateTimeFormat } from '../../hooks/DateTimeConverter';

const BiddingListPage: React.FC<RouteComponentProps> = ({history}) => {
  const dispatch = useDispatch();


  const openTripBookingPage = (e:any,type:string) =>{
    e.preventDefault();
    history.push(`/tabs/dashboard/tripbooking/${type}`);
  }
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const {loading,bidData} = useSelector((state:RootStateOrAny) => state.biddingDetailByUserId);
  const [bidDataClone,setBidDataClone] = useState([]);
  const [filterType,setFilterType] = useState('all');

  const filterAllBidDataByStatus = (type:any) =>{
    setFilterType(type);
    let filterBidData = cloneDeep(bidData);
    console.log('filterBidData',filterBidData)
    let data:any = [];
    if(type != 'all'){
      filterBidData.map((bid:any)=>{
        if(bid.status == type){
          data.push(bid);
        }
      })
      setBidDataClone(data);
    }else{
      setBidDataClone(filterBidData);
    }
  }

  useEffect(()=>{
    if(bidData != undefined && bidData.length){
        setBidDataClone(cloneDeep(bidData));
    } 
  },[bidData])
  
  return (
    <IonPage>
      <HeaderComponent title="My Bid List"/>
      <IonContent className="hide_overflow">
        <div className="inner_contant_container">
        <div className="top_bidding_header_section">
            <div className="top_balance_header_section">
                <IonRow>
                  <IonCol className="top_balance_header_section_col">
                      <span className="rupee_sign">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"/></svg>
                      </span>
                      2300
                      <div className="avialable_balance_title_section">
                          Available Balance
                      </div>
                  </IonCol>
                  <IonCol className="top_avatar_header_section_col">
                     <div className="user_avatar">
                       <svg viewBox="0 0 512 512"><path d="M467.812 431.851l-36.629-61.056c-16.917-28.181-25.856-60.459-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04V42.667C298.66 19.136 279.524 0 255.993 0s-42.667 19.136-42.667 42.667V80.96C151.716 99.371 106.66 156.48 106.66 224v53.483c0 32.853-8.939 65.109-25.835 93.291L44.196 431.83c-1.984 3.307-2.027 7.403-.128 10.752s5.419 5.419 9.259 5.419H458.66c3.84 0 7.381-2.069 9.28-5.397s1.835-7.468-.128-10.753zm-278.997 37.482C200.847 494.464 226.319 512 255.993 512s55.147-17.536 67.179-42.667H188.815z"></path></svg>                
                       <img src={userInfo.profileImgUrl}/>
                     </div>
                  </IonCol>
                </IonRow>
            </div>
            <div className="top_sub_header_section">
                <IonRow className="top_sub_header_row">
                    <IonCol size="2" className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('all')}
                         className={"top_sub_header_menu_text border "+(filterType == 'all' ? 'active' : '')}>
                          ALL
                        </div>
                    </IonCol>
                    <IonCol  size="4"  className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('approved')}
                           className={"top_sub_header_menu_text border "+(filterType == 'approved' ? 'active' : '')}>
                          APPROVED
                        </div>
                    </IonCol>
                    <IonCol  size="3"  className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('notApproved')} 
                          className={"top_sub_header_menu_text border "+(filterType == 'notApproved' ? 'active' : '')}>
                         CANCEL                        
                        </div>
                    </IonCol>
                    <IonCol  size="3"  className="top_sub_header_col">
                        <div onClick={()=>filterAllBidDataByStatus('')} 
                         className={"top_sub_header_menu_text "+(filterType == '' ? 'active' : '')}>
                         PENDING                 
                        </div>
                    </IonCol>
                    <IonCol  size="1"></IonCol>
                </IonRow>
            </div>
           </div>
           {(loading) ? <Loader/> : (bidDataClone != undefined && bidDataClone.length) ?
           <div className="bidding_list_inner_container_section">
                {bidDataClone.map((bids:any,key)=>(
                  <div key={key} className="bidding_list_inner_loop">
                  <IonRow>
                       <IonCol size="4" className="bidding_list_inner_col_icon">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.025 19.707" fill="#4b4b4b"><path d="M21.086 6.925a1.14 1.14 0 0 0-.3.042l-1.07.295-1.134-2.754a2.61 2.61 0 0 0-2.233-1.5H15.6V.728A.73.73 0 0 0 14.872 0H7.156a.73.73 0 0 0-.728.728v2.283H5.66a2.61 2.61 0 0 0-2.233 1.5L2.3 7.258l-1.056-.291c-.098-.027-.199-.041-.3-.042-.259-.003-.508.101-.687.289s-.272.441-.257.7v.585c.001.67.543 1.212 1.213 1.213h.078l-.161.393a9.1 9.1 0 0 0-.571 2.894v5.495c.001.67.543 1.212 1.213 1.213H3.23c.67-.001 1.212-.543 1.213-1.213v-1.35h13.124v1.35c.001.67.543 1.212 1.213 1.213h1.458c.67-.001 1.212-.543 1.213-1.213V13a9.1 9.1 0 0 0-.571-2.894l-.161-.393h.093c.67-.001 1.212-.543 1.213-1.213v-.585c.016-.258-.076-.511-.254-.699s-.426-.293-.685-.291zM13.936.97c0-.016.013-.029.029-.029h.561c.016 0 .029.013.029.029v2.018c-.001.009-.005.017-.013.022h-.593c-.008-.005-.012-.013-.013-.022zM9.915.941h.674c.017.001.033.011.04.027l.8 2.01.733-.907c.01-.014.01-.033 0-.047l-.7-1.059c-.009-.013 0-.024.013-.024h.625c.018.001.034.01.044.025l.363.588c.022.01.028.006.03 0L12.9.966c.01-.015.026-.024.044-.025h.623c.016 0 .022.011.013.024l-.7 1.059c-.01.014-.01.033 0 .047l.746.923-.662.016c-.008-.004-.016-.01-.021-.018l-.41-.656c-.022-.01-.028-.006-.031 0l-.409.656c-.005.008-.013.014-.021.018h-1.246a.04.04 0 0 1-.019-.021l-.137-.421c-.006-.016-.021-.027-.038-.028h-.764c-.017.001-.032.011-.039.027l-.148.421c-.004.009-.01.016-.019.021h-.6L9.878.967c.007-.014.021-.024.037-.026zM7.943 2.989v-1.6c0-.016-.013-.029-.029-.029H7.24c-.016 0-.029-.013-.029-.029V.974c0-.016.013-.029.029-.029h2.029c.016 0 .029.013.029.029v.357c0 .016-.013.029-.029.029h-.678c-.016 0-.029.013-.029.029v1.6c-.001.009-.005.017-.013.022h-.593c-.008-.005-.013-.013-.013-.022zM3.155 9.036l1.718-4.185a1.57 1.57 0 0 1 1.339-.9H15.8a1.57 1.57 0 0 1 1.339.9l1.718 4.185c.113.199.105.445-.022.635s-.351.293-.578.265h-14.5c-.228.029-.452-.073-.579-.264s-.136-.437-.023-.636zm3.881 5.39a.49.49 0 0 1-.485.485H3.272a.49.49 0 0 1-.485-.485V12.87a.49.49 0 0 1 .485-.485h3.279a.49.49 0 0 1 .485.485v1.556zm12.155 0a.49.49 0 0 1-.485.485h-3.279a.49.49 0 0 1-.485-.485V12.87a.49.49 0 0 1 .485-.485h3.279a.49.49 0 0 1 .485.485zm-8.695-12.3c.021-.014.022-.021.018-.027l-.242-.558c-.006-.015-.017-.015-.024 0l-.256.559c.004.024.01.027.017.026z"></path></svg>
                         <br>
                         </br>
                         <span>{bids.tripType}</span>
                       </IonCol>
                       <IonCol size="4" className="bidding_list_pick_point_col">
                           <span className="bidding_list_pick_point_text">{bids.pickupPoint}</span>
                           <br>
                           </br>
                           <span className="bidding_list_pick_point_time">{_convertUnixToDateTimeFormat(bids.pickupTime,'DD MMM YYYY')}</span>                    
                       </IonCol>
                       <IonCol className="bidding_list_pick_point_col">
                       <span className="bidding_list_pick_point_text">{bids.dropPoint}</span>
                           <br>
                           </br>
                           <span className="bidding_list_pick_point_time">{_convertUnixToDateTimeFormat(bids.pickupTime,'HH:mm a')}</span>      
                       </IonCol>
                       <IonCol size="1" className="bidding_list_icon_col">
                         {(bids.status == "" || bids == "pending") ? 
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><path d="M61.44 0c33.93 0 61.44 27.51 61.44 61.44s-27.51 61.44-61.44 61.44S0 95.37 0 61.44 27.51 0 61.44 0h0zm-7.22 37.65c0-9.43 14.37-9.44 14.37.02v25.75l16.23 8.59c.08.04.16.09.23.15l.14.1c7.54 4.94.53 16.81-7.53 12.15l-.03-.02-19.64-10.52c-2.3-1.23-3.79-3.67-3.79-6.29h.01l.01-29.93z" fill-rule="evenodd" fill="#ff7900"/></svg>
                          
                           :(bids == "approved") ?

                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path d="M21 10.499c0 5.799-4.701 10.5-10.5 10.5S0 16.298 0 10.499s4.701-10.5 10.5-10.5S21 4.7 21 10.499zm-11.715 5.56l7.79-7.79c.127-.127.199-.299.199-.479s-.071-.352-.199-.479l-.958-.958c-.127-.127-.299-.199-.479-.199s-.352.071-.479.199l-6.353 6.353-2.969-2.969c-.127-.127-.299-.199-.479-.199s-.352.071-.479.199l-.958.958c-.127.127-.199.299-.199.479s.071.352.199.479l4.4 4.4c.127.127.299.199.479.199s.352-.071.479-.199z" fill="#7ab71e"/></svg>
                         
                          :(bids == "notApproved") ? 
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><circle cx="10.5" cy="10.5" r="10.5" fill="#be0101"/><path d="M15.129 13.399h0l-2.8-2.794 2.8-2.794c.112-.112.112-.295 0-.407l-1.32-1.32a.29.29 0 0 0-.407 0h0l-2.798 2.794-2.793-2.794c-.112-.112-.295-.112-.407 0l-1.32 1.32c-.112.112-.112.295 0 .407h0l2.794 2.794-2.794 2.793c-.112.112-.112.295 0 .407l1.32 1.32c.112.112.295.112.407 0h0l2.793-2.794 2.794 2.794c.112.112.295.112.407 0l1.32-1.32c.112-.112.112-.295 0-.407z" fill="#fff"/></svg>
                          : ''
                        }
                           </IonCol>
                  </IonRow>
              </div>
                ))}
           </div>
           :'No Data Found'}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BiddingListPage;