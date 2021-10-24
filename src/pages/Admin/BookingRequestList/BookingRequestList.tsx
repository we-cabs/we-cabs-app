import React,{useEffect,useState} from 'react';
import { IonPage, IonRow,IonCol, IonDatetime, IonContent, IonAlert,IonCard,IonCardHeader } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './BookingRequestList.css';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import Select from 'react-select';
import { actionToGetBidingDataByBooking, actionToParmanentDeleteBooking, actionToSetEditByBooking, actionToUpdateBidding, actionToUpdateBooking } from '../../../actions/BookingAction';
import Loader from '../../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import NoDataFound from '../../../components/NoDatFound/NoDataFound';
import $ from 'jquery';
import { Virtuoso } from 'react-virtuoso';

interface BookingRequestList extends RouteComponentProps<{
  type: string;
}> {}

const BookingRequestList: React.FC<BookingRequestList> = ({match,history}) => {
  const dispatch = useDispatch();
  const [_bookingTypeOptions, setBookingTypeOptions] = useState<any>(null);
  const [_dateFilterOption, setDateFilterOption] = useState<any>(null);
  const [isFixedSubHeader,setIsFixedSubHeader] = useState(false);
  const [editBookingData,setEditBookingData] = useState({});
  
 
  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  const [bookingClone,setBookingClone] = useState<any>(booking);
  const [showHideBookingFilter,setShowHideBookingFilter] = useState(false);
  const [selectedBid,setSelectedBid] = useState('');

  const [onSubmit,setOnSubmit] = useState(false);

  const [noDataFound,setNoDataFound] = useState(false);
  const [searchTextData,setSearchTextData] = useState('');
  let bookingTypeOption = [{label:'Completed',value:'completed'},{value:'not_completed',label:'Not Completed'}];
 

  const scrollProfileContent = (e:any) =>{
    if(e.detail.scrollTop > 1){
      setIsFixedSubHeader(true);
      }else{
      setIsFixedSubHeader(false);
      }
      if(showHideBookingFilter)
       setShowHideBookingFilter(false);
 }

  const applyFilterInBookingList = (type:string,value:any) =>{
    searchBookingById('');
    if(value && value != null){
      if(type == 'bookingType'){
        setBookingTypeOptions(value);
      }
      if(type == 'dateFilter'){
        setDateFilterOption(value);
      }
      let newBooking:any[] = [];
      booking.map(function(item:any) {
        if(item.status != 'cancel'){
        if(type == 'bookingType'){
        if(value.value == 'completed'){
          if(item.pickupTime > moment(moment()).valueOf()){
            newBooking.push(item);
          }
        }
        if(value.value == 'not_completed'){
          if(item.pickupTime < moment(moment()).valueOf()){
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
    setBookingTypeOptions(null);
    setDateFilterOption(null);

    let bookingData = [];
    for(let i = 0;i < booking.length;i++){
      let data = booking[i];
      if(data.status != 'cancel'){
        bookingData.push(data);
      }
    }
    setBookingClone(cloneDeep(bookingData));
    searchBookingById('');
  }
  
 

  const callActionToGetBidingDataByBooking = (bookingData:any) =>{
    dispatch(actionToGetBidingDataByBooking(bookingData));
    history.push(`/tabs/dashboard/booking-bids/${JSON.stringify(bookingData)}`);
  }

  const openEditBookingPage = (bookingData:any) =>{
    dispatch(actionToSetEditByBooking(bookingData));
    history.push(`/tabs/dashboard/edit-booking-bids`);
  }

  const searchBookingById = (text:any)=>{
      setSearchTextData(text);
      setNoDataFound(false);
      let filter = text.toLowerCase();
     // Declare variables
      let ul = null, li, a, txtValue;
      let found = false;
      ul = document.getElementById("booking_detail_list_section_id")
      if(ul)
       li = ul.getElementsByClassName('booking_detail_container');

      if(li && li.length){
      // Loop through all list items, and hide those who don't match the search query
      for (let i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
           $(li[i]).show();
           found = true;
        } else {
          $(li[i]).hide();
        }
      }
      if(!found){
        setNoDataFound(true);
      }
    }

  }

  useEffect(()=>{
    if(booking != undefined && booking.length){
      let bookingData = [];
      for(let i = 0;i < booking.length;i++){
        let data = booking[i];
        if(data.status != 'cancel'){
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
        if(data.status != 'cancel'){
          bookingData.push(data);
        }
      }
     setBookingClone(cloneDeep(bookingData));
    }
   },[booking]);

   const callActionToDeleteBooking = (id:any,data:any) =>{
    setOnSubmit(false);
    dispatch(actionToParmanentDeleteBooking(id));
    let payload = cloneDeep(data);
    payload.status = 'cancel';
    dispatch(actionToUpdateBooking(payload));
   }


   
   const InnerItem = React.memo(({ index }:any) => {
    const data = bookingClone[index]; 
    return (
      <IonCard>
        <IonCardHeader className="ionic_card_header">
    
           New Booking from {data.pickupPoint} to {data.dropPoint}

        </IonCardHeader>
        <IonRow>
         <IonCol size="9">
         <IonRow>
              <IonCol size="4">
                <span className="booking_title_op">Booking Id </span>
              </IonCol>
              <IonCol size="1">
                -
              </IonCol>
              <IonCol size="7">
              <span className="booking_detail_op"><a>{data.bookingId}</a></span>
              </IonCol>
           </IonRow>
           <IonRow>
              <IonCol size="4">
              <span className="booking_title_op">Date & Time </span>
              </IonCol>
              <IonCol size="1">
                -
              </IonCol>
              <IonCol size="7">
              <span className="booking_detail_op"><a>{moment(new Date(data.pickupTime)).utc().format("DD MMM,HH:MM")}</a></span>
              </IonCol>
           </IonRow>
           <IonRow>
              <IonCol size="4">
              <span className="booking_title_op">Car Type </span>
              </IonCol>
              <IonCol size="1">
                -
              </IonCol>
              <IonCol size="7">
              <span className="booking_detail_op"><a>{data.carType}</a></span>
              </IonCol>
           </IonRow>
           <IonRow>
              <IonCol size="4">
              <span className="booking_title_op">Pickup </span>
              </IonCol>
              <IonCol size="1">
                -
              </IonCol>
              <IonCol size="7">
              <span className="booking_detail_op"><a>{data.pickupPoint}</a></span>
              </IonCol>
           </IonRow>
           <IonRow>
              <IonCol size="4">
              <span className="booking_title_op">Drop </span>
              </IonCol>
              <IonCol size="1">
                -
              </IonCol>
              <IonCol size="7">
              <span className="booking_detail_op"><a>{data.dropPoint}</a></span>
              </IonCol>
             </IonRow>
         </IonCol>

          <IonCol size="3">
          <IonRow>
               <IonCol>
               </IonCol>
             </IonRow>
             <IonRow>
               <IonCol>
               </IonCol>
             </IonRow>
              <IonRow>
              <IonCol className="bid_action_column_section_admin">
                <button onClick={()=>openEditBookingPage(data)} className="bid_ammount_max_price_button">
                    Edit
                </button>
              </IonCol>
              </IonRow>
              <IonRow>
              <IonCol className="bid_action_column_section_admin">
                <button onClick={()=>callActionToGetBidingDataByBooking(data)} className="make_request_button">Requests</button>       
              </IonCol>
              </IonRow>
              <IonRow>
              <IonCol className="bid_action_column_section_admin">
                <button onClick={()=>{setEditBookingData(data); setSelectedBid(data.bookingId); setOnSubmit(true)}} className="make_bid_button">
                  Delete
                </button>           
              </IonCol>
              </IonRow>
          </IonCol>
        </IonRow>
    </IonCard>
    )
  })


   const itemContent = (index:any) => {
    return <InnerItem index={index} />
  }
   
  return (
    <IonPage>
       <IonAlert
            isOpen={onSubmit}
            onDidDismiss={() => setOnSubmit(false)}
            cssClass='my-custom-class'
            header={'Are you sure?'}
            message={'You want to permanent delete this booking with all bidings.'}
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
                  callActionToDeleteBooking(selectedBid,editBookingData);
                }
              }
          ]}
        />
        <AdminSubHeader title={"Gold Bookings"}/>
       <IonContent className="select_for_bidding_card_content" scrollEvents={true} onIonScroll={scrollProfileContent}>
        <div className={isFixedSubHeader ? "booking_filter_class fixed" : 'booking_filter_class'}>
          <IonRow onClick={()=>setShowHideBookingFilter(!showHideBookingFilter)} className="find_booking_section">
          <IonCol size="8"><span>Filter your Booking</span></IonCol>
          <IonCol size="4">
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
              <IonCol size="12">
              <div className="booking_search_by_id_section">
              <input onChange={(e)=>searchBookingById(e.target.value)} value={searchTextData} type="text" placeholder="Search user by booking id"/>
              <svg xmlns="http://www.w3.org/2000/svg" className="search_icon" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
              {(searchTextData.trim().length) ? 
              <svg onClick={()=>searchBookingById('')} xmlns="http://www.w3.org/2000/svg" className="remove_icon" viewBox="0 0 512 512"><path d="M256 512C114.84 512 0 397.16 0 256S114.84 0 256 0s256 114.84 256 256-114.84 256-256 256zm0-475.43C135.008 36.57 36.57 135.008 36.57 256S135.008 475.43 256 475.43 475.43 376.992 475.43 256 376.992 36.57 256 36.57zm91.43 329.145c-4.68 0-9.359-1.785-12.93-5.359L151.645 177.5c-7.145-7.145-7.145-18.715 0-25.855s18.715-7.145 25.855 0L360.355 334.5c7.145 7.145 7.145 18.715 0 25.855-3.57 3.574-8.246 5.359-12.926 5.359zm0 0"/><path d="M164.57 365.715c-4.68 0-9.355-1.785-12.926-5.359-7.145-7.141-7.145-18.715 0-25.855L334.5 151.645c7.145-7.145 18.715-7.145 25.855 0s7.145 18.715 0 25.855L177.5 360.355c-3.57 3.574-8.25 5.359-12.93 5.359zm0 0"/></svg>
              :''}
              </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
              <Select
                value={_bookingTypeOptions}
                options={bookingTypeOption}
                onChange={(e)=>applyFilterInBookingList('bookingType',e)}
                isSearchable
                placeholder= "Booking Type"
                openMenuOnClick={false}
              />
              </IonCol>
              <IonCol size="6">
                <IonDatetime onIonChange={(e)=>{e.stopPropagation(); e.preventDefault(); applyFilterInBookingList('dateFilter',e.detail.value)}} value={_dateFilterOption} className="filter_popup_date" placeholder="Date" displayFormat="MMM DD" displayTimezone="utc"/>
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
        <div id="booking_detail_list_section_id" className="booking_detail_list_scroll">
          
        {(noDataFound) ? 
            <div className="no_data_found">
              <NoDataFound/>
            </div>
            :''
          }
           <IonRow>
             <IonCol>
             {(loading || bookingClone == undefined) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(bookingClone != undefined && bookingClone.length && !noDataFound) ? 
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

export default BookingRequestList;