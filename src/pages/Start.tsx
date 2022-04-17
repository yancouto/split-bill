import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useContext, useState } from "react";
import { parseToFloat } from "../common/utils";
import "./Start.css";
import { ChangePage, PageType, StartState } from "./types";
import Dinero from "dinero.js";

interface Props {
  state: StartState;
}

const Start: React.FC<Props> = (props) => {
  const [val, setVal] = useState<Dinero.Dinero>(Dinero());
  const [people, setPeople] = useState<number>(2);
  const valid = val.isPositive() && !val.isZero();
  const changePage = useContext(ChangePage);

  function StartSplitting() {
    if (valid) {
      changePage({
        type: PageType.Split,
        split: {
          total: val,
          names: [...Array(people).keys()].map(
            (i) => `Person ${String.fromCharCode("A".charCodeAt(0) + i)}`
          ),
          all_items: [],
        },
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
            <IonInput
              autofocus
              required
              type="number"
              enterkeyhint="next"
              inputmode="numeric"
              placeholder="Total value of the bill (no tip)"
              onIonChange={(e) =>
                setVal(Dinero({ amount: 100 * parseToFloat(e.detail.value) }))
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>People</IonLabel>
            <IonButton onClick={() => setPeople(Math.max(people - 1, 2))} disabled={people === 2}>
              -
            </IonButton>
            <IonLabel className="ion-text-center">{people}</IonLabel>
            <IonButton onClick={() => setPeople(people + 1)}>
              +
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton
              expand="block"
              size="large"
              onClick={StartSplitting}
              disabled={!valid}
            >
              Start splitting
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Start;
