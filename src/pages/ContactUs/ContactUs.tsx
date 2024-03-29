import {IonContent, IonPage} from '@ionic/react';
import React, { useState,useEffect } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { useDispatch,useSelector,RootStateOrAny } from 'react-redux';
import { signin } from '../../actions/UserAction';
import './ContactUs.css'
import { RouteComponentProps } from 'react-router-dom';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';


const ContactUs: React.FC<RouteComponentProps> = ({match,history}) => {
 
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const hrederTitle = () =>{
    return 'Contact Us';
  }
    

    return (
        <IonPage>
          <SubPageHeaderComponent title={hrederTitle()}/>
          <IonContent>
          <div className="contact_us_main_section">
          <IonRow>
            <IonCol className="comntact_us_profile_icon_section_column">
                  <div className="comntact_us_profile_icon">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.806 80.654C3.806 35.715 40.56-.64 85.648.009c43.675.628 79.188 36.446 79.464 80.124.155 24.461-10.583 46.414-27.645 61.305-1.801 1.571-1.541 4.439.516 5.656l15.197 8.992c2.457 1.454 1.426 5.22-1.429 5.22l-68.818-.017c-43.839-.815-79.127-36.602-79.127-80.635z" fill="#7acaa6"/><path d="M153.18 156.086l-15.198-8.992c-2.046-1.21-2.33-4.074-.539-5.636 17.257-15.049 28.051-37.322 27.66-62.108-.677-42.873-35.377-78.066-78.238-79.315a81.28 81.28 0 0 0-17.727 1.419c37.047 7.102 65.281 39.757 65.527 78.678.119 18.849-6.23 36.209-16.956 49.996-6.477 8.325-4.372 20.397 4.706 25.769l.318.188c2.43 1.438 1.444 5.132-1.339 5.212l30.356.007c2.855.002 3.887-3.765 1.43-5.218z" fill="#57be92"/><path d="M396.792 292.755H213.826c-45.698 0-70.706-53.256-41.519-88.42l1.623-1.956c12.858-15.491 19.896-34.99 19.896-55.122v-35.283C193.827 50.132 243.959 0 305.801 0s111.974 50.132 111.974 111.974v36.474c0 20.343 7.186 40.032 20.29 55.593 29.551 35.092 4.605 88.714-41.273 88.714z" fill="#c59191"/><path d="M492.97 383.43v120.96H117.65V384.34c0-27.18 16.29-51.71 41.33-62.25l60.59-26.34 20.4-8.87c15.48-6.73 25.49-22 25.49-38.88v-7.83h79.69v7.43c0 16.95 10.11 32.28 25.7 38.96l81.95 35.13a67.53 67.53 0 0 1 40.17 61.74z" fill="#fff"/><path d="M219.565 324.59c20.679 6.179 51.116 12.769 88.217 12.12a290.46 290.46 0 0 0 83.271-13.728l9.88-23.527-30.086-12.895c-15.586-6.681-25.692-22.006-25.692-38.964v-7.424h-79.69V248c0 16.878-10.012 32.147-25.489 38.877l-24.368 10.595z" fill="#ffcebf"/><path d="M452.796 321.685l-61.732-26.459-.011.001v209.161h101.918V383.431a67.54 67.54 0 0 0-40.175-61.746zM219.57 295.75v208.64H117.65V384.34c0-27.18 16.29-51.71 41.33-62.25z" fill="#8795de"/><path d="M332.933 283.912c9.168 0 17.904-1.841 25.867-5.163-8.542-7.885-13.646-19.105-13.646-31.152v-7.424h-79.69V248c0 6.097-1.313 11.982-3.712 17.332 12.067 11.503 28.392 18.579 46.379 18.579h24.802z" fill="#ffb09e"/><path d="m384.957 120.293v65.925c0 37.14-30.108 67.247-67.247 67.247h-24.801c-37.14 0-67.247-30.108-67.247-67.247v-65.925c0-24.161 19.586-43.748 43.748-43.748h71.8c24.161.001 43.747 19.587 43.747 43.748z" fill="#ffcebf"/><path d="M384.957 154.593l-.094.272c-2.431 8.395-8.811 24.253-24.229 36.142-7.179 5.537-15.368 9.537-24.338 11.891-4.066 1.067-6.498 5.228-5.431 9.294.898 3.419 3.981 5.682 7.358 5.682.639 0 1.289-.081 1.937-.251 10.952-2.874 20.968-7.773 29.771-14.56 6.079-4.688 10.999-9.866 14.982-15.072l.045-1.771v-31.627z" fill="#7a6d79"/><path d="M327.949 223.939h-17.837c-8.119 0-14.701-6.582-14.701-14.701s6.582-14.701 14.701-14.701h17.837c8.119 0 14.701 6.582 14.701 14.701s-6.582 14.701-14.701 14.701z" fill="#685e68"/><path d="m321.201 59.097c1.708-21.54 22.33-35.835 42.067-43.239 32.649 19.563 54.507 55.284 54.507 96.115v7.698c-1.805.379-3.601.711-5.377.976-10.873 1.624-20.132.921-26.458 0-40.763-5.43-66.802-35.535-64.739-61.55z" fill="#b98080"/><path d="M305.801 0a111.47 111.47 0 0 1 67.361 22.525c-9.351 16.271-30.823 48.441-71.086 72.257-29.89 17.681-58.074 23.622-75.43 25.865h-32.818v-8.674C193.827 50.132 243.959 0 305.801 0z" fill="#c59191"/><path d="M430.971 504.388H187.317l-13.439-126.775c-.953-8.992 6.096-16.828 15.138-16.828h240.257c9.042 0 16.091 7.836 15.138 16.828z" fill="#efedef"/><path d="m429.272 360.785h-30.446c9.042 0 16.091 7.836 15.138 16.828l-13.439 126.776h30.446l13.439-126.776c.954-8.992-6.095-16.828-15.138-16.828z" fill="#e5e1e5"/><g fill="#c9bfc8"><path d="M504.5 512H7.5a7.5 7.5 0 1 1 0-15h497a7.5 7.5 0 1 1 0 15z"/><circle cx="309.144" cy="432.587" r="21.312"/></g><g fill="#fff"><circle cx="54.014" cy="80.653" r="7.611"/><circle cx="84.46" cy="80.653" r="7.611"/><circle cx="114.906" cy="80.653" r="7.611"/></g></svg>
                  </div>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <div className="contact_us_token_label">
                Your Name:
                </div>
                <input className="signup_inout_section" onChange={(e)=>setName(e.target.value || '')} value={name}  type="text" placeholder="Enter your Name" required></input>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <div className="contact_us_token_label">
                Email:
                </div>
                <input className="signup_inout_section" type="email" onChange={(e)=>setEmail(e.target.value || '')} value={email}  placeholder="Enter your Email" required></input>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <div className="contact_us_token_label">
                Phone Number:
                </div>
                <input className="signup_inout_section" type="text" onChange={(e)=>setPhone(e.target.value || '')} value={phone}  placeholder="Enter your Phone Number" required></input>
            </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <div className="contact_us_token_label">
                    Description:
                    </div>
                    <textarea className="signup_inout_section" cols={4} onChange={(e)=>setDescription(e.target.value || '')} value={description}  placeholder="" required></textarea>
                </IonCol>
            </IonRow>
            <div className="contact_us_button_section">
                <button className="contact_us_button">Submit</button>
            </div>
            </div>
          </IonContent>
        </IonPage>
    );
};
export default ContactUs;
