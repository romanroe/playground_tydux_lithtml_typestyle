import createRouter from "router5";
import {SubscribeState} from "router5/core/observable";
import browserPlugin from "router5/plugins/browser";
import loggerPlugin from "router5/plugins/logger";
import {from} from "rxjs";
import {map} from "rxjs/operators";

const routes = [
    {name: "home", path: "/"},
    {name: "profile", path: "/profile"}
];

const router = createRouter(routes, {
    defaultRoute: "home"
})
    .usePlugin(loggerPlugin)
    .usePlugin(browserPlugin({
        useHash: true
    }));


from(router).pipe(
    map((route) => {
        console.log("route obs", route)
    })
);

router.subscribe((state: SubscribeState) => {
    console.log("state", state);
});


router.start("home").subscribe((state) => {
	console.log("state2", state);
});

console.log("router done");
