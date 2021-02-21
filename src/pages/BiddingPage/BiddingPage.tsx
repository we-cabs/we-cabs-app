import React,{useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import './BiddingPage.css';
import { RouteComponentProps } from 'react-router';

const BiddingPage: React.FC<RouteComponentProps> = ({match,history}) => {
    const biddingData= useSelector((state:RootStateOrAny) => state.biddingData);
    const [bidValue,setBidValue] = useState(biddingData.base_price);
  return (
    <IonPage>
      <SubPageHeaderComponent title={"Bidding"}/>
      <div className="bidding_page_container mayank" >
          <div className="base_price_section">
              <span>Base Price: {biddingData.base_price}</span>
          </div>
          <div className="booking_detail_box">
            <IonRow>
                <IonCol size="7">
                <div className="booking_title_left">
                    <span className="booking_title_op">Pickup Point - </span>
                    <span className="booking_detail_op">{biddingData.pickup_point}</span>
                    </div>
                    <div className="booking_title_left">
                    <span className="booking_title_op">Drop Point - </span>
                    <span className="booking_detail_op">{biddingData.drop_point}</span>
                    </div>
                    <div className="booking_title_left">
                    <span className="booking_title_op">Pickup Time - </span>
                    <span className="booking_detail_op">{biddingData.pickup_time}</span>
                    </div>
                    <div className="booking_title_left">
                    <span className="booking_title_op">Pickup Date  - </span>
                    <span className="booking_detail_op">{biddingData.pickup_date}</span>
                    </div>
                </IonCol>
                <IonCol size="5">
                    <div className="booking_title_right">
                    <span className="booking_title_op">Cab Type</span>    
                    <br/>              
                    <span className="booking_detail_op">{biddingData.cab_type}</span>
                    </div>
                    <div className="booking_title_right">
                    <span className="booking_title_op">Booking Date & Time</span>    
                    <br/>              
                    <span className="booking_detail_op">{biddingData.booking_date_time}</span>
                    </div>
                </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <div className={"clock_section_container"}>
                          <svg viewBox="0 0 16.644 16.644" fill="#030104"><path d="M13.804 4.661l.659-.66.196.195c.182.182.477.182.657 0s.183-.476 0-.658l-.986-.987c-.182-.182-.477-.182-.658 0s-.182.477 0 .659l.218.216-.648.648c-1.129-1.043-2.588-1.731-4.203-1.89v-.605h.469a.79.79 0 0 0 .789-.789.79.79 0 0 0-.789-.79H7.14a.79.79 0 0 0-.79.79.79.79 0 0 0 .79.789h.52v.602h-.029c-1.709.163-3.245.917-4.4 2.058l-.403.435C1.737 5.943 1.073 7.589 1.073 9.395a7.25 7.25 0 0 0 7.249 7.249 7.25 7.25 0 0 0 7.249-7.249c.001-1.812-.669-3.464-1.767-4.734zM8.313 15.404c-3.326 0-6.022-2.696-6.022-6.022S4.988 3.36 8.313 3.36s6.022 2.696 6.022 6.022-2.697 6.022-6.022 6.022zm.477-6.561V5.048l-.438-.702-.498.702v3.795a.92.92 0 0 0-.458.795c0 .511.415.925.925.925s.926-.414.926-.925c.001-.34-.183-.634-.457-.795z"/></svg>
                          <div className="time_remaining_section">
                              30:00 Minutes Remaining
                          </div>
                        </div>
                    </IonCol>
                </IonRow>
            </div>
            <div className="minimun_bid_received_section">
               <span className="bid_received_title">Minimum Bid Received - </span>
               <span className="bid_received_value">2100</span>
            </div>

            <div className="place_youir_bid_section">
                <div className="edit_your_bid_section">  
                    <span onClick={()=>setBidValue(bidValue-1)} className="edit_bid_icon">-</span>
                      <input className="edit_bid_input" onChange={(e)=>setBidValue(e.target.value)} type="number" value={bidValue}/>
                    <span onClick={()=>setBidValue(bidValue+1)} className="edit_bid_icon">+</span>
                </div>
                <div className="place_your_bid_section">
                  <span> PLACE YOUR BID </span>
                </div>
            </div>

            <div onClick={()=>history.goBack()} className="leave_bid_section">
                <span className="leave_this_bid_section">
                  Leave This Bid
                </span>
            </div>
      </div>
    </IonPage>
  );
};

export default BiddingPage;