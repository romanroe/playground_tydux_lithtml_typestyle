import {RouterStore} from "./router";
import {initTodo} from "./initTodo";


export function initApp() {

    const routerStore = new RouterStore();

    let todo = initTodo(routerStore);

    return {
        todoMainComponent: todo.todoMainComponent,
    }
}
