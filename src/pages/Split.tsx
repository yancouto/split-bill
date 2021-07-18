import { IonButton, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle } from '@ionic/react';
import { useContext, useState } from 'react';
import './Start.css';
import { ChangePage, PageType, SplitState } from './types';

interface Props {
    state: SplitState
}

type Person = {
    idx: number,
    value: number,
}

type Item = {
    per_person: Person[],
}

type SplitStatusRaw = {
    names: string[],
    all_items: Item[],
}

type SplitStatus = {
    left: number,
    total_per_person: Map<number, number>,
}

function derive(total: number, s: SplitStatusRaw): SplitStatus {
    const people: Map<number, number> = new Map();
    s.all_items.forEach(i => i.per_person.forEach(p => people.set(p.idx, people.get(p.idx) ?? 0 + p.value)));
    const spent = [...people.values()].reduce((acc, cur) => acc + cur, 0);
    return {
        left: total - spent,
        total_per_person: people,
    };
}

const Split: React.FC<Props> = (props) => {
    const [status, setStatus] = useState<SplitStatusRaw>(() => ({
        names: [...Array(props.state.people).keys()].map(i => `Person ${i}`),
        all_items: [],
    }));
    const derived = derive(props.state.val, status);
    const changePage = useContext(ChangePage);
    function addExpense() {
        changePage({
            type: PageType.Expense,
            left: derived.left,
            people: props.state.people
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
                    {status.all_items.map((it, idx) => <IonItem key={idx}><IonLabel>${it.per_person.reduce<number>((acc, cur) => acc + cur.value, 0)}</IonLabel></IonItem>)}
                    <IonItemDivider><IonLabel>People:</IonLabel></IonItemDivider>
                    {status.names.map((name, idx) => <IonItem key={idx}><IonLabel>{name}: ${derived.total_per_person.get(idx) ?? 0}</IonLabel></IonItem>)}
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