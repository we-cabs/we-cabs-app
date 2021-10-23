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
import { Virtuoso } from 'react-virtuoso';

let filter:any  = {
  carType:'',
  pickupPoint:'',
  dropPoint:''
};

const BookingDetails: React.FC<RouteComponentProps> = ({history}) => {
  const dispatch = useDispatch();

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
            if(item.status != 'cancel'){
              newBooking.push(item);
            }
          }
        }else{
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
          {}
          else{
            if(item.status != 'cancel'){
              newBooking.push(item);
            }
          }
        }
      }
      });

      let finalArray:any = [];
      newBooking.map((bookingBid:any)=>{
        if(!bookingBid.allottedBidId && bookingBid.status != 'cancel'){
          finalArray.push(bookingBid);
        }
      })
     
      setBookingClone(finalArray);
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
    let finalArray:any = [];
    booking.map((bookingBid:any)=>{
      if(bookingBid.status != 'cancel' && !bookingBid.allottedBidId){
        finalArray.push(bookingBid);
      }
    })
   

    setBookingClone(finalArray);
  }

  useEffect(()=>{
    if(booking != undefined && booking.length){
      let bookingData = [];
      for(let i = 0;i < booking.length;i++){
        let data = booking[i];
        if(data.status != 'cancel' && !data.allottedBidId){
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
        if(data.status != 'cancel' && !data.allottedBidId){
          bookingData.push(data);
        }
      }
     setBookingClone(cloneDeep(bookingData));
    }
   },[booking]);


   const InnerItem = React.memo(({ index }:any) => {
    const data = bookingClone[index]; 
    return (
      <div className="avialable_booking_main_parent_section_loop">
                  <div className="avialable_booking_main_parent_section_loop_padding">
                  <IonRow className="booking_header_section">
                    <IonCol size="7" className="booking_header_section_right_arrow">
                      {data.tripType.toLowerCase() == 'round' ? 'ROUND TRIP' : 'ONE WAY TRIP'}
                    </IonCol>
                    <IonCol size="5" className="booking_header_section_banner">
                      <div>
                        MIN 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>                   
                        {data.minPrice ? data.minPrice : data.basePrice}
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow className="booking_header_second_location_connect_row">
                    <IonCol size="1">
                      <div className="pick_point_dot">
                         <div className="pick_point_dot_inner"></div>
                      </div>                 
                    </IonCol>
                    <IonCol size="10">
                      <div className="pick_point_inner_line_collection"></div>
                    </IonCol>
                    <IonCol size="1">                  
                      <div className="pick_point_svg_location">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 395.71 395.71"><path d="M197.849 0C122.131 0 60.531 61.609 60.531 137.329c0 72.887 124.591 243.177 129.896 250.388l4.951 6.738c.579.792 1.501 1.255 2.471 1.255a3.08 3.08 0 0 0 2.486-1.255l4.948-6.738c5.308-7.211 129.896-177.501 129.896-250.388C335.179 61.609 273.569 0 197.849 0zm0 88.138c27.13 0 49.191 22.062 49.191 49.191 0 27.115-22.062 49.191-49.191 49.191-27.114 0-49.191-22.076-49.191-49.191 0-27.129 22.076-49.191 49.191-49.191z"/></svg> 
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow className="booking_header_second_location_connect_second_row">
                    <IonCol size="6" className="pick_point_dot_text">
                       {data.pickupPoint}                
                    </IonCol>                   
                    <IonCol size="6" className="pick_point_svg_location_text">                  
                       {data.dropPoint}
                    </IonCol>
                  </IonRow> 
                  <div className="booking_third_row_main_section">
                    <IonRow className="booking_third_row_main_section_first_row grey">
                      <IonCol size="4" className="booking_third_row_main_section_first_col1">
                        <div className="row_svg_rupee_note_icon">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 122.88 63.89"><path d="M0 0h122.88v63.89H0V0zm54.49 21.42h13.9c.11 0 .22.11.22.22v2.14c0 .11-.11.22-.22.22h-4.35a6.29 6.29 0 0 1 1.4 2.8h2.95c.11 0 .22.11.22.22v2.14c0 .11-.11.22-.22.22h-2.95c-.26 1.25-.92 2.4-1.84 3.28-1.18 1.14-2.84 1.84-4.65 1.84h-.18l7.82 8.89c.22.26-.15.77-.33.77l-3.61.04-8.33-9.51c-.07-.07-.07-.18-.07-.29v-3.47h4.72c.85 0 1.62-.33 2.18-.85.22-.22.41-.44.55-.7h-7.23c-.11 0-.22-.11-.22-.22v-2.14c0-.11.11-.22.22-.22h7.23c-.15-.26-.33-.48-.55-.7-.55-.52-1.33-.85-2.18-.85h-4.72v-3.58c0-.11.11-.22.22-.22l.02-.03zm6.93-8.26c10.4 0 18.8 8.41 18.8 18.8 0 10.4-8.41 18.8-18.8 18.8-10.4 0-18.8-8.41-18.8-18.8s8.4-18.8 18.8-18.8zM20.5 9.73h81.7a9.46 9.46 0 0 0 9.44 9.44v25.25a9.46 9.46 0 0 0-9.44 9.44H20.5a9.46 9.46 0 0 0-9.44-9.44V19.17a9.46 9.46 0 0 0 9.44-9.44z" fill-rule="evenodd"/></svg>
                        </div>
                       
                        <div className="rupee_icon_booking">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>
                          {data.basePrice} /-
                        </div>
                      </IonCol>
                      <IonCol size="4" className="booking_third_row_main_section_first_col2">
                        <div className="row_svg_rupee_note_icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 105.19"><path d="M10.17 55.2c-11-5.58-9.72-11.8 1.31-11.15L14 48.68l5-15.83c1.66-5.18 4.25-10 8.83-11.42V5.57A5.58 5.58 0 0 1 33.44 0h56A5.58 5.58 0 0 1 95 5.57V21h1c6.53 0 10.29 5.54 11.87 11.87l3.82 15.35 2.2-4.14c11.34-.66 12.35 5.93.35 11.62l2 3c7.89 8.11 7.15 16.21 5.92 36.24v6.58a3.72 3.72 0 0 1-3.71 3.71h-15.88a3.72 3.72 0 0 1-3.71-3.71v-3H24v3a3.72 3.72 0 0 1-3.71 3.71H4.5a3.72 3.72 0 0 1-3.71-3.71v-8.59a5.46 5.46 0 0 1 0-.58C-.37 77-2.06 63.12 10.17 55.2zM39.57 21h5V9.75h3.66v-4H35.91v4h3.66V21zm8.73 0h5.31l.46-2h4.16l.46 2H64L60 5.75h-7.8L48.3 21zM65 21h5.34L72 17h.23l1.68 4h5.59l-3.28-7.63 3.51-7.62h-5.49L72.5 9.93h-.25l-1.74-4.21h-5.73l3.43 7.77L65 21zm16.92 0h5V5.72h-5V21zm7.72 6.23H33.06c-5 0-7.52 4.31-9 9.05l-4.83 15.89h0 86.82l-3.83-15.92c-1-4.85-4.07-9-9-9zM56 10.56L55 15h2.3l-1-4.42zM30.38 73.43l-14.06-1.77c-3.32-.37-4.21 1-3.08 3.89l1.52 3.69a5.33 5.33 0 0 0 1.9 2.12 6.43 6.43 0 0 0 3.15.87l12.54.1c3 0 4.34-1.22 3.39-4a6.78 6.78 0 0 0-5.36-4.9zm62.12 0l14.06-1.77c3.32-.37 4.21 1 3.08 3.89l-1.52 3.69a5.33 5.33 0 0 1-1.9 2.12 6.43 6.43 0 0 1-3.15.87l-12.54.1c-3 0-4.34-1.22-3.39-4a6.78 6.78 0 0 1 5.36-4.9z" fill-rule="evenodd"/></svg>
                        </div>
                        <div className="rupee_icon_booking">
                          {data.carType}
                        </div>
                      </IonCol>
                      <IonCol size="4" className="booking_third_row_main_section_first_col3">
                        <div className="row_svg_rupee_note_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.363 45.363"><path d="M1.788 16.945a2.07 2.07 0 0 0 1.459.601l27.493-.035v3.831c.003.836.556 1.586 1.329 1.904s1.658.135 2.246-.459l9.091-9.18a2.74 2.74 0 0 0-.009-3.868L34.26.605a2.06 2.06 0 0 0-2.25-.446c-.77.319-1.271 1.074-1.27 1.908V5.9l-27.521.037a2.06 2.06 0 0 0-2.056 2.067l.018 7.483c.001.547.22 1.073.607 1.458zm40.358 10.956l-27.522-.035-.001-3.834a2.06 2.06 0 0 0-3.52-1.462l-9.136 9.135a2.74 2.74 0 0 0-.009 3.866l9.09 9.181c.588.596 1.475.772 2.247.458s1.326-1.066 1.329-1.904v-3.83l27.493.035c.547 0 1.072-.216 1.459-.602a2.07 2.07 0 0 0 .607-1.456l.017-7.483a2.06 2.06 0 0 0-2.054-2.069z"/></svg>
                        </div>
                        <div className="rupee_icon_booking">
                          {data.distance} Km
                        </div>
                      </IonCol>
                    </IonRow>
                    {/* <IonRow className="booking_third_row_main_section_first_row white">
                      <IonCol size="12" className="booking_text_toll_col">
                         Toll &  State Extra<br/> Parking Extra,If applicable
                      </IonCol>
                    </IonRow> */}
                  </div>  
                  <IonRow className="booking_third_row_main_section_second_row">
                    <IonCol size="6" className="booking_text_toll_col">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.01 122.88"><path d="M1.87 14.69h22.66l-.03-.39V4.13C24.5 1.86 26.86 0 29.76 0c2.89 0 5.26 1.87 5.26 4.13V14.3l-.03.39h38.59l-.03-.39V4.13C73.55 1.86 75.91 0 78.8 0s5.26 1.87 5.26 4.13V14.3l-.03.39h24.11c1.03 0 1.87.84 1.87 1.87v19.46c0 1.03-.84 1.87-1.87 1.87H1.87A1.89 1.89 0 0 1 0 36.01V16.55c0-1.03.84-1.86 1.87-1.86h0zm-1.4 27.5h109.08a.46.46 0 0 1 .46.46h0v79.76c0 .25-.21.46-.46.46H.47c-.25 0-.47-.21-.47-.46V42.66a.47.47 0 0 1 .47-.47h0 0zm96.8 10.57h-13.7c-.83 0-1.5.63-1.5 1.4V66.9c0 .77.67 1.4 1.5 1.4h13.71c.83 0 1.51-.63 1.51-1.4V54.16c-.01-.77-.69-1.4-1.52-1.4h0zM12.24 74.93h13.7c.83 0 1.51.63 1.51 1.4v12.74c0 .77-.68 1.4-1.51 1.4H12.71c-.83 0-1.5-.63-1.5-1.4v-13.2c0-.77.68-1.4 1.5-1.4l-.47.46h0zm0 22.18h13.7c.83 0 1.51.63 1.51 1.4v12.74c0 .77-.68 1.4-1.51 1.4H12.7c-.83 0-1.5-.63-1.5-1.4V98.51c0-.77.68-1.4 1.5-1.4h-.46 0zm0-44.35h13.7c.83 0 1.51.63 1.51 1.4V66.9c0 .77-.68 1.4-1.51 1.4H12.7c-.83 0-1.5-.63-1.5-1.4V54.16c0-.77.68-1.4 1.5-1.4h-.46 0zm23.78 0h13.71c.83 0 1.5.63 1.5 1.4V66.9c0 .77-.68 1.4-1.5 1.4H36.02c-.83 0-1.51-.63-1.51-1.4V54.16c0-.77.68-1.4 1.51-1.4h0 0zm0 22.17h13.71c.83 0 1.5.63 1.5 1.4v12.74c0 .77-.68 1.4-1.5 1.4H36.02c-.83 0-1.51-.63-1.51-1.4v-13.2c0-.77.68-1.4 1.51-1.4v.46h0zm0 22.18h13.71c.83 0 1.5.63 1.5 1.4v12.74c0 .77-.68 1.4-1.5 1.4H36.02c-.83 0-1.51-.63-1.51-1.4V98.51c0-.77.68-1.4 1.51-1.4h0 0zm23.77-44.35H73.5c.83 0 1.51.63 1.51 1.4V66.9c0 .77-.68 1.4-1.51 1.4H59.79c-.83 0-1.51-.63-1.51-1.4V54.16c.01-.77.68-1.4 1.51-1.4h0 0zm0 22.17H73.5c.83 0 1.51.63 1.51 1.4v12.74c0 .77-.68 1.4-1.51 1.4H59.79c-.83 0-1.51-.63-1.51-1.4v-13.2c0-.77.68-1.4 1.51-1.4v.46h0zm37.48 0h-13.7c-.83 0-1.5.63-1.5 1.4v12.74c0 .77.67 1.4 1.5 1.4h13.71c.83 0 1.51-.63 1.51-1.4V75.86c0-.77-.68-1.4-1.51-1.4l-.01.47h0zm0 22.18h-13.7c-.83 0-1.5.63-1.5 1.4v12.74c0 .77.67 1.4 1.5 1.4h13.71c.83 0 1.51-.63 1.51-1.4V98.04c0-.77-.68-1.4-1.51-1.4l-.01.47h0zm-37.48 0H73.5c.83 0 1.51.63 1.51 1.4v12.74c0 .77-.68 1.4-1.51 1.4H59.79c-.83 0-1.51-.63-1.51-1.4V98.51c.01-.77.68-1.4 1.51-1.4h0 0zM7.01 47.71h96.92c.52 0 .94.44.94.94v67.77a.97.97 0 0 1-.94.94H6.08c-.5 0-.94-.42-.94-.94V49.58c0-1.03.84-1.87 1.87-1.87h0 0zM78.8 29.4c2.89 0 5.26-1.87 5.26-4.13V15.11l-.03-.41H73.58l-.03.41v10.16c0 2.27 2.36 4.13 5.25 4.13h0 0zm-49.04 0c2.89 0 5.26-1.87 5.26-4.13V15.11l-.03-.41H24.53l-.03.41v10.16c0 2.27 2.36 4.13 5.26 4.13h0z" fill-rule="evenodd"/></svg>
                       Departure
                    </IonCol>
                    <IonCol size="6" className="booking_text_pick_time_col">
                      <div className="booking_text_pick_time_div">
                        {moment(new Date(data.pickupTime)).utc().format("MMM DD,YYYY hh:mm")} 
                      </div>
                    </IonCol>
                  </IonRow>  
                  <IonRow className="booking_third_row_main_section_third_row">
                    <IonCol size="12" className="booking_third_row_book_button">
                      <button onClick={(e)=>openBiddingPage(e,data)} className="make_bid_button">Make Bid</button>
                    </IonCol>
                  </IonRow>            
                  </div>
                  </div>

    );
  })

   
   const itemContent = (index:any) => {
    return <InnerItem index={index} />
  }


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
             <Virtuoso totalCount={bookingClone.length} itemContent={itemContent} className="vertual_list_scroll_booking_page" />
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