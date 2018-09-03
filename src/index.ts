import {enableTyduxDevelopmentMode} from "@w11k/tydux";
import {globalStateChanges$} from "@w11k/tydux/dist/global-state";
import {render} from "lit-html";
import {createInjector} from "./injector";
import "./router";

enableTyduxDevelopmentMode();


const injector = createInjector();

globalStateChanges$.subscribe(() => {
    return render(injector.mainComponent(), document.body);
});
