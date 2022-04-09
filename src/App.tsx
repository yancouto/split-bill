import { IonApp } from "@ionic/react";
import Start from "./pages/Start";
import Split from "./pages/Split";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useState } from "react";
import { ChangePage, PageState, PageType } from "./pages/types";
import Expense from "./pages/Expense";

/* Dinero.js defaults */
import Dinero from "dinero.js";
Dinero.defaultCurrency = "USD";
Dinero.defaultPrecision = 2;

const App: React.FC = () => {
  const [page, setPage] = useState<PageState>(() => ({ type: PageType.Start }));
  let element;
  if (page.type === PageType.Start) {
    element = <Start state={page} />;
  } else if (page.type === PageType.Split) {
    element = <Split state={page} />;
  } else if (page.type === PageType.Expense) {
    element = <Expense state={page} />;
  }
  return (
    <IonApp>
      <ChangePage.Provider value={setPage}>{element}</ChangePage.Provider>
    </IonApp>
  );
};

export default App;
