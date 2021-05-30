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
import moment from 'moment';
import NoDataFound from '../../components/NoDatFound/NoDataFound';

interface BookingDetailsProps extends RouteComponentProps<{
  type: string;
}> {}

let filter:any  = {
  carType:'',
  pickupPoint:'',
  dropPoint:''
};

const BookingDetails: React.FC<BookingDetailsProps> = ({match,history}) => {
  const dispatch = useDispatch();
  const selectedTripType = match.params.type;

  const [_pickUpPoint, setPickUpPoint] = useState<any>(null);
  const [_dropDownPoint, setDropDownPoint] = useState<any>(null);
  const [_cabTypeOption, setCabTypeOption] = useState<any>(null);
  const [_dateFilterOption, setDateFilterOption] = useState<any>(null);
  const [isFixedSubHeader,setIsFixedSubHeader] = useState(false);
 

  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  const [bookingClone,setBookingClone] = useState<any>(booking);
  const [showHideBookingFilter,setShowHideBookingFilter] = useState(false);
  const {pickupCity,dropCity,cabType} = useSelector((state:RootStateOrAny) => state.bookingFilterValues);
 
  const openBiddingPage = (e:any,data:any) =>{
    e.preventDefault();
    dispatch(addBiddingBookingData(data));
    history.push(`/tabs/dashboard/bidding`);
  }
  const scrollProfileContent = (e:any) =>{
    if(e.detail.scrollTop > 1){
      setIsFixedSubHeader(true);
      }else{
      setIsFixedSubHeader(false);
      }
      if(showHideBookingFilter)
       setShowHideBookingFilter(false);
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
    if(value && value != null){
      if(type == 'dateFilter'){
        setDateFilterOption(value);
      }
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
        if(type == 'dateFilter'){
          if(moment(value).format('YYYY/MM/DD') == moment(item.pickupTime).format('YYYY/MM/DD')){
            if(selectedTripType.toLowerCase() == item.tripType.toLowerCase() && item.status != 'cancel'){
              newBooking.push(item);
            }
          }
        }else{
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
          {}
          else{
            if(selectedTripType.toLowerCase() == item.tripType.toLowerCase() && item.status != 'cancel'){
              newBooking.push(item);
            }
          }
        }
      }
      });
      setBookingClone(newBooking);
    }
  }

  const clearAllFilterValue = () =>{
    filter = {
      carType:'',
      pickupPoint:'',
      dropPoint:'',
    };
    setPickUpPoint(null);
    setDropDownPoint(null);
    setCabTypeOption(null);
    setDateFilterOption(null);
    setBookingClone(booking);
  }

  useEffect(()=>{
    if(booking != undefined && booking.length){
      let bookingData = [];
      for(let i = 0;i < booking.length;i++){
        let data = booking[i];
        if(selectedTripType.toLowerCase() == data.tripType.toLowerCase() && data.status != 'cancel'){
          bookingData.push(data);
        }
      }
     setBookingClone(cloneDeep(bookingData));
    }
   },[]);
   useEffect(()=>{
    if(booking != undefined && booking.length){
      let bookingData = [];
      for(let i = 0;i < booking.length;i++){
        let data = booking[i];
        if(selectedTripType.toLowerCase() == data.tripType.toLowerCase() && data.status != 'cancel'){
          bookingData.push(data);
        }
      }
     setBookingClone(cloneDeep(bookingData));
    }
   },[booking]);

  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
       <IonContent scrollEvents={true} onIonScroll={scrollProfileContent}>
       {(booking != undefined && booking.length) ? 
        <div className={isFixedSubHeader ? "booking_filter_class fixed" : 'booking_filter_class'}>
        <IonRow onClick={()=>setShowHideBookingFilter(!showHideBookingFilter)} className="find_booking_section">
          <IonCol size="10"><span>Filter your Booking</span></IonCol>
          <IonCol size="2">
          {(!showHideBookingFilter) ? 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.846 451.847"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284a31.53 31.53 0 0 1 9.262 22.366c0 8.099-3.091 16.196-9.267 22.373z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.847 451.847"><path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"/></svg>
            }
          </IonCol>
          </IonRow>
            {(showHideBookingFilter) ? 
           <div className={"filter_section_input"}>
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
                <IonDatetime onIonChange={(e)=>{e.stopPropagation(); e.preventDefault(); applyFilterInBookingList('dateFilter',e.detail.value)}} value={_dateFilterOption} className="filter_popup_date" placeholder="Date" displayFormat="MMM DD"  displayTimezone="utc"/>
                  <div className="calender_filter_hr"></div>
                  <div className="calender_filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V100c0-33.084-26.916-60-60-60zm20 412c0 11.028-8.972 20-20 20H60c-11.028 0-20-8.972-20-20V188h432v264zm0-304H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48zM76 230h40v40H76zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zM76 310h40v40H76zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zM76 390h40v40H76zm80 0h40v40h-40zm80 0h40v40h-40zm80 0h40v40h-40zm80-80h40v40h-40z"/></svg>
                  </div>
              </IonCol>
            </IonRow>
            <IonRow>
               <IonCol className="filter_search_button_col">
                <button onClick={()=>clearAllFilterValue()}             
                 className="filter_search_button">
                  CLEAR
                </button>
              </IonCol>
            </IonRow>
            </div>  
            :''}
        </div> 
        :''}
        <div className="booking_detail_list_scroll">
           <IonRow>
             <IonCol>
             {(loading || bookingClone == undefined) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(bookingClone != undefined && bookingClone.length) ? 
             <>
             {bookingClone.map((data:any,i:number)=>(
               (!data.allottedBidId) ?
               <div key={i} className="booking_detail_container loop">
                  <div className="booking_detail_box">
                  <IonRow>
                  {/* <IonCol size="2">
                      <div className="booking_sudo_profile_div">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.532 45.532"><path d="M22.766.001A22.77 22.77 0 0 0 0 22.766a22.77 22.77 0 0 0 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 0 15.06 7.53 7.53 0 1 1 0-15.06zm-.005 32.771c-4.149 0-7.949-1.511-10.88-4.012a3.21 3.21 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.7 16.7 0 0 1-10.881 4.013z"/></svg>
                      </div>
                    </IonCol> */}
                  <IonCol size="6">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup: </span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop: </span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Date & Time:</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Car Type:</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Current Bid:</span>
                      </div>
                    </IonCol>
                    <IonCol  size="6">
                    <div className="booking_title_left">
                        <span className="booking_detail_op">{data.pickupPoint}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">{data.dropPoint}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">{moment(new Date(data.pickupTime)).utc().format("DD MMM, hh:mm")}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">{data.carType}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_detail_op">1200</span>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                     <IonCol className="bid_action_column_section" size="6">
                       <button className="bid_ammount_max_price_button">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>
                         {data.basePrice}
                         </button>
                    </IonCol>
                    <IonCol className="bid_action_column_section" size="6">
                       <button onClick={(e)=>openBiddingPage(e,data)} className="make_bid_button">Make Bid</button>
                    </IonCol>
                  </IonRow>
                </div> 
                </div>
               :''
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
         </div>
       </IonContent>
    </IonPage>
  );
};

export default BookingDetails;