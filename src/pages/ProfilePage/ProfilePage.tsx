
import React,{useEffect} from 'react';
import { IonPage, IonRow,IonCol, IonContent } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './ProfilePage.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useSelector,RootStateOrAny } from 'react-redux';
import car from '../../img/2021-03-25_22h59_05.png';
import Loader from '../../components/Loader/Loader';

const ProfilePage: React.FC<RouteComponentProps> = ({match,history}) => {

  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const {loading,cars} = useSelector((state:RootStateOrAny) => state.carData);

  const hrederTitle = () =>{
    return 'My Profile';
  }
  useEffect(()=>{

  },[])
  
  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
      <IonContent className="hide_overflow">
         <div className="profle_page_contailer_section">
            <IonRow>
                <IonCol className="profile_page_img_section_col">
                   <img src={userInfo.profileImgUrl}/><br></br><br></br>
                   <span>{userInfo.name}</span>
                </IonCol>
                <IonCol className="profle_page_second_section_col">
                    <span className="total_bid_and_booking">
                       My Total Booking
                    </span><br></br>
                    <span className="total_bid_and_booking_value">
                        15
                    </span><br></br>
                    <span className="total_bid_and_booking">
                       My Bids
                    </span><br></br>
                    <span className="total_bid_and_booking_value">
                         5
                    </span>
                </IonCol>
            </IonRow>
         </div>
         <div className="profile_page_registered_car_container_section">
             <div className="register_title"> 
                Registered Vechiles with <span>WECABS</span>
             </div>
             <div className="profile_page_registered_cars">
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
                         <span className="car_section_title_text">VICHEL ORIGINAL PHOTO</span><br></br><br></br>
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
                 No Car Data Found
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