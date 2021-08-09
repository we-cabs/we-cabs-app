import React,{useEffect, useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import './BiddingPage.css';
import { RouteComponentProps } from 'react-router';
import { _convertUnixToDateTimeFormat } from '../../hooks/DateTimeConverter';
import { actionToAddBiddingData } from '../../actions/BiddingAction';
import moment from 'moment';
import { actionToUpdateBooking } from '../../actions/BookingAction';

let interValFunc:any = null;
const BiddingPage: React.FC<RouteComponentProps> = ({match,history}) => {
    const biddingData = useSelector((state:RootStateOrAny) => state.biddingData);
    const [bidValue,setBidValue] = useState(0);
    const [biddingSuccessPopup,setBiddingSuccessPopup] = useState(false);

    const [bidDate,setBidDate] = useState(0);
    const [bidHour,setBidHour] = useState(0);
    const [bidMin,setBidMin] = useState(0);
    const [bidSec,setBidSec] = useState(0);
    
    const [carPlate,setCarPlate] = useState('');
    const {cars} = useSelector((state:RootStateOrAny) => state.carData);
    const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
    const dispatch = useDispatch();
    const callToPlaceYourBid = () => {

      if(bidValue){
        let carSelected = ''
        if(!carPlate.length){
          if(cars != undefined && cars.length){
            carSelected = cars[0].carDetails.rcno;
          }else{
            alert('You have not added any car');
            return;
          }
        }else{
          carSelected = carPlate;
        }
      let payload = {
        linkedUserId:userInfo.phone,
        linkedBookingId:biddingData.bookingId,
        amount:Number(bidValue),
        carPlate:carSelected,
        linkedUserRating:0.2,
        status:'pending'
      };

      setBiddingSuccessPopup(true);


      if(biddingData.minPrice == 0 && biddingData.basePrice > Number(bidValue)){
        biddingData.minPrice = Number(bidValue);
      }else if(biddingData.minPrice > Number(bidValue)){
        biddingData.minPrice = Number(bidValue);
      }

      dispatch(actionToAddBiddingData(payload));
      dispatch(actionToUpdateBooking(biddingData));
    }
    }

    useEffect(()=>{
      if(biddingData.basePrice){
        if(!isNaN(Number(biddingData.basePrice))){
          setBidValue(biddingData.basePrice);
        }
      }
      if(biddingData.expiryTime){
        var countDownDate = new Date(moment(new Date(biddingData.expiryTime)).utc().format("YYYY-MM-DD HH:mm")).getTime();
  

        interValFunc = setInterval(function() {
       
          var now = new Date().getTime();
          var timeleft = countDownDate - now;

          var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
          var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

          setBidDate(days);
          setBidHour(hours);
          setBidMin(minutes);
          setBidSec(seconds);

          if (timeleft < 0) {
            clearInterval(interValFunc);
            setBidDate(0);
            setBidHour(0);
            setBidMin(0);
            setBidSec(0);
          }

        
       }, 1000)
      }
    },[biddingData])

    const setBiddingValue = (val:any) =>{
      if(!isNaN(Number(val))){
        setBidValue(val);
      }
    }

  return (
    <IonPage>
      <SubPageHeaderComponent title={"Bidding"}/>
      <IonContent>
       {biddingData.allottedBidId != undefined && biddingData.allottedBidId ?  
         <div className="bid_alloted_success_message_div">
            <span>Bid alloted</span>
           </div>
        :''}
        <br></br>
          <div className="base_price_section">
              <span>Base Price - {biddingData.basePrice}</span>
          </div>
          <div className="bidding_list_section_container">
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 18.367 25.045" fill="#4b4b4b"><path d="M9.183 0A9.25 9.25 0 0 0 0 9.295C0 12.568 1.5 16.2 4.466 20.09a36.09 36.09 0 0 0 4.442 4.853.42.42 0 0 0 .549 0 36.04 36.04 0 0 0 4.443-4.854c2.964-3.89 4.466-7.522 4.466-10.795A9.25 9.25 0 0 0 9.183 0zm0 24.063C7.711 22.691.835 15.923.835 9.295a8.35 8.35 0 0 1 16.7 0c-.003 6.628-6.88 13.395-8.352 14.768zM9.184 1.67c-4.15 0-7.514 3.364-7.514 7.514s3.364 7.514 7.514 7.514 7.514-3.364 7.514-7.514S13.334 1.67 9.184 1.67zm0 14.192a6.68 6.68 0 0 1-6.679-6.679 6.68 6.68 0 0 1 6.679-6.679 6.68 6.68 0 0 1 6.679 6.679 6.68 6.68 0 0 1-6.679 6.679z"/><circle cx="6.69" cy="9.462" r=".623"/><circle cx="11.676" cy="9.462" r=".623"/><path d="M14.478 7.957l-.888.3-.885-2.063a1.25 1.25 0 0 0-1.15-.759h-.376l-.338-1.362c-.046-.186-.213-.316-.405-.316h-2.5c-.19.002-.354.132-.4.316l-.338 1.354h-.376a1.25 1.25 0 0 0-1.15.759l-.885 2.063-.888-.3-.264.793.967.321v1.794c0 .111.044.217.122.295s.184.122.295.122v1.252c0 .111.044.217.122.295s.184.122.295.122h1.67c.111 0 .217-.044.295-.122s.122-.184.122-.295v-1.255h3.339v1.252c0 .111.044.217.122.295s.184.122.295.122h1.662c.111 0 .217-.044.295-.122s.122-.184.122-.295v-1.252c.111 0 .217-.044.295-.122s.122-.184.122-.295V9.067l.967-.322zM8.257 4.596h1.853l.209.835h-2.27zM6.428 6.519c.066-.153.216-.253.383-.253h4.744c.167 0 .318.099.384.253l.786 1.834H5.641zm.25 5.591h-.837v-.835h.835zm5.844 0h-.835v-.835h.835zm.419-1.674H5.427V9.184h7.514z"/></svg>
                 </IonCol>
                 <IonCol size="5">
                   <div className="booking_pickup_point">
                     Pickup Point
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5"><div className="booking_pickup_point_result">{biddingData.pickupPoint}</div></IonCol>
             </IonRow>
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 24.1 20.354">
                    <g id="direction" transform="translate(-30 -38.679)">
                      <path id="Path_7" data-name="Path 7" d="M52.834,73.677l-.392-2a1.62,1.62,0,0,0-1.618-1.264h-1.63l-.312-1.3a.4.4,0,0,0-.391-.308H46.051a.4.4,0,0,0-.391.308l-.312,1.3H43.664a1.62,1.62,0,0,0-1.618,1.264l-.4,2.02a1.657,1.657,0,0,0-1.208,1.589V77.99a1.659,1.659,0,0,0,1.607,1.654v.809a1.191,1.191,0,0,0,.074.4H32.209a1.406,1.406,0,1,1,0-2.812h5.222a2.209,2.209,0,1,0,0-4.418H32.41a1.2,1.2,0,1,1,0-2.41h1.519a.4.4,0,0,0,.322-.161c.327-.437,3.192-4.319,3.192-6.16a3.514,3.514,0,1,0-7.027,0c0,1.47,1.825,4.239,2.727,5.518H32.41a2.008,2.008,0,1,0,0,4.017h5.021a1.406,1.406,0,1,1,0,2.812H32.209a2.209,2.209,0,1,0,0,4.418H43.255a1.206,1.206,0,0,0,1.2-1.2v-.8h6.025v.8a1.2,1.2,0,0,0,2.41,0v-.875a1.657,1.657,0,0,0,1.2-1.588V75.284a1.659,1.659,0,0,0-1.266-1.607ZM33.929,62.107a2.752,2.752,0,0,1,2.71,2.786c0,1.187-1.734,3.868-2.71,5.238-.976-1.369-2.71-4.05-2.71-5.238A2.752,2.752,0,0,1,33.929,62.107Zm12.439,7.5h1.808l.193.8H46.174Zm-2.7,1.607h7.16a.817.817,0,0,1,.829.615l.351,1.795H42.484l.351-1.795A.817.817,0,0,1,43.664,71.215Zm-.008,9.238a.4.4,0,0,1-.8,0v-.8h.8Zm8.033.4a.4.4,0,0,1-.4-.4v-.8h.8v.8A.4.4,0,0,1,51.69,80.855ZM53.3,77.99a.857.857,0,0,1-.856.856H42.1a.857.857,0,0,1-.856-.856V75.284a.857.857,0,0,1,.856-.856H52.44a.857.857,0,0,1,.856.856V77.99Z" transform="translate(0 -22.625)" fill="#4b4b4b"/>
                      <path id="Path_8" data-name="Path 8" d="M230.54,207.333a.863.863,0,1,0,.863.863A.863.863,0,0,0,230.54,207.333Z" transform="translate(-179.626 -153.99)" fill="#4b4b4b"/>
                      <path id="Path_9" data-name="Path 9" d="M156.052,207.333a.863.863,0,1,0,.863.863A.863.863,0,0,0,156.052,207.333Z" transform="translate(-112.618 -153.99)" fill="#4b4b4b"/>
                      <path id="Path_17" data-name="Path 17" d="M53.393,79a1.977,1.977,0,1,0-1.977,2.015A2,2,0,0,0,53.393,79Zm-3.15,0a1.174,1.174,0,1,1,1.173,1.212A1.194,1.194,0,0,1,50.242,79Z" transform="translate(-17.487 -36.728)" fill="#4b4b4b"/>
                    </g>
                  </svg>
                 </IonCol>              
                 <IonCol size="5">
                   <div className="booking_pickup_point">
                     Drop Point
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5"><div className="booking_pickup_point_result">{biddingData.dropPoint}</div></IonCol>
             </IonRow>
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 22.025 19.707" fill="#4b4b4b"><path d="M21.086 6.925a1.14 1.14 0 0 0-.3.042l-1.07.295-1.134-2.754a2.61 2.61 0 0 0-2.233-1.5H15.6V.728A.73.73 0 0 0 14.872 0H7.156a.73.73 0 0 0-.728.728v2.283H5.66a2.61 2.61 0 0 0-2.233 1.5L2.3 7.258l-1.056-.291c-.098-.027-.199-.041-.3-.042-.259-.003-.508.101-.687.289s-.272.441-.257.7v.585c.001.67.543 1.212 1.213 1.213h.078l-.161.393a9.1 9.1 0 0 0-.571 2.894v5.495c.001.67.543 1.212 1.213 1.213H3.23c.67-.001 1.212-.543 1.213-1.213v-1.35h13.124v1.35c.001.67.543 1.212 1.213 1.213h1.458c.67-.001 1.212-.543 1.213-1.213V13a9.1 9.1 0 0 0-.571-2.894l-.161-.393h.093c.67-.001 1.212-.543 1.213-1.213v-.585c.016-.258-.076-.511-.254-.699s-.426-.293-.685-.291zM13.936.97c0-.016.013-.029.029-.029h.561c.016 0 .029.013.029.029v2.018c-.001.009-.005.017-.013.022h-.593c-.008-.005-.012-.013-.013-.022zM9.915.941h.674c.017.001.033.011.04.027l.8 2.01.733-.907c.01-.014.01-.033 0-.047l-.7-1.059c-.009-.013 0-.024.013-.024h.625c.018.001.034.01.044.025l.363.588c.022.01.028.006.03 0L12.9.966c.01-.015.026-.024.044-.025h.623c.016 0 .022.011.013.024l-.7 1.059c-.01.014-.01.033 0 .047l.746.923-.662.016c-.008-.004-.016-.01-.021-.018l-.41-.656c-.022-.01-.028-.006-.031 0l-.409.656c-.005.008-.013.014-.021.018h-1.246a.04.04 0 0 1-.019-.021l-.137-.421c-.006-.016-.021-.027-.038-.028h-.764c-.017.001-.032.011-.039.027l-.148.421c-.004.009-.01.016-.019.021h-.6L9.878.967c.007-.014.021-.024.037-.026zM7.943 2.989v-1.6c0-.016-.013-.029-.029-.029H7.24c-.016 0-.029-.013-.029-.029V.974c0-.016.013-.029.029-.029h2.029c.016 0 .029.013.029.029v.357c0 .016-.013.029-.029.029h-.678c-.016 0-.029.013-.029.029v1.6c-.001.009-.005.017-.013.022h-.593c-.008-.005-.013-.013-.013-.022zM3.155 9.036l1.718-4.185a1.57 1.57 0 0 1 1.339-.9H15.8a1.57 1.57 0 0 1 1.339.9l1.718 4.185c.113.199.105.445-.022.635s-.351.293-.578.265h-14.5c-.228.029-.452-.073-.579-.264s-.136-.437-.023-.636zm3.881 5.39a.49.49 0 0 1-.485.485H3.272a.49.49 0 0 1-.485-.485V12.87a.49.49 0 0 1 .485-.485h3.279a.49.49 0 0 1 .485.485v1.556zm12.155 0a.49.49 0 0 1-.485.485h-3.279a.49.49 0 0 1-.485-.485V12.87a.49.49 0 0 1 .485-.485h3.279a.49.49 0 0 1 .485.485zm-8.695-12.3c.021-.014.022-.021.018-.027l-.242-.558c-.006-.015-.017-.015-.024 0l-.256.559c.004.024.01.027.017.026z"/></svg>
                 </IonCol>
                 <IonCol size="5">
                   <div className="booking_pickup_point">
                     Cab Type
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5"><div className="booking_pickup_point_result">{biddingData.carType}</div></IonCol>
             </IonRow>
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 21.53 21.53" fill="#4b4b4b"><path d="M10.765 21.53A10.765 10.765 0 0 1 3.153 3.153a10.765 10.765 0 0 1 15.224 15.224 10.7 10.7 0 0 1-7.612 3.153zm0-20.269a9.5 9.5 0 1 0 6.72 2.784 9.441 9.441 0 0 0-6.72-2.783zm-.631 1.264h1.262v1.683h-1.262zm4.82 3.158l1.19-1.19.892.892-1.19 1.19zm2.368 4.451h1.683v1.262h-1.683zm-2.369 5.714l.892-.892 1.19 1.19-.892.892zm-4.819 1.474h1.262v1.683h-1.262zM4.49 16.145l1.19-1.19.892.892-1.19 1.19zm-1.965-6.011h1.683v1.262H2.525zm1.966-4.75l.892-.892 1.19 1.19-.892.892zm10.727 6.012h-5.084V6.312h1.262v3.822h3.822z"/></svg>
                 </IonCol>
                 <IonCol size="5">
                   <div className="booking_pickup_point">
                     Pickup Time
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5"><div className="booking_pickup_point_result">{_convertUnixToDateTimeFormat(biddingData.pickupTime,'hh:mm a')}</div></IonCol>
             </IonRow>
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 20.13 22.369"><path d="M15.963 10.986h1.56a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .64.64zm.016-2.186h1.529v1.53h-1.529zm-.016 6.335h1.56a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64V14.5a.64.64 0 0 0 .64.636zm.016-2.184h1.529v1.529h-1.529zm-4.468-1.966h1.562a.64.64 0 0 0 .64-.64V8.786a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .638.64zm.015-2.185h1.529v1.53h-1.529zm-7.36 7.451h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .64.64h1.56a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.639zm-.016 2.184H2.621v-1.527H4.15zm.016-10.291h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .64.64h1.56a.64.64 0 0 0 .64-.64V8.786a.64.64 0 0 0-.64-.64zm-.016 2.184H2.621V8.8H4.15zm7.36 4.708h1.563a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64V14.4a.64.64 0 0 0 .638.639zm.016-2.184h1.529v1.529h-1.529zM18.489 1.5h-1.4V1a1 1 0 0 0-1-1h-.15a1 1 0 0 0-1 1v.5h-9.76V1a1 1 0 0 0-1-1h-.15a1 1 0 0 0-1 1v.5h-1.4A1.64 1.64 0 0 0-.012 3.141V20.73a1.64 1.64 0 0 0 1.638 1.638h16.865a1.64 1.64 0 0 0 1.638-1.638V3.138a1.64 1.64 0 0 0-1.64-1.638zM15.6 1a.34.34 0 0 1 .341-.341h.15a.34.34 0 0 1 .342.341v.5H15.6zM3.7 1a.34.34 0 0 1 .341-.341h.15A.34.34 0 0 1 4.529 1v.5h-.833V1zm15.773 19.73c-.001.543-.44.982-.983.983H1.638c-.543-.001-.982-.44-.983-.983h0a1.63 1.63 0 0 0 .985.33h13.286a1.63 1.63 0 0 0 1.16-.481l3.387-3.39zm-3.723-.745a1.4 1.4 0 0 0 .04-.33v-2.188a.75.75 0 0 1 .748-.748h2.187a1.4 1.4 0 0 0 .33-.04zM19.473 6.18H5.512c-.121-.007-.236.054-.299.158s-.063.234 0 .338.178.165.299.158h13.961v8.481a.75.75 0 0 1-.748.748h-2.186a1.4 1.4 0 0 0-1.4 1.4v2.187a.75.75 0 0 1-.748.748H1.641c-.544-.001-.984-.441-.985-.985V6.835h3.546c.174-.01.31-.153.31-.327s-.136-.318-.31-.328H.655V3.138c.001-.544.441-.984.985-.985h1.4v.963a1 1 0 0 0 1 1c.121.007.236-.054.299-.158s.063-.234 0-.338-.178-.165-.299-.158a.34.34 0 0 1-.341-.341v-.967h11.246v.963a1 1 0 0 0 1 1c.121.007.236-.054.299-.158s.063-.234 0-.338-.178-.165-.299-.158a.34.34 0 0 1-.341-.341v-.967h2.889c.544.001.984.441.985.985zM4.166 12.2h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .64.64h1.56a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64zm-.016 2.184H2.621v-1.53H4.15zm2.908-3.4h1.56a.64.64 0 0 0 .64-.64V8.786a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .64.64zM7.073 8.8h1.53v1.53h-1.53zm4.452 9.635c-.013-.174-.16-.308-.335-.304s-.315.145-.32.32a.64.64 0 0 0 .64.64h1.563a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64v.45c-.007.121.054.236.158.299s.234.063.338 0 .165-.178.158-.299v-.434h1.529v1.529zm-4.468-3.4h1.56a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64V14.4a.64.64 0 0 0 .641.639zm.016-2.184h1.53v1.529h-1.53zm-.016 6.238h1.56a.64.64 0 0 0 .64-.64v-1.56a.64.64 0 0 0-.64-.64h-1.56a.64.64 0 0 0-.64.64v1.56a.64.64 0 0 0 .641.643zm.016-2.184h1.53v1.529h-1.53z" fill="#4b4b4b"/></svg>
                  </IonCol>
                <IonCol size="5">
                   <div className="booking_pickup_point">
                     Pickup Date
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5"><div className="booking_pickup_point_result">{_convertUnixToDateTimeFormat(biddingData.pickupTime,'MMM DD')}</div></IonCol>
             </IonRow>
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 21.855 21.855"><g fill="#4b4b4b"><path d="M19.347 13.652V3.583c-.001-.989-.802-1.79-1.791-1.791h-.717v-.717C16.839.481 16.358 0 15.764 0s-1.075.481-1.075 1.075v.717H12.9v-.717C12.9.481 12.419 0 11.825 0S10.75.481 10.75 1.075v.717H8.6v-.717C8.6.481 8.119 0 7.525 0S6.45.481 6.45 1.075v.717H4.658v-.717c0-.384-.205-.739-.537-.931s-.742-.192-1.075 0a1.07 1.07 0 0 0-.537.931v.717h-.717C.802 1.793.001 2.594 0 3.583v14.331c.001.989.802 1.79 1.791 1.791h12.047a4.3 4.3 0 1 0 5.509-6.053zM15.406 1.075a.36.36 0 0 1 .358-.358.36.36 0 0 1 .358.358v2.15a.36.36 0 0 1-.358.358.36.36 0 0 1-.358-.358zm-3.941 0a.36.36 0 0 1 .358-.359.36.36 0 0 1 .358.359v2.15a.36.36 0 0 1-.359.359.36.36 0 0 1-.358-.359zm-4.3 0a.36.36 0 0 1 .358-.359.36.36 0 0 1 .358.359v2.15a.36.36 0 0 1-.359.359.36.36 0 0 1-.358-.359zm-3.941 0a.36.36 0 0 1 .359-.358.36.36 0 0 1 .358.358v2.15a.36.36 0 0 1-.358.358.36.36 0 0 1-.358-.358zM1.791 2.508h.717v.717c0 .384.205.739.537.931s.742.192 1.075 0a1.07 1.07 0 0 0 .537-.931v-.717h1.791v.717c0 .594.481 1.075 1.075 1.075s1.075-.481 1.075-1.075v-.717h2.15v.717c0 .594.481 1.075 1.075 1.075s1.075-.481 1.075-1.075v-.717h1.791v.717c0 .594.481 1.075 1.075 1.075s1.075-.481 1.075-1.075v-.717h.717c.593.002 1.072.482 1.073 1.075v1.791H.717V3.583c.001-.593.481-1.074 1.074-1.075zm0 16.481c-.593-.001-1.074-.482-1.075-1.075V6.091H18.63V13.4a4.09 4.09 0 0 0-1.791-.077v-1.858c0-.095-.038-.186-.105-.253s-.158-.105-.253-.105h-2.15c-.095 0-.186.038-.253.105s-.105.158-.105.253v2.15c0 .095.038.186.105.253s.158.105.253.105h.853c-1.65 1.084-2.343 3.157-1.677 5.016zm14.331-5.732h-1.433v-1.434h1.433zm1.433 7.882a3.58 3.58 0 0 1-3.31-2.212c-.554-1.339-.248-2.88.777-3.905s2.566-1.331 3.905-.777a3.58 3.58 0 0 1 2.212 3.31 3.59 3.59 0 0 1-3.583 3.582zm.359-4.201v-2.249h-.717v2.249c-.26.141-.4.432-.348.723l-1.309 1.047.448.56 1.308-1.047c.349.139.745-.016.907-.354s.036-.744-.29-.93zM4.658 7.165h-2.15c-.095 0-.186.038-.253.105s-.105.158-.105.253v2.15c0 .095.038.186.105.253s.158.105.253.105h2.15c.095 0 .186-.038.253-.105s.105-.158.105-.253v-2.15c0-.095-.038-.186-.105-.253s-.158-.105-.253-.105zM4.3 9.315H2.867V7.882H4.3zm4.299-2.15h-2.15c-.095 0-.186.038-.253.105s-.105.158-.105.253v2.15c0 .095.038.186.105.253s.158.105.253.105h2.15c.095 0 .186-.038.253-.105s.105-.158.105-.253v-2.15c0-.095-.038-.186-.105-.253s-.158-.105-.253-.105zm-.358 2.15H6.808V7.882h1.433z"/><path d="M12.54 7.165h-2.15c-.095 0-.186.038-.253.105s-.105.158-.105.253v2.15c0 .095.038.186.105.253s.158.105.253.105h2.15c.198 0 .358-.16.358-.358v-2.15c0-.198-.16-.358-.358-.358zm-.358 2.15h-1.433V7.882h1.433zm2.149.716h2.15c.198 0 .358-.16.358-.358v-2.15c0-.198-.16-.358-.358-.358h-2.15c-.198 0-.358.16-.358.358v2.15c0 .198.16.358.358.358zm.358-2.15h1.434v1.434H14.69z"/><use y="3.941"/><use y="3.941"/></g><defs><path id="B" d="M4.658 11.107h-2.15c-.198 0-.358.16-.358.358v2.15c0 .198.16.358.358.358h2.15c.198 0 .358-.16.358-.358v-2.15c0-.198-.16-.358-.358-.358zm-.358 2.15H2.867v-1.433H4.3z"/><path id="C" d="M8.599 11.107h-2.15c-.198 0-.358.16-.358.358v2.15c0 .198.16.358.358.358h2.15c.198 0 .358-.16.358-.358v-2.15c0-.198-.16-.358-.358-.358zm-.358 2.15H6.808v-1.433h1.433z"/><path id="D" d="M12.54 11.107h-2.15c-.198 0-.358.16-.358.358v2.15c0 .198.16.358.358.358h2.15c.198 0 .358-.16.358-.358v-2.15c0-.198-.16-.358-.358-.358zm-.358 2.15h-1.433v-1.433h1.433z"/></defs></svg>
                </IonCol>

                 <IonCol size="5">
                   <div className="booking_pickup_point">
                     Booking Date
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5"><div className="booking_pickup_point_result">{_convertUnixToDateTimeFormat(biddingData.submittedAt,'MMM DD hh:mm a')}</div></IonCol>
             </IonRow>
             <IonRow className="booking_row_section">
                 <IonCol size="1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon_car" viewBox="0 0 99.442 99.443"><path d="M19.097 54.071a7.56 7.56 0 0 0-7.561 7.56 7.42 7.42 0 0 0 .066.951c.469 3.729 3.642 6.611 7.494 6.611a7.56 7.56 0 0 0 7.53-6.916l.033-.646a7.56 7.56 0 0 0-7.562-7.56zm-3.787 4.711l1.543 1.543c-.121.206-.214.429-.274.665h-2.174a4.71 4.71 0 0 1 .905-2.208zm-.913 3.516h2.189a2.55 2.55 0 0 0 .274.656L15.314 64.5c-.476-.629-.801-1.381-.917-2.202zm4.046 4.03c-.818-.112-1.564-.434-2.193-.908l1.537-1.538c.202.118.424.205.656.266v2.18zm0-7.212a2.61 2.61 0 0 0-.668.279l-1.541-1.541c.633-.48 1.385-.8 2.209-.913v2.175zm1.309-2.175c.826.113 1.577.433 2.209.914l-1.54 1.54c-.207-.122-.43-.218-.669-.279v-2.175zm0 9.387v-2.182a2.52 2.52 0 0 0 .657-.268l1.538 1.54a4.7 4.7 0 0 1-2.195.91zm3.133-1.824l-1.551-1.551c.12-.203.22-.42.282-.655h2.172a4.7 4.7 0 0 1-.903 2.206zm-1.268-3.514c-.06-.236-.153-.459-.274-.665l1.543-1.543a4.7 4.7 0 0 1 .905 2.208h-2.174zm62.348-6.919a7.56 7.56 0 0 0-7.561 7.56 7.42 7.42 0 0 0 .065.951c.468 3.729 3.643 6.611 7.494 6.611a7.56 7.56 0 0 0 7.53-6.916l.031-.646c.002-4.177-3.382-7.56-7.559-7.56zm-3.788 4.711l1.543 1.543c-.12.206-.214.429-.273.665h-2.175a4.71 4.71 0 0 1 .905-2.208zm-.912 3.516h2.19a2.58 2.58 0 0 0 .272.656L80.182 64.5c-.477-.629-.802-1.381-.917-2.202zm4.045 4.03a4.69 4.69 0 0 1-2.192-.908l1.537-1.538a2.61 2.61 0 0 0 .655.266v2.18zm0-7.212c-.237.062-.461.157-.669.279L81.1 57.854a4.7 4.7 0 0 1 2.209-.913l.001 2.175zm1.31-2.175a4.69 4.69 0 0 1 2.209.914l-1.541 1.54c-.207-.122-.431-.218-.668-.279v-2.175zm0 9.387v-2.182a2.51 2.51 0 0 0 .655-.268l1.538 1.54c-.629.476-1.375.796-2.193.91zm3.132-1.824l-1.551-1.551c.12-.203.22-.42.281-.655h2.174c-.116.821-.426 1.577-.904 2.206zm-1.269-3.514c-.06-.236-.152-.459-.272-.665l1.542-1.543a4.71 4.71 0 0 1 .906 2.208h-2.176zm12.608-13.051a10.35 10.35 0 0 0-1.339-4.754l-5.43-9.581c-.89-1.569-2.521-2.573-4.322-2.664-9.1-.456-37.002-1.618-45.786.744-5.942 1.599-20.936 11.456-20.936 11.456S4.781 45.695 1.634 53.219c0 0-1.358.793-1.605 2.826-.127 1.046.183 2.634.525 3.965a3.77 3.77 0 0 0 3.067 2.783l7.16 1.122c-.107-.391-.196-.788-.248-1.198a8.6 8.6 0 0 1-.075-1.087 8.65 8.65 0 0 1 8.639-8.637 8.65 8.65 0 0 1 8.64 8.637c0 .249-.016.493-.036.735-.072.844-.268 1.651-.567 2.408l.842.045 47.568-1.287c-.061-.268-.109-.538-.145-.814a8.42 8.42 0 0 1-.074-1.087 8.65 8.65 0 0 1 8.638-8.637 8.65 8.65 0 0 1 8.64 8.637 8.47 8.47 0 0 1-.037.735c-.013.16-.041.315-.062.473L96.609 62a3.54 3.54 0 0 0 2.831-3.589l-.349-10.472zM71.715 32.71l1.093 10.911-16.774.686V32.655c4.904-.113 10.502-.062 15.681.055zM29.387 45.087l-1.659.093a1.02 1.02 0 0 1-.658-1.839 118.25 118.25 0 0 1 3.499-2.462v2.784c-.81.685-1.182 1.424-1.182 1.424zm4.111-2.554c-.105.004-.191.03-.291.04V39.15c3.382-2.144 7.215-4.273 10.511-5.34 1.5-.485 4.236-.795 7.636-.98v11.668l-14.412.589s-.5-2.664-3.444-2.554zm58.27-1.058a2.94 2.94 0 0 1-2.426 1.471l-11.852.484-1.062-10.594 11.063.445a2.73 2.73 0 0 1 2.271 1.454l2.057 3.903a2.94 2.94 0 0 1-.051 2.837z"/></svg>
                </IonCol>

                 <IonCol size="5">
                   <div className="booking_pickup_point">
                     Select Car
                   </div>
                 </IonCol>
                 <IonCol size="1"><div className="booking_pickup_point">-</div></IonCol>
                 <IonCol size="5">
                   <div className="booking_pickup_point_result">
                     {(cars != undefined && cars.length) ? 
                     <select onChange={(e)=>setCarPlate(e.target.value)}>
                       {cars.map((car:any,key:number)=>(
                          <option key={key}>{car.carDetails.rcno}</option>
                       ))}
                     </select>
                     :''}
                   </div>
                 </IonCol>
             </IonRow>
             {(biddingData.notes != undefined && biddingData.notes) ? 
             <>
             <IonRow className="booking_row_section_custmor">
             <IonCol size="12">
               <svg className="booking_svg_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.453 18.453" fill="#030104"><path d="M2.711 4.058h8.23v1.334h-8.23zm12.261 10.03c.638-1.127.453-2.563-.475-3.49a2.89 2.89 0 0 0-2.058-.852 2.89 2.89 0 0 0-2.911 2.911 2.9 2.9 0 0 0 .852 2.059c.549.547 1.279.85 2.057.85a2.91 2.91 0 0 0 1.434-.375l3.262 3.262 1.101-1.102-3.262-3.263zm-1.308-.207a1.78 1.78 0 0 1-2.448 0c-.675-.676-.675-1.773 0-2.449a1.72 1.72 0 0 1 1.225-.506 1.72 1.72 0 0 1 1.731 1.731 1.72 1.72 0 0 1-.508 1.224zm-.332 2.419H1.857a.33.33 0 0 1-.329-.328V1.638a.33.33 0 0 1 .329-.329h11.475c.182 0 .328.147.328.329V8.95a3.43 3.43 0 0 1 1.31.597V1.638A1.64 1.64 0 0 0 13.332 0H1.857A1.64 1.64 0 0 0 .219 1.638v14.334a1.64 1.64 0 0 0 1.638 1.637h11.475c.685 0 1.009-.162 1.253-.76l-.594-.594c-.219.092-.565.045-.659.045zM2.711 7.818h8.23v1.334h-8.23z"/></svg>

               <div className="booking_pickup_point">
                 Trip Details
               </div><br></br>
               <div className="booking_pickup_customer_details">
                 {biddingData.notes}
               </div>
             </IonCol>           
         </IonRow>

         </>
             :''}
          </div>
          {biddingData.allottedBidId != undefined && biddingData.allottedBidId ?  
            <></>
          :
          <>
          <div className="time_watch_div_section_container">
          <IonRow>
              <IonCol size="6">
                <div className="stop_timer_watch">
                  <svg xmlns="http://www.w3.org/2000/svg" className="booking_svg_icon" viewBox="0 0 102.711 98.594" fill="#4b4b4b"><path d="M102.513 54.038a40.49 40.49 0 0 0-31.486-35.5v-5.1A6.82 6.82 0 0 0 69.381-.001H54.937a6.82 6.82 0 0 0-1.647 13.439v5.111a40.28 40.28 0 0 0-19.755 10.869c-1.216 1.215-2.353 2.507-3.406 3.866-.05 0-.1-.008-.152-.008h-14.3c-1.108 0-2.006.898-2.006 2.006s.898 2.006 2.006 2.006H27.4c-1.456 2.437-2.649 5.022-3.56 7.711H2.006C.898 44.999 0 45.897 0 47.005s.898 2.006 2.006 2.006h20.7a40.79 40.79 0 0 0-1 7.711h-8.867c-1.108 0-2.006.898-2.006 2.006s.898 2.006 2.006 2.006h8.935a40.73 40.73 0 0 0 1.253 7.711h-13c-1.108 0-2.006.898-2.006 2.006s.898 2.006 2.006 2.006h14.28a40.52 40.52 0 0 0 33.877 25.941q1.988.2 3.976.2a40.62 40.62 0 0 0 22.115-6.536c.608-.388.961-1.072.925-1.792s-.456-1.365-1.1-1.69-1.412-.279-2.013.12c-15.665 10.182-36.489 6.895-48.257-7.617s-10.681-35.566 2.518-48.789 34.251-14.349 48.784-2.609 17.859 32.559 7.706 48.242c-.42.601-.479 1.383-.154 2.04a2.01 2.01 0 0 0 1.715 1.115c.732.031 1.423-.341 1.801-.969a40.65 40.65 0 0 0 6.313-26.075zM52.128 6.821c.002-1.551 1.258-2.807 2.809-2.809h14.444a2.81 2.81 0 0 1 2.756 2.809 2.81 2.81 0 0 1-2.756 2.808H54.937c-1.55-.002-2.807-1.258-2.809-2.808zm5.172 11.04v-4.223h9.712v4.212a40.87 40.87 0 0 0-9.712.011zm32.126 65.44c-.958-.001-1.782.675-1.97 1.614s.315 1.88 1.199 2.247 1.905.058 2.437-.738.428-1.857-.249-2.534c-.377-.375-.886-.587-1.418-.588zm-27.237-56.35c-17.187 0-31.12 13.933-31.12 31.12s13.933 31.12 31.12 31.12 31.12-13.933 31.12-31.12c-.02-17.179-13.941-31.1-31.12-31.12zm0 58.229c-14.971 0-27.108-12.136-27.108-27.108s12.136-27.108 27.107-27.108S89.296 43.1 89.297 58.071C89.28 73.036 77.154 85.163 62.189 85.18zm12.69-42.634l-9.936 9.936c-1.736-.858-3.771-.858-5.507 0l-4.447-4.447c-.783-.783-2.054-.783-2.837 0s-.783 2.054 0 2.837l4.447 4.447c-1.293 2.622-.591 5.79 1.689 7.619s5.524 1.83 7.804 0 2.982-4.998 1.689-7.619l9.936-9.937c.783-.784.783-2.054-.001-2.837s-2.054-.783-2.837.001zm-12.69 17.748a2.221 2.221 0 1 1 .001-4.442 2.22 2.22 0 0 1 2.221 2.221c-.002 1.226-.996 2.219-2.222 2.22zm21.45-4.204H81.78c-1.108 0-2.006.898-2.006 2.006s.898 2.006 2.006 2.006h1.859c1.108 0 2.006-.898 2.006-2.006s-.898-2.006-2.006-2.006zm-41.04-.049H40.74c-1.108 0-2.006.898-2.006 2.006s.898 2.006 2.006 2.006h1.859c1.108 0 2.006-.898 2.006-2.006s-.898-2.006-2.006-2.006zm19.615-15.553c1.108 0 2.006-.898 2.006-2.006v-1.858c0-1.108-.898-2.006-2.006-2.006s-2.006.898-2.006 2.006v1.859c.001 1.107.899 2.005 2.006 2.005zm-.049 35.168c-1.108 0-2.006.898-2.006 2.006v1.858c0 1.108.898 2.006 2.006 2.006s2.006-.898 2.006-2.006v-1.857c0-.532-.211-1.043-.587-1.419a2.01 2.01 0 0 0-1.419-.588zM2.006 68.444c-.908 0-1.702.61-1.938 1.487s.148 1.802.934 2.256 1.779.324 2.421-.318c.574-.574.746-1.437.436-2.186s-1.042-1.239-1.854-1.239z"/></svg>
                </div>
              </IonCol>
              <IonCol size="6" className="stop_timer_running_watch_col">
                <div className="stop_timer_running_watch">
                  <span className="running timer_div">
                  {(bidDate ? bidDate+':' : '')}
                  {(bidHour ? bidHour+':' : '')}
                  {(bidMin ? bidMin+':' : '')}
                  {(bidSec)}
                  </span>
                  <br></br>
                  <br></br>
                  <span className="min_renaining_text">
                    Time Remaining
                  </span>
                </div>
              </IonCol>
            </IonRow>
          </div>
          <div className="bidding_booking_button_section">
            <IonRow>
              <IonCol size="4" className="type_your_bidding_input">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"></path></svg>
                 <input type="text" pattern="[0-9]*" value={bidValue} onChange={(e)=>setBiddingValue(e.target.value)}/>
              </IonCol>
          
              <IonCol size="4">
                <button onClick={(e)=>callToPlaceYourBid()} className="place_your_bidding_button">Place your bid</button>
              </IonCol>
           
              <IonCol size="4">
              <button onClick={()=>history.goBack()} className="leave_bidding_button">Leave the bid</button>
              </IonCol>
            </IonRow>
          </div>
          </>
          }

     </IonContent>
      {(biddingSuccessPopup) ? 
      <div className="add_bidding_success_popup_container">
         <div className="add_bidding_success_popup">
            {/* <div className="add_bidding_check_box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path d="M21 10.499c0 5.799-4.701 10.5-10.5 10.5S0 16.298 0 10.499s4.701-10.5 10.5-10.5S21 4.7 21 10.499zm-11.715 5.56l7.79-7.79c.127-.127.199-.299.199-.479s-.071-.352-.199-.479l-.958-.958c-.127-.127-.299-.199-.479-.199s-.352.071-.479.199l-6.353 6.353-2.969-2.969c-.127-.127-.299-.199-.479-.199s-.352.071-.479.199l-.958.958c-.127.127-.199.299-.199.479s.071.352.199.479l4.4 4.4c.127.127.299.199.479.199s.352-.071.479-.199z" fill="#7ab71e"/></svg>
            </div> */}
            <div className="request_success_submit_message">
              <span>Your request has been <br></br> submmitted successfully.</span><br></br><br></br>
              <span>You will receive a notification <br></br> once a booking is available.</span><br></br><br></br>
              <button onClick={()=>{setBiddingSuccessPopup(false); history.goBack()}} className="bidding_success_close_button">Close</button>
            </div>
         </div>
      </div>
      :''}
    </IonPage>
  );
};

export default BiddingPage;