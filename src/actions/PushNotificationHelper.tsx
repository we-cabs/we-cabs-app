import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import { actionToUpdateUserData } from './AdminAction';
import { actionToGetUserDataById } from './UserAction';
const { PushNotifications } = Plugins;

export function pushNotification(dispatch:any,state:any){
    
 // Register with Apple / Google to receive push via APNS/FCM
 PushNotifications.register();
    PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
     let userData = state.userSignin.userInfo;
     userData.deviceToken = token.value;
     dispatch(actionToUpdateUserData(userData));
    }
);
//  // Some issue with your setup and push will not work
 PushNotifications.addListener('registrationError',
    (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
    }
);
// // Show us the notification payload if the app is open on our device
PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotification) => {
        dispatch(actionToGetUserDataById(state.userSignin.userInfo.phone)); 
    }
);

// // Method called when tapping on a notification
PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: PushNotificationActionPerformed) => {
        dispatch(actionToGetUserDataById(state.userSignin.userInfo.phone)); 
    }
);
}