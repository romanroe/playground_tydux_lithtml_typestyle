import {enableTyduxDevelopmentMode} from "@w11k/tydux";
import {globalStateChanges$} from "@w11k/tydux/dist/global-state";
import {render} from "lit-html";
import "./router";
import {initApp} from "./init";

enableTyduxDevelopmentMode();

const app = initApp();


globalStateChanges$.subscribe(() => {
    const start = Date.now();
    render(app.todoMainComponent(), document.body);
    const dur = Date.now() - start;
    console.log(`Render duration: ${dur}`);
});
