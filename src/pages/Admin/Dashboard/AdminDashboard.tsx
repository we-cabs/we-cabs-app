import { IonPage,IonRow,IonCol, IonContent } from '@ionic/react';
import React,{useEffect} from 'react';
import { useDispatch,useSelector,RootStateOrAny } from 'react-redux';
import './AdminDashboard.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import { actionToGetAllUserData } from '../../../actions/UserAction';
import { actionToGetBookingData } from '../../../actions/BookingAction';
import { actionToGetAllBookingDetailData } from '../../../actions/AdminAction';

const AdminDashboard: React.FC<RouteComponentProps> = ({match, history}) => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetBookingData());
        dispatch(actionToGetAllUserData());
        dispatch(actionToGetAllBookingDetailData());
    },[])
    return (
        <IonPage>
         <AdminHeaderComponent/>
        <IonContent>
          <div className="add_select_button_container">
                <IonRow>
                    <IonCol>
                    <button onClick={(e) => {
                        e.preventDefault();
                        history.push(`/tabs/dashboard/add-booking`);
                    }} className="bid_booing_button">
                        Add Booking
                    </button>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <button onClick={(e) => {
                                dispatch(actionToGetBookingData(0));
                        history.push(`/tabs/dashboard/select-bid-for-booking`);
                    }} className="bid_booing_button">
                        Select Bid for Booking
                    </button>
                    </IonCol>
                </IonRow>
           </div>
           <div className="update_user_data_container">
                <IonRow>
                    <IonCol>
                    <button  onClick={(e) => {
                        history.push(`/tabs/dashboard/user-data-list`);
                    }}
                    className="update_user_data_button">
                       User List
                    </button>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <button  onClick={(e) => {
                        history.push(`/tabs/dashboard/booking-request-list`);
                    }}
                    className="update_user_data_button">
                       Booking Request
                    </button>
                    </IonCol>
                </IonRow>
           </div>
       
           </IonContent>
        </IonPage>
    );
  }

export default AdminDashboard;