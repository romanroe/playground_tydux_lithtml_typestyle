import {RouterStore} from "./router";
import {detailComponent} from "./todoDetail";
import {listComponent} from "./todoList";
import {todoComponent, TodoStore} from "./todoMain";

export function initTodo(routerStore: RouterStore) {

    const todoStore = new TodoStore();

    const todoOutlet = routerStore.createOutlet(
        ["list", "/list", () => listComponent(todoStore)],
        ["detail", "/detail/:id", () => detailComponent(routerStore.state.params.id)],
    );

    const todoMainComponent = () => todoComponent(todoOutlet);

    return {
        todoMainComponent
    };
}
