import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle } from '@ionic/react';
import { useContext, useState } from 'react';
import { parseToFloat } from '../common/utils';
import { derive } from './Split';
import './Start.css';
import { ChangePage, ExpenseState, PageType, StartState } from './types';

interface Props {
    state: ExpenseState
}

const Expense: React.FC<Props> = (props) => {
    const derived = derive(props.state.split);
    const [price, setPrice] = useState<number>(Number.NaN);
    const [sharesPerPerson, setSharesPerPerson] = useState<Map<number, number>>(() => new Map());
    const totalShares = [...sharesPerPerson.values()].reduce((acc, cur) => acc + cur, 0);
    const valid = price > 0 && totalShares > 0 && price <= derived.left;
    const changePage = useContext(ChangePage);

    function componentForPerson(name: string, idx: number) {
        const shares = sharesPerPerson.get(idx) ?? 0;
        let part;
        if (totalShares > 0 && price > 0) {
            part = <IonLabel>~ ${(price * shares) / totalShares}</IonLabel>;
        }
        return <IonItem key={idx}>
            <IonLabel>{name}:</IonLabel>
            <IonInput type="number" inputmode="numeric" placeholder="0"
                value={shares}
                onIonChange={e => {
                    const newShares = new Map(sharesPerPerson);
                    newShares.set(idx, parseToFloat(e.detail.value));
                    setSharesPerPerson(newShares);
                }} ></IonInput>
            {part}
        </IonItem>;
    }

    function saveExpense() {
        const idxToValue: Map<number, number> = new Map();
        for (const [idx, shares] of sharesPerPerson) {
            idxToValue.set(idx, price * shares / totalShares);
        }
        const split = props.state.split;
        changePage({
            type: PageType.Split,
            split: {
                all_items: [...split.all_items, { per_person: idxToValue }],
                names: split.names,
                total: split.total,
            },
        });
    }

    function cancel() {
        changePage({
            type: PageType.Split,
            split: props.state.split,
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonTitle>Split Bill</IonTitle>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>Price:</IonLabel>
                        <IonInput type="number" inputmode="numeric" placeholder="0"
                            value={price}
                            onIonChange={e => setPrice(parseToFloat(e.detail.value))} ></IonInput>
                    </IonItem>
                    <IonItemDivider>
                        <IonLabel>Shares per person</IonLabel>
                    </IonItemDivider>
                    {props.state.split.names.map(componentForPerson)}
                    <IonItem>
                        <IonButton disabled={!valid} expand="block" size="large" onClick={saveExpense}>Save expense</IonButton>
                    </IonItem>
                    <IonItem>
                        <IonButton expand="block" size="large" onClick={cancel}>Delete expense</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Expense;