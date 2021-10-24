import { IonPage,IonRow,IonCol, IonContent, IonGrid } from '@ionic/react';
import React,{useEffect} from 'react';
import { useDispatch,useSelector,RootStateOrAny } from 'react-redux';
import './AdminDashboard.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import { actionToGetAllUserData,actionToGetUserDataById } from '../../../actions/UserAction';
import { actionToGetBookingData } from '../../../actions/BookingAction';
import { actionToGetAllBookingDetailData } from '../../../actions/AdminAction';

const AdminDashboard: React.FC<RouteComponentProps> = ({match, history}) => {

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
    useEffect(()=>{
        dispatch(actionToGetBookingData());
        dispatch(actionToGetAllUserData());
        dispatch(actionToGetUserDataById(userInfo.userId)); 
        dispatch(actionToGetAllBookingDetailData());
    },[])
    return (
        <IonPage>
         <AdminHeaderComponent/>
        <IonContent>
          <div className="add_select_button_container">
            <IonGrid className="selection_dashboard_grid">
                 <IonRow>
                    <IonCol>
                    <button onClick={(e) => {
                        e.preventDefault();
                        history.push(`/tabs/dashboard/add-booking`);
                    }} className="update_user_data_button">
                        Add Booking
                    </button>
                    </IonCol>
                    <IonCol>
                    <button onClick={(e) => {
                                dispatch(actionToGetBookingData(0));
                        history.push(`/tabs/dashboard/select-bid-for-booking`);
                    }} className="update_user_data_button">
                        Select Bid for Booking
                    </button>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                    <button  onClick={(e) => {
                        history.push(`/tabs/dashboard/user-data-list`);
                    }}
                    className="update_user_data_button">
                       User List
                    </button>
                    </IonCol>
                    <IonCol>
                    <button  onClick={(e) => {
                        history.push(`/tabs/dashboard/booking-request-list`);
                    }}
                    className="update_user_data_button">
                       Booking Request
                    </button>
                    </IonCol>
                </IonRow>
            </IonGrid> 
           </div>
       
           </IonContent>
        </IonPage>
    );
  }

export default AdminDashboard;