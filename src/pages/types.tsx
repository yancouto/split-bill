import React from "react";

export enum PageType {
    Start,
    Split,
    Expense,
}

export type StartState = {
    type: PageType.Start,
};

export type Item = {
    // idx to value
    per_person: Map<number, number>
}

export type CurrentSplit = {
    total: number,
    names: string[],
    all_items: Item[],
}

export type SplitState = {
    type: PageType.Split,
    split: CurrentSplit,
};

export type ExpenseState = {
    type: PageType.Expense,
    split: CurrentSplit,
};

export type PageState = StartState | SplitState | ExpenseState;

// use this context getter to switch pages
export const ChangePage = React.createContext<(p: PageState) => void>(p => { });