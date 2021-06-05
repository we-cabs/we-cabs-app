import React from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import {
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';
import DashboardPage from '../Dashboard/DashboardPage';
import { SideMenu } from '../../components/MenuDrawer/SideMenu';
import { home, informationCircle} from 'ionicons/icons';
import TripBookingPage from '../TripBookingPage/TripBookingPage';
import BookingDetails from '../BookingDetailListPage/BookingDetails';
import BiddingPage from '../BiddingPage/BiddingPage';
import AddBooking from '../Admin/AddBooking/AddBooking';
import SelectBidForBooking from '../Admin/SelectBidForBooking/SelectBidForBooking';
import './TabRoot.css';
import BiddingListPage from '../BiddingListPage/BiddingListPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import UserCars from '../Admin/UserCars/UserCars';
import AddUserCar from '../Admin/AddUserCar/AddUserCar';
import Notification from '../Notification/Notification';
import AddDetailToGetBooking from '../AddDetailToGetBooking/AddDetailToGetBooking';
import BookingBids from '../Admin/BookingBids/BookingBids';
import UpdateUserCarData from '../Admin/AddUserCar/UpdateUserCarData';
import UserDataList from '../Admin/UserDataList/UserDataList';
import UpdateUserData from '../Admin/UpdateUserData/UpdateUserData';
import AddUser from '../Admin/UpdateUserData/AddUser';
import ShowSelectedBidDetailPage from '../BiddingPage/ShowSelectedBidDetailPage';
import BookingRequestList from '../Admin/BookingRequestList/BookingRequestList';
import ContactUs from '../ContactUs/ContactUs';
import EditingBooking from '../Admin/AddBooking/EditingBooking';

const TabRoot: React.FC = () => {
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
    return (
      <>
       {(userInfo.role === 'admin') ? '' : <SideMenu/>}
       <IonTabs>
          <IonRouterOutlet id="main-content">
            {(userInfo.role === 'admin') 
              ? <Route path="/tabs/dashboard" component={AdminDashboard} exact={true} /> 
              : <Route path="/tabs/dashboard" component={DashboardPage} exact={true} /> 
            }
            
          <Route path={`/tabs/dashboard/add-booking`} component={AddBooking} />
          <Route path={`/tabs/dashboard/select-bid-for-booking`} component={SelectBidForBooking} />
          <Route path={`/tabs/dashboard/user-data-list`} component={UserDataList} />
          <Route path={`/tabs/dashboard/user-cars`} component={UserCars} />
          <Route path={`/tabs/dashboard/add-user-cars`} component={AddUserCar} />
          <Route path={`/tabs/dashboard/add-user`} component={AddUser} />
          <Route path={`/tabs/dashboard/booking-bids/:bookingData`} component={BookingBids} />
          <Route path={`/tabs/dashboard/update-car-data`} component={UpdateUserCarData} />
          <Route path={`/tabs/dashboard/update-user-data`} component={UpdateUserData} />
          <Route path={`/tabs/dashboard/booking-request-list`} component={BookingRequestList} />
          <Route path={`/tabs/dashboard/edit-booking-bids`} component={EditingBooking} />

         
          <Route path="/tabs/bidding-list" component={BiddingListPage} exact={true} /> 
          <Route path="/tabs/dashboard/contact-us" component={ContactUs} exact={true} /> 
          <Route path={`/tabs/dashboard/tripbooking`} component={TripBookingPage} />
          <Route path={`/tabs/dashboard/notification`} component={Notification} />
          <Route path={`/tabs/dashboard/enter-to-get-booking`} component={AddDetailToGetBooking} />
          <Route path={`/tabs/dashboard/my-profile`} component={ProfilePage} />
          <Route path={`/tabs/dashboard/bookingdetail`} component={BookingDetails} />
          <Route path={`/tabs/dashboard/show-bidding`} component={ShowSelectedBidDetailPage} />
          <Route path={`/tabs/dashboard/bidding`} component={BiddingPage} />
          <Route path="/tabs" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
          <Route path="/" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
        </IonRouterOutlet>
        {(userInfo.role === 'admin') ? 
          <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/tabs/dashboard"> 
              <IonIcon className="active" icon={home} />
              <IonLabel className="active">Home</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="about" href="">
              <IonIcon icon={informationCircle} />
              <IonLabel >About</IonLabel>
          </IonTabButton> */}
          </IonTabBar>
        :
          <IonTabBar slot="bottom">
   
            <IonTabButton tab="dashboard" href="/tabs/dashboard"> 
                <div className="tab_svg_icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"><path d="M503.402 228.885L273.684 19.567a26.13 26.13 0 0 0-35.367-.001L8.598 228.886c-8.077 7.36-10.745 18.7-6.799 28.889s13.557 16.772 24.484 16.772h36.69v209.721a15.06 15.06 0 0 0 15.057 15.057h125.914a15.06 15.06 0 0 0 15.057-15.057V356.932h74.002v127.337a15.06 15.06 0 0 0 15.057 15.057h125.908a15.06 15.06 0 0 0 15.057-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.941-10.19 1.273-21.529-6.804-28.89zM445.092 42.73H343.973l116.176 105.636v-90.58a15.06 15.06 0 0 0-15.057-15.056z"/></svg>
                  <br></br><span className="tab_label">Home</span>
                </div>
               </IonTabButton>
               <IonTabButton tab="bid" href="/tabs/bidding-list"> 
                <div className="tab_svg_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M0 88h56v8H0zm48-8.065a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4V84h40zm6.426-32.704a27.906 27.906 0 0 0-4.639 6.674l32.924 32.924a4 4 0 0 0 5.656 0l5.657-5.657a4 4 0 0 0 0-5.657L61.1 42.6a27.263 27.263 0 0 0-6.674 4.631zM34.627 27.432a34.686 34.686 0 0 1-10.34 6.629l20.674 20.674A35.253 35.253 0 0 1 51.6 44.4a34.715 34.715 0 0 1 10.34-6.63L41.265 17.1a35.282 35.282 0 0 1-6.638 10.332z"/><rect height="40" rx="4" transform="matrix(.707 -.707 .707 .707 4.201 48.034)" width="16" x="52.083" y="-1.054"/><rect height="40" rx="4" transform="matrix(.707 -.707 .707 .707 -29.74 33.976)" width="16" x="18.142" y="32.887"/></svg>
                    <br></br><span className="tab_label">My Bids</span>
                  </div>
               </IonTabButton>
     
          </IonTabBar>
        }
        </IonTabs>
      </>
    );
  }

export default TabRoot;