import {Mutator, Store} from "@w11k/tydux";
import {html, TemplateResult} from "lit-html";
import createRouter, {Router, SubscribeState} from "router5";
import {State} from "router5/create-router";
import browserPlugin from "router5/plugins/browser";

export class RouterMutator extends Mutator<State> {
    setRouterState(state: State) {
        this.state = state;
    }
}

export type CreateOutletFn = (...routes: [string, string, () => TemplateResult][]) => () => TemplateResult;

export class RouterStore extends Store<RouterMutator, State> {

    private readonly router: Router;

    private readonly routeNameToComponent: {[name: string]: () => TemplateResult} = {};

    readonly createOutlet: CreateOutletFn = (...routes: [string, string, () => TemplateResult][]) => {
        for (let route of routes) {
            this.router.addNode(route[0], route[1]);
            this.routeNameToComponent[route[0]] = route[2];
        }

        this.router.stop();
        this.router.start();

        return () => {
            if (this.router.getState() === null) {
                return html`no router state`;
            }

            const matchingComponent = this.routeNameToComponent[this.router.getState().name];
            if (matchingComponent === null) {
                return html`no matching route`;
            }

            return matchingComponent();
        }
    };

    constructor() {
        super("RouterState", new RouterMutator(), {} as any);

        this.router = createRouter([], {
            // defaultRoute: "list"
        })
            .usePlugin(browserPlugin({
                useHash: true
            }));

        this.router.subscribe((state: SubscribeState) => {
            this.mutate.setRouterState(state.route);
        });

        this.router.start();
    }

}

