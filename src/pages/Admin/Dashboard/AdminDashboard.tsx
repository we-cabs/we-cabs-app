import { IonPage,IonRow,IonCol } from '@ionic/react';
import React,{useEffect} from 'react';
import { useDispatch,useSelector,RootStateOrAny } from 'react-redux';
import './AdminDashboard.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import { actionToGetAllUserData } from '../../../actions/UserAction';

const AdminDashboard: React.FC<RouteComponentProps> = ({match, history}) => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllUserData());
    },[])
    return (
        <IonPage>
         <AdminHeaderComponent/>
          <div className="main_body_content_container">
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
                        history.push(`/tabs/dashboard/select-bid-foe-booking`);
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
                        history.push(`/tabs/dashboard/update-user-data`);
                    }}
                    className="update_user_data_button">
                        Update User Data
                    </button>
                    </IonCol>
                </IonRow>
           </div>
        </div>
        </IonPage>
    );
  }

export default AdminDashboard;