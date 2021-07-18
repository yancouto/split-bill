import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle } from '@ionic/react';
import { useContext, useState } from 'react';
import './Start.css';
import { ChangePage, PageType, StartState } from './types';

const parseToFloat = (v?: string | null) => {
    const parsed = Number.parseFloat(v ?? "");
    return parsed;
};

function nullthrows<T>(v: T | null | undefined): T {
    if (v == null) {
        throw new Error("null!");
    } else {
        return v;
    }
}

interface Props {
    state: StartState
}

const Start: React.FC<Props> = (props) => {
    const [val, setVal] = useState<number>(Number.NaN);
    const [people, setPeople] = useState<number>(2);
    const valid = val > 0;
    const changePage = useContext(ChangePage);

    function StartSplitting() {
        if (valid) {
            changePage({
                type: PageType.Split,
                val,
                people,
            });
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonTitle>Split Bill</IonTitle>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>$</IonLabel>
                        <IonInput autofocus required type="number" enterkeyhint="next" inputmode="numeric"
                            placeholder="Total value of the bill (no tip)"
                            onIonChange={e => setVal(parseToFloat(e.detail.value))}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>People</IonLabel>
                        <IonSelect value={people} interface="popover" onIonChange={e => setPeople(e.detail.value)}>
                            <IonSelectOption value={2}>2</IonSelectOption>
                            <IonSelectOption value={3}>3</IonSelectOption>
                            <IonSelectOption value={4}>4</IonSelectOption>
                            <IonSelectOption value={5}>5</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonButton expand="block" size="large"
                            onClick={StartSplitting}
                            disabled={!valid}>Start splitting</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Start;