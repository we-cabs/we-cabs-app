import { IonPage,IonRow,IonCol, IonGrid, IonContent, IonSlides, IonSlide } from '@ionic/react';
import React from 'react';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import './UserCars.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import Loader from '../../../components/Loader/Loader';
import car from '../../../img/2021-03-25_22h59_05.png';
import NoDataFound from '../../../components/NoDatFound/NoDataFound';
import { actionToSetCarDataToEdit } from '../../../actions/BookingAction';


const UserCars: React.FC<RouteComponentProps> = ({match, history}) => {
    const {loading,carData} = useSelector((state:RootStateOrAny) => state.selectedUserCarData);
    const dispatch = useDispatch();
    const updateCarDataPage = (car:any) =>{
        dispatch(actionToSetCarDataToEdit(car));
        history.push(`/tabs/dashboard/update-car-data`);
    }

    return (
        <IonPage>
         <AdminSubHeader title={"User Cars"}/>
         <IonContent>
         <div className="profile_page_registered_cars_user_profile">
             <br></br>
             <>
             {(loading) ? <Loader/> : (carData != undefined && carData.length) ? 
               <>
               {carData.map((cars:any,key:any)=>(
                 <div key={key} className="border profile_page_registered_cars_loop_section active">
                     <div className="car_card_header">
                         {cars.carDetails.rcno} <span>{cars.carDetails.name}</span>
                       
                         <span className="edit_section" onClick={()=>updateCarDataPage(cars)}>Edit</span> 
                     </div>
                     <div className="car_detail_section">
                    
                        <div  className="car_section_title_div">
                            <span className="car_section_title_text">RC NO - </span>
                            <span className="car_section_title_text_value"> {cars.carDetails.rcno}</span>
                        </div>
                        <div  className="car_section_title_div">
                            <span className="car_section_title_text">CHASIS NO - </span>
                            <span className="car_section_title_text_value"> {cars.carDetails.chasis}</span>
                        </div>
                        <div  className="car_section_title_div">
                            <span className="car_section_title_text">DRIVER LICENSE NO - </span>
                            <span className="car_section_title_text_value"> {cars.carDetails.licenseNo}</span>
                        </div>
                        <div  className="car_section_title_div">
                            <span className="car_section_title_text">VECHIL REGISRTED  ADDRESS</span>
                            <span className="car_section_title_text_value_address">{cars.carDetails.vichelAddress}</span>
                        </div>
                        <div  className="car_section_title_div">
                            <span className="car_section_title_text">VICHEL ORIGINAL PHOTO</span><br></br><br></br>
                            {(cars.carDetails.images != undefined) ? 
                                  <IonSlides className="image-slider">
                                  {cars.carDetails.images.map((img:any,key:any)=>(
                                    <IonSlide key={key}>
                                      <img src={img} className="thumb-img"/>
                                
                                    </IonSlide>
                                  ))}
                              </IonSlides>   
                                :
                                <img src={cars.carPlate}></img>
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
             
        </IonContent>
        </IonPage>
    );
  }

export default UserCars;