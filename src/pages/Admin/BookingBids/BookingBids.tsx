import React,{useEffect,useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import './BookingBids.css';
import cloneDeep from 'lodash/cloneDeep';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { _convertUnixToDateTimeFormat } from '../../../hooks/DateTimeConverter';
import Loader from '../../../components/Loader/Loader';
import NoDataFound from '../../../components/NoDatFound/NoDataFound';

interface BookingBidsProps extends RouteComponentProps<{
    bookingData: string;
  }> {}
  

const BookingBids: React.FC<BookingBidsProps> = ({match,history}) => {
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
  const {loading,bidData} = useSelector((state:RootStateOrAny) => state.biddingDetailByBookingId);
  const bookingData:any = JSON.parse(match.params.bookingData);
  const [filterType,setFilterType] = useState('all');

  
  useEffect(()=>{
   console.log(JSON.parse(match.params.bookingData));
  },[])
  
  return (
    <IonPage>
     <AdminSubHeader title={"Bookings"}/>
      <IonContent className="ion-padding">
        <div className="inner_contant_container">
           {(loading) ? <Loader/> : (bidData != undefined && bidData.length) ?
           <div className="bidding_list_inner_container_section">
                {bidData.map((bids:any,key:any)=>(
                  <>
                  <div key={key} className="bidding_list_inner_loop">
                  <IonRow>
                       <IonCol size="4" className="booking_bidding_list_inner_col_icon">
                        <span className="rupee_sign">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.998 401.998"><path d="M326.62 91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52c2.669 0 4.853-.856 6.57-2.565 1.704-1.712 2.56-3.903 2.56-6.567V9.136c0-2.666-.855-4.853-2.56-6.567C324.334.859 322.15 0 319.481 0H81.941c-2.666 0-4.853.859-6.567 2.568-1.709 1.714-2.568 3.901-2.568 6.567v37.972c0 2.474.904 4.615 2.712 6.423s3.949 2.712 6.423 2.712h41.399c40.159 0 65.665 10.751 76.513 32.261H81.941c-2.666 0-4.856.855-6.567 2.568s-2.568 3.901-2.568 6.567v29.124c0 2.664.855 4.854 2.568 6.563 1.714 1.715 3.905 2.568 6.567 2.568h121.915c-4.188 15.612-13.944 27.506-29.268 35.691s-35.544 12.279-60.67 12.279H81.941c-2.474 0-4.615.905-6.423 2.712s-2.712 3.951-2.712 6.423v36.263c0 2.478.855 4.571 2.568 6.282 36.543 38.828 83.939 93.165 142.182 163.025 1.715 2.286 4.093 3.426 7.139 3.426h55.672c4.001 0 6.763-1.708 8.281-5.141 1.903-3.426 1.53-6.662-1.143-9.708-55.572-68.143-99.258-119.153-131.045-153.032 32.358-3.806 58.625-14.277 78.802-31.404s32.449-39.403 36.83-66.811h47.965c2.662 0 4.853-.854 6.563-2.568s2.573-3.899 2.573-6.563V97.646c0-2.669-.858-4.856-2.573-6.57z"/></svg>
                        </span>
                       {bids.amount}
                        <div className="avialable_balance_title_section">
                            Amount
                        </div>
                       </IonCol> 
                       <IonCol size="4" className="bidding_list_pick_point_col">
                                         
                       </IonCol>
                       <IonCol className="bidding_list_pick_point_col">
        
                       </IonCol>
                       <IonCol size="1" className="bidding_list_icon_col">
                         {(bids.status == "approved") ? 
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path d="M21 10.499c0 5.799-4.701 10.5-10.5 10.5S0 16.298 0 10.499s4.701-10.5 10.5-10.5S21 4.7 21 10.499zm-11.715 5.56l7.79-7.79c.127-.127.199-.299.199-.479s-.071-.352-.199-.479l-.958-.958c-.127-.127-.299-.199-.479-.199s-.352.071-.479.199l-6.353 6.353-2.969-2.969c-.127-.127-.299-.199-.479-.199s-.352.071-.479.199l-.958.958c-.127.127-.199.299-.199.479s.071.352.199.479l4.4 4.4c.127.127.299.199.479.199s.352-.071.479-.199z" fill="#7ab71e"/></svg>
                          : ''
                        }
                      </IonCol>
                  </IonRow>
              </div>
              </>
                ))}
           </div>
           :
            <div className="no_data_found">
              <NoDataFound/>
            </div>
           }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BookingBids;