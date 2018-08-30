import {enableTyduxDevelopmentMode, Mutator, Store} from "@w11k/tydux";
import {globalStateChanges$} from "@w11k/tydux/dist/global-state";
import {html, render} from "lit-html";
import {style} from "typestyle";

enableTyduxDevelopmentMode();


class MyState {
    bgColorInput = "red";
}

class MyMutator extends Mutator<MyState> {
    assignBgColor(color: string) {
        this.state.bgColorInput = color;
    }
}

class MyStore extends Store<MyMutator, MyState> {
    assignBgColor(color: string) {
        this.mutate.assignBgColor(color);
    }
}

const myStore = new MyStore("MyStore", new MyMutator(), new MyState());

/**
 * create CSS class with TypeStyle
 */
const cssRed = style({backgroundColor: "red"});
const cssBlue = style({backgroundColor: "blue"});
const cssDefault = style({fontWeight: "bold"});

const getCss = (color: string) => {
    return color === "red"
        ? cssRed
        : color === "blue"
            ? cssBlue
            : cssDefault;
};

/**
 * create an input element to set the background color
 */
// language=HTML
const createColorInput = () => html`
    <input .value="${myStore.state.bgColorInput}" @input="${(e: Event) => myStore.assignBgColor((e.target as any).value)}">
`;

/**
 * display text with the current background color
 */
// language=HTML
const createStyledLabel = (label: string) => html`
    <span class="${getCss(myStore.state.bgColorInput)}">${label}</span>
`;

/**
 * page
 */
// language=HTML
const body = () => html`
    <h1>Demo</h1>
    <div>${createColorInput()}</div>
    <div>Active color: ${createStyledLabel(myStore.state.bgColorInput)}</div>
`;

// render & update
globalStateChanges$.subscribe(() => render(body(), document.body));
