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
import GoldBookingPageList from '../BookingDetailListPage/GoldBookingPageList';
import GoldBookingRequstPage from '../BiddingListPage/GoldBookingRequstPage';

const TabRoot: React.FC = () => {
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
    return (
      <>
       {(userInfo.role === 'admin') ? '' : <SideMenu/>}
       <IonTabs>
          <IonRouterOutlet id="main-content">
          {(userInfo.role === 'admin') 
              ? <Route path="/tabs/dashboard" component={AdminDashboard} exact={true} /> 
              : <Route path="/tabs/dashboard" component={DashboardPage} exact={true}/> 
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
          <Route path={`/tabs/dashboard/gold-booking-request-list`} component={SelectBidForBooking} />
          <Route path={`/tabs/dashboard/edit-booking-bids`} component={EditingBooking} />

         
          <Route path="/tabs/bidding-list" component={BiddingListPage} exact={true} /> 
          <Route path="/tabs/gold-booking-list" component={GoldBookingRequstPage} exact={true} /> 
          <Route path="/tabs/dashboard/contact-us" component={ContactUs} exact={true} /> 
          <Route path={`/tabs/dashboard/tripbooking`} component={TripBookingPage} />
          <Route path={`/tabs/dashboard/notification`} component={Notification} />
          <Route path={`/tabs/dashboard/enter-to-get-booking`} component={AddDetailToGetBooking} />
          <Route path={`/tabs/dashboard/my-profile`} component={ProfilePage} />
          <Route path={`/tabs/dashboard/bookingdetail`} component={BookingDetails} />
          <Route path={`/tabs/dashboard/gold-booking-list-page`} component={GoldBookingPageList} />
          <Route path={`/tabs/dashboard/show-bidding`} component={ShowSelectedBidDetailPage} />
          <Route path={`/tabs/dashboard/bidding`} component={BiddingPage} />
          <Route path="/tabs" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
          <Route path="/" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
        </IonRouterOutlet>
        {(userInfo.role === 'admin') ? 
          <IonTabBar slot="bottom" className="admin_bottom_toolbar">
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
               {(userInfo.role == 'goldDriver') ? 
               <IonTabButton tab="request" href="/tabs/gold-booking-list"> 
                <div className="tab_svg_icon_request">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 63.87"><path d="M7.23 0h111.93c2.05 0 3.72 1.68 3.72 3.72v31.62a3.74 3.74 0 0 1-3.72 3.72H34.18c-.83-.7-1.9-1.21-3.3-1.45-.11-.03-.23-.05-.35-.07h-.04c-.21-.38-.46-.73-.76-1.06-.86-.95-2.03-1.63-3.62-1.91l-.07-.02-.29-.05a3.44 3.44 0 0 0-.42-.03h-.05a5.2 5.2 0 0 0-.51-.65l-.19-.21c-.78-.75-1.78-1.32-3.08-1.61v-1.9c0-1.68-.39-3.13-1.03-4.34a7.43 7.43 0 0 0-3.17-3.14 7.25 7.25 0 0 0-1.54-.56c-.56-.14-1.11-.2-1.62-.2-.54 0-1.09.06-1.63.19a7.12 7.12 0 0 0-1.36.48l-.19.09c-1.27.65-2.39 1.7-3.15 3.16-.63 1.2-1.01 2.67-1.01 4.37v7.98l-.57-.31a7.83 7.83 0 0 0-1.77-.63l-.14-.03-.36-.06c-.28-.52-.44-1.12-.44-1.75V3.72A3.72 3.72 0 0 1 7.23 0h0zm2.4 46.06l-.15-.1-1.91-1.55-2.56-2.11c-.48-.4-1.02-.67-1.53-.77-.33-.06-.63-.06-.86.04-.19.08-.35.23-.47.48-.14.32-.21.77-.17 1.39.04.54.22 1.14.48 1.71.37.85.88 1.62 1.25 2.12l.06.09 7.5 10.71c.1.14.15.29.17.45h0c.15 1.24.41 2.16.8 2.75.28.42.65.64 1.1.62h.02 0 11.69.08c.73-.01 1.4-.23 2.01-.65.67-.46 1.28-1.18 1.84-2.15.01-.02.02-.03.03-.05l.77-1.29c1.2-1.97 2.24-3.68 2.36-6.12l-.08-3.37c-.01-.05-.01-.1-.01-.14l.01-.79c.03-2.22.06-4.98-1.97-5.32h-1.3-.01l-.09 1.88-.07 1.59c0 .55-.44.99-.99.99s-.99-.44-.99-.99l.08-1.71c.13-2.09.29-4.5-1.39-4.8h-1.3a1.49 1.49 0 0 1-.21-.02c.01.76-.04 1.55-.09 2.3l-.07 1.59c0 .55-.44.99-.99.99s-.99-.44-.99-.99l.08-1.71c.13-2.09.29-4.5-1.39-4.8h-1.3c-.09 0-.18-.01-.26-.04v3.83c0 .55-.44.99-.99.99s-.99-.44-.99-.99V29.85c0-1.72-.7-2.81-1.6-3.26-.33-.17-.68-.25-1.03-.25s-.7.08-1.03.25c-.89.45-1.58 1.54-1.58 3.3v18c0 .55-.44.99-.99.99s-.99-.44-.99-.99l.02-1.83h0 0zm9.2-11.68c.08-.02.17-.04.26-.04h1.36a.78.78 0 0 1 .22.03c1.82.28 2.63 1.34 2.96 2.71a.99.99 0 0 1 .42-.09h1.36a.78.78 0 0 1 .22.03c1.95.3 2.74 1.51 3.02 3.02.05-.01.1-.01.15-.01h1.36a.78.78 0 0 1 .22.03c3.74.58 3.7 4.3 3.66 7.3v.76.02l.08 3.46v.11c-.14 2.94-1.31 4.86-2.65 7.06l-.75 1.26c-.01.01-.01.03-.02.04-.7 1.22-1.51 2.16-2.43 2.79-.94.65-1.98.98-3.12 1h-.09-11.7 0c-1.18.02-2.09-.49-2.76-1.5-.54-.81-.9-1.94-1.09-3.37L2.16 48.5c-.01-.01-.02-.03-.03-.04-.44-.59-1.03-1.49-1.48-2.5-.33-.76-.59-1.58-.64-2.39-.06-.95.07-1.72.34-2.32.34-.75.87-1.23 1.52-1.5.61-.25 1.29-.28 1.98-.14.83.16 1.68.58 2.41 1.18l2.56 2.1.81.66V29.89c0-2.62 1.17-4.3 2.66-5.07.6-.31 1.26-.46 1.92-.46s1.32.15 1.92.46c1.51.76 2.69 2.45 2.69 5.02v4.54h.01 0zm6.44-23.95h4.98c1.57 0 2.77.11 3.58.35a3.51 3.51 0 0 1 1.96 1.41c.5.71.75 1.85.75 3.42 0 1.06-.17 1.8-.53 2.22-.35.42-1.05.74-2.09.97 1.16.25 1.95.66 2.36 1.23s.62 1.45.62 2.64v1.69c0 1.23-.15 2.14-.45 2.73a2.4 2.4 0 0 1-1.41 1.22c-.65.22-1.98.33-3.99.33h-5.78V10.43h0zm5.01 3.1v4.05l.49-.01c.48 0 .79-.11.92-.34s.2-.89.2-1.96c0-.57-.05-.97-.16-1.2s-.25-.37-.43-.43c-.18-.07-.52-.1-1.02-.11h0zm0 6.88v5.11c.69-.02 1.13-.13 1.32-.31.19-.19.28-.65.28-1.39v-1.7c0-.78-.09-1.25-.26-1.42-.16-.18-.61-.27-1.34-.29h0zm19.83.68l-.14 3.88c-.09.76-.37 1.46-.85 2.09s-1.13 1.11-1.94 1.45-1.76.51-2.85.51c-1.03 0-1.95-.16-2.77-.48s-1.48-.79-1.97-1.43c-.5-.64-.79-1.33-.89-2.08-.09-.75-.14-2.06-.14-3.93v-3.11l.14-3.88c.09-.76.37-1.46.85-2.09s1.13-1.11 1.94-1.45 1.76-.51 2.85-.51c1.03 0 1.95.16 2.77.48s1.48.79 1.97 1.43c.5.64.79 1.33.89 2.08.09.75.14 2.06.14 3.93v3.11h0zm-5.01-5.98c0-.84-.05-1.38-.15-1.62-.1-.23-.3-.35-.6-.35-.26 0-.45.1-.59.29-.13.19-.2.75-.2 1.69v8.49c0 1.05.04 1.71.13 1.95.09.25.3.37.62.37.33 0 .55-.14.64-.43.09-.28.14-.96.14-2.03v-8.36h.01zm18.3 5.98l-.14 3.88c-.09.76-.37 1.46-.85 2.09s-1.13 1.11-1.94 1.45-1.76.51-2.85.51c-1.03 0-1.95-.16-2.77-.48s-1.48-.79-1.97-1.43c-.5-.64-.79-1.33-.89-2.08-.09-.75-.14-2.06-.14-3.93v-3.11l.14-3.88c.09-.76.37-1.46.85-2.09s1.13-1.11 1.94-1.45 1.76-.51 2.85-.51c1.03 0 1.95.16 2.77.48s1.48.79 1.97 1.43c.5.64.79 1.33.89 2.08.09.75.14 2.06.14 3.93v3.11h0zm-5.01-5.98c0-.84-.05-1.38-.15-1.62-.1-.23-.3-.35-.6-.35-.26 0-.45.1-.59.29-.13.19-.2.75-.2 1.69v8.49c0 1.05.04 1.71.13 1.95.09.25.3.37.62.37.33 0 .55-.14.64-.43.09-.28.14-.96.14-2.03v-8.36h.01zm18.82-4.68l-2.86 8.22 3.13 9.98h-5.16l-2.03-7.8v7.8h-5.01v-18.2h5.01v7.07l2.25-7.07h4.67 0zm6.13 0v18.19h-5.01V10.43h5.01 0zm13.17 0v18.19h-4.38l-2.6-8.27v8.27h-4.18V10.43h4.18l2.8 8.19v-8.19h4.18 0zm13.46 6.71h-5.01v-1.65c0-1.04-.04-1.69-.14-1.96-.09-.26-.32-.39-.67-.39-.3 0-.51.11-.62.34-.11.22-.16.8-.16 1.73v8.73c0 .81.05 1.35.16 1.61s.32.39.65.39c.36 0 .6-.15.73-.44s.19-.86.19-1.71v-2.15h-.97v-2.76h5.84v9.75h-3.15l-.46-1.3c-.34.56-.77.99-1.29 1.27s-1.13.43-1.83.43c-.84 0-1.62-.19-2.36-.58-.73-.39-1.29-.86-1.66-1.43-.38-.57-.62-1.17-.71-1.79s-.14-1.56-.14-2.81v-5.41c0-1.74.1-3 .3-3.78.2-.79.77-1.51 1.7-2.17.94-.66 2.15-.98 3.64-.98 1.46 0 2.68.28 3.64.85s1.6 1.25 1.89 2.03c.29.79.44 1.92.44 3.42v.76h-.01z" fill-rule="evenodd"/></svg>
                    <br></br><span className="tab_label">Gold Requests</span>
                  </div>
               </IonTabButton>
               :''}
          </IonTabBar>
        }
        </IonTabs>
      </>
    );
  }

export default TabRoot;