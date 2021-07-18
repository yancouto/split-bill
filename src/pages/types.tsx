import React from "react";

export enum PageType {
    Start,
    Split,
}

export type StartState = {
    type: PageType.Start,
};

export type SplitState = {
    type: PageType.Split,
    val: number,
    people: number,
};

export type PageState = StartState | SplitState;

// Use this context getter to switch pages
export const ChangePage = React.createContext<(p: PageState) => void>(p => { });