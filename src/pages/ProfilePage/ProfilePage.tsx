
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