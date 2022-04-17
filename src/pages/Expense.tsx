import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useContext, useState } from "react";
import { parseToFloat } from "../common/utils";
import { derive } from "./Split";
import "./Start.css";
import { ChangePage, ExpenseState, PageType } from "./types";
import Dinero from "dinero.js";

interface Props {
  state: ExpenseState;
}

const Expense: React.FC<Props> = (props) => {
  const derived = derive(props.state.split);
  const [price, setPrice] = useState<Dinero.Dinero>(Dinero());
  const [sharesPerPerson, setSharesPerPerson] = useState<Map<number, number>>(
    () => new Map()
  );
  const totalShares = [...sharesPerPerson.values()].reduce(
    (acc, cur) => acc + cur,
    0
  );
  const valid =
    price.isPositive() &&
    totalShares > 0 &&
    price.lessThanOrEqual(derived.left);
  const changePage = useContext(ChangePage);

  function componentForPerson(name: string, idx: number) {
    const shares = sharesPerPerson.get(idx) ?? 0;
    const part = (
      <IonLabel style={{ "height": "100%", "alignItems": "center", "display": "flex" }}>
        ~ $
        {totalShares > 0 && price.isPositive()
          ? price.multiply(shares).divide(totalShares).toUnit()
          : Dinero().toUnit()}
      </IonLabel>
    );

    const changeShares = (delta: number) => {
      const newShares = new Map(sharesPerPerson);
      newShares.set(idx, Math.max(shares + delta, 0));
      setSharesPerPerson(newShares);
    };
    return (
      <IonItem key={idx}>
        <IonGrid>
          <IonRow>
            <IonCol size="4">{name}:</IonCol>
            <IonCol>
              <IonButton
                onClick={() => changeShares(-1)}
                disabled={shares === 0}
              >
                -
              </IonButton>
            </IonCol>
            <IonCol>
              <IonInput
                type="number"
                inputmode="numeric"
                placeholder="0"
                value={shares}
                min="0"
                clearOnEdit={true}
                onIonChange={(e) => {
                  changeShares(parseToFloat(e.detail.value) - shares);
                }}
              ></IonInput>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => changeShares(1)}>+</IonButton>
            </IonCol>
            <IonCol size="4">{part}</IonCol>
          </IonRow>
        </IonGrid>
      </IonItem >
    );
  }

  function saveExpense() {
    const idxToValue: Map<number, Dinero.Dinero> = new Map();
    for (const [idx, shares] of sharesPerPerson) {
      idxToValue.set(idx, price.multiply(shares).divide(totalShares));
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
            <IonInput
              type="number"
              inputmode="numeric"
              placeholder="0"
              value={price.toUnit()}
              onIonChange={(e) =>
                setPrice(Dinero({ amount: 100 * parseToFloat(e.detail.value) }))
              }
            ></IonInput>
          </IonItem>
          <IonItemDivider>
            <IonLabel>Shares per person</IonLabel>
          </IonItemDivider>
          {props.state.split.names.map(componentForPerson)}
          <IonItem>
            <IonButton
              disabled={!valid}
              expand="block"
              size="large"
              onClick={saveExpense}
            >
              Save expense
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton expand="block" size="large" onClick={cancel}>
              Delete expense
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Expense;
