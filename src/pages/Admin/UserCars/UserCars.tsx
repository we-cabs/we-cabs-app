import { IonPage,IonRow,IonCol, IonGrid, IonContent } from '@ionic/react';
import React from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './UserCars.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import Loader from '../../../components/Loader/Loader';
import car from '../../../img/2021-03-25_22h59_05.png';


const UserCars: React.FC<RouteComponentProps> = ({match, history}) => {
    const {loading,carData} = useSelector((state:RootStateOrAny) => state.selectedUserCarData);


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
                         <svg xmlns="http://www.w3.org/2000/svg" className="down_arrow" viewBox="0 0 451.847 451.847"><path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"/><defs/></svg>
                         <svg xmlns="http://www.w3.org/2000/svg"  className="left_arrow" viewBox="0 0 492 492"><path d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024s-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864s13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z"/><defs/></svg>
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
                            <img src={cars.carPlate}></img>
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
             
        </IonContent>
        </IonPage>
    );
  }

export default UserCars;