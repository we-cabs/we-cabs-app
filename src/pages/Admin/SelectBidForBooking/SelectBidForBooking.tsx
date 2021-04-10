
import React,{useEffect,useState} from 'react';
import { IonPage, IonRow,IonCol, IonButton, IonInput, IonDatetime, IonContent, IonAlert } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './SelectBidForBooking.css';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import Select from 'react-select';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import NoDataFound from '../../../components/NoDatFound/NoDataFound';
import { actionToGetBidingDataByBooking, actionToUpdateBooking } from '../../../actions/BookingAction';
import Loader from '../../../components/Loader/Loader';

interface SelectBidForBookingProps extends RouteComponentProps<{
  type: string;
}> {}

let filter:any  = {
  carType:'',
  pickupPoint:'',
  dropPoint:'',
  data:'',
};

const SelectBidForBooking: React.FC<SelectBidForBookingProps> = ({match,history}) => {
  const dispatch = useDispatch();
  const [_pickUpPoint, setPickUpPoint] = useState<any>(null);
  const [_dropDownPoint, setDropDownPoint] = useState<any>(null);
  const [_cabTypeOption, setCabTypeOption] = useState<any>(null);
 
  const [showAlert,setShowAlert] = useState(false);
  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  const [bookingClone,setBookingClone] = useState<any>(booking);
  const {pickupCity,dropCity,cabType} = useSelector((state:RootStateOrAny) => state.bookingFilterValues);
  
  const [actionBooking,setActionBookingId] = useState('');

  const hrederTitle = () =>{
    return 'Bookings';
  }

  const searchListPickupCity = pickupCity.map((val:any) => {
    return{ 
     value: val, 
     label: val 
    }
   }
  );

  const searchListDropCity = dropCity.map((val:any) => {
    return{ 
     value: val, 
     label: val 
    }
   }
  );

  const searchCabList = cabType.map((val:any) => {
    return{ 
     value: val, 
     label: val 
    }
   }
  );

  const applyFilterInBookingList = (type:string,value:any) =>{

    if(type == 'pickupPoint'){
      filter.pickupPoint = value.value;
      setPickUpPoint(value);
    }
    if(type == 'dropPoint'){
      filter.dropPoint = value.value;
      setDropDownPoint(value);
    }
    if(type == 'carType'){
      filter.carType = value.value;
      setCabTypeOption(value);
    }
      let newBooking:any[] = [];
      booking.map(function(item:any) {
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
          {}
          else
            newBooking.push(item);
        }
      });
      console.log(newBooking);
      setBookingClone(newBooking);
  }

  const clearAllFilterValue = () =>{
    filter = {
      carType:'',
      pickupPoint:'',
      dropPoint:'',
      data:'',
    };
    setPickUpPoint(null);
    setDropDownPoint(null);
    setCabTypeOption(null);
    setBookingClone(booking);
  }
  
  
    const callActionToCancelBooking = (bookingId:any) =>{
    setShowAlert(false);
    let payload:any = cloneDeep(actionBooking);
    payload.status = 'cancel';
    dispatch(actionToUpdateBooking(payload));
  }

  const callActionToGetBidingDataByBooking = (bookingData:any) =>{
    dispatch(actionToGetBidingDataByBooking(bookingData));
    history.push(`/tabs/dashboard/booking-bids/${JSON.stringify(bookingData)}`);
  }

  useEffect(()=>{
   if(booking != undefined && booking.length){
    setBookingClone(cloneDeep(booking));
   }
  },[]);

  return (
    <IonPage>
      <AdminSubHeader title={"Bookings"}/>
      <IonContent className="hide_overflow">
      <div className="booking_filter_class">
          <div className="find_booking_section"><span>Find your Booking</span><span className="booking_hr"></span></div>
          <div className="filter_section_input">
            <IonRow>
              <IonCol size="6">
              <Select
                value={_pickUpPoint}
                options={searchListPickupCity}
                isSearchable
                onChange={(e)=>applyFilterInBookingList('pickupPoint',e)}
                placeholder= "Pickup Point"
                openMenuOnClick={false}
              />
            </IonCol>
              <IonCol size="6">
              <Select
                value={_dropDownPoint}
                options={searchListDropCity}
                onChange={(e)=>applyFilterInBookingList('dropPoint',e)}
                isSearchable
                placeholder= "Drop Point"
                openMenuOnClick={false}
              />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
              <Select
                value={_cabTypeOption}
                options={searchCabList}
                onChange={(e)=>applyFilterInBookingList('carType',e)}
                isSearchable
                placeholder= "Cab Type"
                openMenuOnClick={false}
              />
              </IonCol>
              <IonCol size="6">
                <IonDatetime className="filter_popup_date" placeholder="Date" displayFormat="MMM DD" display-timezone="utc"></IonDatetime>
                  <div className="calender_filter_hr"></div>
                  <div className="calender_filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V100c0-33.084-26.916-60-60-60zm20 412c0 11.028-8.972 20-20 20H60c-11.028 0-20-8.972-20-20V188h432v264zm0-304H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48zM76 230h40v40H76zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zM76 310h40v40H76zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zM76 390h40v40H76zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zm80-80h40v40h-40z"/></svg>
                  </div>
              </IonCol>
            </IonRow>
            <IonRow>
               <IonCol className="filter_search_button_col">
                <button onClick={()=>clearAllFilterValue()}
                 disabled={(_pickUpPoint != null || _dropDownPoint != null || _cabTypeOption != null) ? false : true}
                 className="filter_search_button">
                  CLEAR
                </button>
              </IonCol>
            </IonRow>
            </div>  
      </div> 
       <div className="booking_detail_list_scroll">
           <IonRow>
             <IonCol>
             {(loading || bookingClone == undefined) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(bookingClone != undefined && bookingClone.length) ? 
             <>
             {bookingClone.map((data:any,i:number)=>(
               <div key={i} className="booking_detail_container_select loop">
                  <div className="booking_detail_box">
                  <IonRow>
              <IonCol size="6">
                <div className="booking_title_left">
                    <span className="booking_title_op">Pickup: </span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_title_op">Drop: </span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_title_op">Cab Type: </span>                   
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_title_op">Date & Time:</span>
                  </div>
                  <div className="booking_title_left">
                    <div onClick={()=>{setActionBookingId(data); setShowAlert(true)}} className="bidding_list_cancel_button">Cancle Booking {'>'}</div>
                  </div>
                </IonCol>
                <IonCol>
                <div className="booking_title_left">
                    <span className="booking_detail_op">{data.pickupPoint}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{data.dropPoint}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{data.carType}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{moment(new Date(data.pickupTime)).utc().format("DD MMM YYYY")}</span>
                  </div>
                  <div className="booking_title_left">
                    <div onClick={()=>callActionToGetBidingDataByBooking(data)} className="bidding_list_q_button">Bidding List {'>'}</div>
                  </div>
                </IonCol>
              </IonRow>
                </div> 
                </div>
              ))} 
              </>  
              : 
              <div className="no_data_found">
                <NoDataFound/>
              </div>
              }  
              </>  
                   
             }      
              </IonCol>
           </IonRow>
           <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'Are you sure?'}
            message={'You want to cancel this booking.'}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: blah => {
              
                }
              },
              {
                text: 'Okay',
                handler: () => {
                  callActionToCancelBooking(actionBooking);
                }
              }
          ]}
        />
           </div>
       </IonContent>
    </IonPage>
  );
};

export default SelectBidForBooking;