import React from "react";
import Dinero from "dinero.js";

export enum PageType {
  Start,
  Split,
  Expense,
}

export type StartState = {
  type: PageType.Start;
};

export type Item = {
  // idx to value
  per_person: Map<number, Dinero.Dinero>;
};

export type CurrentSplit = {
  total: Dinero.Dinero;
  names: string[];
  all_items: Item[];
};

export type SplitState = {
  type: PageType.Split;
  split: CurrentSplit;
};

export type ExpenseState = {
  type: PageType.Expense;
  split: CurrentSplit;
};

export type PageState = StartState | SplitState | ExpenseState;

// use this context getter to switch pages
export const ChangePage = React.createContext<(p: PageState) => void>(
  (p) => { }
);

export const stateToString = (s: PageState): string => {
  let json;
  if (s.type === PageType.Start) {
    json = s;
  } else {
    json = {
      type: s.type,
      split: {
        names: s.split.names,
        total: s.split.total,
        all_items: s.split.all_items.map(item => ({
          per_person: Object.fromEntries(item.per_person.entries())
        }))
      }
    }
  }

  console.log(JSON.stringify(json));
  return JSON.stringify(json);
};

export const stateFromString = (s: string): PageState => {
  const obj = JSON.parse(s);
  console.log(obj);
  const type = obj["type"];
  if (type === PageType.Start) {
    return { type: PageType.Start };
  } else {
    const split = obj["split"];
    return {
      type: type,
      split: {
        total: Dinero(split["total"]),
        names: split["names"],
        all_items: split["all_items"].map((item: any) => ({
          per_person: new Map(Object.entries(item["per_person"])
            .map((val: any) => {
              const [idx, value] = val;
              return [Number.parseInt(idx), Dinero(value)];
            }))
        }))
      }
    };
  }
};