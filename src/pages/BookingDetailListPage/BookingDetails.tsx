
import React,{useEffect,useState} from 'react';
import { IonPage, IonRow,IonCol, IonButton, IonInput, IonDatetime, IonContent } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './BookingDetails.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import Select from 'react-select';
import { _convertUnixToDateTimeFormat } from '../../hooks/DateTimeConverter';
import { addBiddingBookingData } from '../../actions/BiddingAction';
import Loader from '../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';

interface BookingDetailsProps extends RouteComponentProps<{
  type: string;
}> {}

let filter:any  = {
  carType:'',
  pickupPoint:'',
  dropPoint:'',
  data:'',
};

const BookingDetails: React.FC<BookingDetailsProps> = ({match,history}) => {
  const dispatch = useDispatch();
  const [_pickUpPoint, setPickUpPoint] = useState<any>(null);
  const [_dropDownPoint, setDropDownPoint] = useState<any>(null);
  const [_cabTypeOption, setCabTypeOption] = useState<any>(null);
 

  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  const [bookingClone,setBookingClone] = useState<any>(booking);
  const {pickupCity,dropCity,cabType} = useSelector((state:RootStateOrAny) => state.bookingFilterValues);
 
  const openBiddingPage = (e:any,data:any) =>{
    e.preventDefault();
    dispatch(addBiddingBookingData(data));
    history.push(`/tabs/dashboard/bidding`);
  }

  const hrederTitle = () =>{
    return 'Available Bookings';
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

  useEffect(()=>{
   if(booking != undefined && booking.length){
    setBookingClone(cloneDeep(booking));
   }
  },[]);

  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
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
             {(loading) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(bookingClone.length) ? 
             <>
             {bookingClone.map((data:any,i:number)=>(
               <div key={i} className="booking_detail_container loop">
                  <div className="booking_detail_box">
                  <IonRow>
                  <IonCol size="5">
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
                    </IonCol>
                    <IonCol>
                    <div className="booking_title_left">
                        <span className="booking_detail_op">{data.pickupPoint}</span>
                        <span onClick={(e)=>openBiddingPage(e,data)} className="bidding_list_button">Bid Now</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">{data.dropPoint}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">{data.carType}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">{_convertUnixToDateTimeFormat(data.pickupTime,"MMM DD")}</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div> 
                </div>
              ))} 
              </>  
              : 
              'No Booking Data'
              }  
              </>  
                   
             }      
              </IonCol>
           </IonRow>
           </div>
       </IonContent>
    </IonPage>
  );
};

export default BookingDetails;