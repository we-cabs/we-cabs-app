import { IonButton } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
       <IonButton>One way</IonButton>
       <IonButton>Round Trips</IonButton>
    </div>
  );
};

export default ExploreContainer;
