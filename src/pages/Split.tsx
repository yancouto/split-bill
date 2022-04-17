import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useContext } from "react";
import "./Start.css";
import { ChangePage, CurrentSplit, PageType, SplitState } from "./types";
import Dinero from "dinero.js";
import { totalmem } from "os";

interface Props {
  state: SplitState;
}

export type SplitStatus = {
  left: Dinero.Dinero;
  total_per_person: Map<number, Dinero.Dinero>;
};

export function derive(s: CurrentSplit): SplitStatus {
  const people: Map<number, Dinero.Dinero> = new Map();
  s.all_items.forEach((i) =>
    i.per_person.forEach((value, idx) =>
      people.set(idx, (people.get(idx) ?? Dinero()).add(value))
    )
  );
  const spent = [...people.values()].reduce(
    (acc, cur) => acc.add(cur),
    Dinero()
  );
  return {
    left: s.total.subtract(spent),
    total_per_person: people,
  };
}

const Split: React.FC<Props> = (props) => {
  const split = props.state.split;
  const derived = derive(split);
  const changePage = useContext(ChangePage);
  function addExpense() {
    changePage({
      type: PageType.Expense,
      split: split,
    });
  }
  function undoLastItem() {
    const last = split.all_items.pop();
    if (last) {
      changePage({
        type: PageType.Split,
        split: {
          all_items: split.all_items,
          names: split.names,
          total: split.total,
        },
      });
    }
  }
  function startOver() {
    changePage({
      type: PageType.Start,
    });
  }
  function changePersonName(idx: number, name: string | null | undefined) {
    if (name) {
      const newNames = [...split.names];
      newNames[idx] = name;
      changePage({
        type: PageType.Split,
        split: {
          all_items: split.all_items,
          total: split.total,
          names: newNames,
        }
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
            <IonLabel>Left to split: ${derived.left.toUnit()}</IonLabel>
          </IonItem>
          <IonItemDivider>
            <IonLabel>Items:</IonLabel>
          </IonItemDivider>
          {split.all_items.map((it, idx) => (
            <IonItem key={idx}>
              <IonLabel>
                $
                {[...it.per_person.values()]
                  .reduce<Dinero.Dinero>((acc, cur) => acc.add(cur), Dinero())
                  .toUnit()}
              </IonLabel>
            </IonItem>
          ))}
          <IonItemDivider>
            <IonLabel>People:</IonLabel>
          </IonItemDivider>
          {split.names.map((name, idx) => (
            <IonItem key={idx}>
              <IonInput
                type="text"
                inputmode="text"
                value={name}
                onIonChange={(e) => {
                  changePersonName(idx, e.detail.value);
                }}
              ></IonInput>
              <IonLabel>
                $ {(derived.total_per_person.get(idx) ?? Dinero()).toUnit()}
              </IonLabel>
            </IonItem>
          ))}
          <IonItem>
            <IonButton
              disabled={derived.left.isZero()}
              expand="block"
              size="large"
              onClick={addExpense}
            >
              Add new item
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton
              disabled={split.all_items.length === 0}
              expand="block"
              size="large"
              onClick={undoLastItem}
            >
              Undo last item
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton
              expand="block"
              size="large"
              color="danger"
              onClick={startOver}
            >
              Start over
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Split;
