import React from "react";

export enum PageType {
    Start,
    Split,
    Expense,
}

export type StartState = {
    type: PageType.Start,
};

export type SplitState = {
    type: PageType.Split,
    val: number,
    people: number,
};

export type ExpenseState = {
    type: PageType.Expense,
    left: number,
    people: number,
};

export type PageState = StartState | SplitState | ExpenseState;

// use this context getter to switch pages
export const ChangePage = React.createContext<(p: PageState) => void>(p => { });