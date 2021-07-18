import { IonContent, IonHeader, IonPage, IonTitle } from '@ionic/react';
import './Start.css';
import { SplitState } from './types';

interface Props {
    state: SplitState
}

const Split: React.FC<Props> = (props) => {
    console.log(props);
    return (
        <IonPage>
            <IonHeader>
                <IonTitle>Split Bill</IonTitle>
            </IonHeader>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    );
};

export default Split;