
import React,{useEffect,useState} from 'react';
import { IonPage, IonRow,IonCol, IonContent } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './ProfilePage.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch,useSelector,RootStateOrAny } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import NoDataFound from '../../components/NoDatFound/NoDataFound';
import { actionToGetBidByUserId } from '../../actions/BiddingAction';
import { actionToGetUserCar } from '../../actions/UserAction';

const ProfilePage: React.FC<RouteComponentProps> = ({match,history}) => {

  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const {loading,cars} = useSelector((state:RootStateOrAny) => state.carData);
  const biddingDetailByUserId = useSelector((state:RootStateOrAny) => state.biddingDetailByUserId);
  const [isFixedSubHeader,setIsFixedSubHeader] = useState(false);
  const dispatch = useDispatch();

  const hrederTitle = () =>{
    return 'My Profile';
  }
  const scrollProfileContent = (e:any) =>{
     if(e.detail.scrollTop > 175){
      setIsFixedSubHeader(true);
     }else{
      setIsFixedSubHeader(false);
     }
  }
  useEffect(()=>{
    dispatch(actionToGetUserCar(userInfo.phone,0));
  },[])
  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
      <IonContent  scrollEvents={true} onIonScroll={scrollProfileContent}>
         <div className="profle_page_contailer_section">
            <IonRow>
                <IonCol className="profile_page_img_section_col">
                   <img src={userInfo.profileImgUrl}/>
                   <br></br>
                   <br></br>
                   <span>{userInfo.name}</span>
                   <br></br>
                   {(userInfo.balance != undefined && userInfo.balance.balance != undefined && userInfo.balance.balance) ?
                      <span className="profile_page_rupee_sign">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"/></svg>
                      </span>
                      : ''
                      }
                    <span className="profile_page_pending_balance">{(userInfo.balance != undefined && userInfo.balance.balance != undefined && userInfo.balance.balance) ? userInfo.balance.balance : ''}</span>
                </IonCol>
                <IonCol onClick={()=>history.push('/tabs/bidding-list')}  className="profle_page_second_section_col">
                    <span className="my_bid_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M0 88h56v8H0zm48-8.065a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4V84h40zm6.426-32.704a27.906 27.906 0 0 0-4.639 6.674l32.924 32.924a4 4 0 0 0 5.656 0l5.657-5.657a4 4 0 0 0 0-5.657L61.1 42.6a27.263 27.263 0 0 0-6.674 4.631zM34.627 27.432a34.686 34.686 0 0 1-10.34 6.629l20.674 20.674A35.253 35.253 0 0 1 51.6 44.4a34.715 34.715 0 0 1 10.34-6.63L41.265 17.1a35.282 35.282 0 0 1-6.638 10.332z"></path><rect height="40" rx="4" transform="matrix(.707 -.707 .707 .707 4.201 48.034)" width="16" x="52.083" y="-1.054"></rect><rect height="40" rx="4" transform="matrix(.707 -.707 .707 .707 -29.74 33.976)" width="16" x="18.142" y="32.887"></rect></svg>
                    </span>
                    <br></br>
                    <span className="total_bid_and_booking">
                       My Bids
                    </span>
                    <br></br>
                    <span className="total_bid_and_booking_value">
                         {(biddingDetailByUserId.bidData.length)}
                    </span>
                </IonCol>
            </IonRow>
         </div>
         <div className="profile_page_registered_car_container_section">
             <div 
                 className={isFixedSubHeader ? "register_title fixed" : "register_title"}> 
                Registered Vechiles with <span>WECABS</span>
             </div>
             <div 
              className={isFixedSubHeader ? "profile_page_registered_cars fixed" : "profile_page_registered_cars"}>
             <br></br>
             <>
             {(loading) ? <Loader/> : (cars != undefined && cars.length) ? 
               <>
               {cars.map((car:any,key:any)=>(
                  <div key={key} className="border profile_page_registered_cars_loop_section active">
                  <div className="car_card_header">
                      {car.carDetails.rcno} <span>{car.carDetails.name}</span>
                  </div>
                  <div className="car_detail_section">
                 
                     <div  className="car_section_title_div">
                         <span className="car_section_title_text">RC NO - </span>
                         <span className="car_section_title_text_value"> {car.carDetails.rcno}</span>
                     </div>
                     <div  className="car_section_title_div">
                         <span className="car_section_title_text">CHASIS NO - </span>
                         <span className="car_section_title_text_value"> {car.carDetails.chasis}</span>
                     </div>
                     <div  className="car_section_title_div">
                         <span className="car_section_title_text">DRIVER LICENSE NO - </span>
                         <span className="car_section_title_text_value"> {car.carDetails.licenseNo}</span>
                     </div>
                     <div  className="car_section_title_div">
                         <span className="car_section_title_text">VECHIL REGISRTED  ADDRESS</span>
                         <span className="car_section_title_text_value_address">{car.carDetails.vichelAddress}</span>
                     </div>
                     <div  className="car_section_title_div">
                         <span className="car_section_title_text">VICHEL ORIGINAL PHOTO</span>
                         <br></br>
                         <br></br>
                         {(car.carDetails.images != undefined) ? 
                            <img src={car.carDetails.images[0]}></img>
                            :
                            <img src={car.carPlate}></img>
                         }
                     </div>
                  </div>
              </div>
              ))}
              <br></br>
              </>
                :
                <div className="no_car_data_found_div_section">
                 <NoDataFound/>
                </div>
              }
              </>
          </div>            
         </div>
       </IonContent>    
    </IonPage>
  );
};

export default ProfilePage;