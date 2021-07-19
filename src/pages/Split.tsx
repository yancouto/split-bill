import { IonButton, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle } from '@ionic/react';
import { useContext } from 'react';
import './Start.css';
import { ChangePage, CurrentSplit, PageType, SplitState } from './types';

interface Props {
    state: SplitState
}

type SplitStatus = {
    left: number,
    total_per_person: Map<number, number>,
}

function derive(s: CurrentSplit): SplitStatus {
    const people: Map<number, number> = new Map();
    s.all_items.forEach(i => i.per_person.forEach((value, idx) => people.set(idx, people.get(idx) ?? 0 + value)));
    const spent = [...people.values()].reduce((acc, cur) => acc + cur, 0);
    return {
        left: s.total - spent,
        total_per_person: people,
    };
}

const Split: React.FC<Props> = (props) => {
    const derived = derive(props.state.split);
    const changePage = useContext(ChangePage);
    function addExpense() {
        changePage({
            type: PageType.Expense,
            split: props.state.split,
        })
    }
    function startOver() {
        changePage({
            type: PageType.Start,
        })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonTitle>Split Bill</IonTitle>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>Left to split: ${derived.left}</IonLabel>
                    </IonItem>
                    <IonItemDivider><IonLabel>Items:</IonLabel></IonItemDivider>
                    {props.state.split.all_items.map((it, idx) => <IonItem key={idx}><IonLabel>${[...it.per_person.values()].reduce<number>((acc, cur) => acc + cur, 0)}</IonLabel></IonItem>)}
                    <IonItemDivider><IonLabel>People:</IonLabel></IonItemDivider>
                    {props.state.split.names.map((name, idx) => <IonItem key={idx}><IonLabel>{name}: ${derived.total_per_person.get(idx) ?? 0}</IonLabel></IonItem>)}
                    <IonItem>
                        <IonButton disabled={derived.left === 0} expand="block" size="large"
                            onClick={addExpense}
                        >Add new item</IonButton>
                    </IonItem>
                    <IonItem>
                        <IonButton disabled={derived.left === 0} expand="block" size="large" color="danger"
                            onClick={startOver}
                        >Start over</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage >
    );
};

export default Split;