import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle } from '@ionic/react';
import { useContext, useState } from 'react';
import './Start.css';
import { ChangePage, ExpenseState, PageType, StartState } from './types';

interface Props {
    state: ExpenseState
}

const Expense: React.FC<Props> = (props) => {

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

export default Expense;