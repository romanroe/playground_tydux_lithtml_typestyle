import {mainComponent, TodoMutator, TodoState, TodoStore} from "./todo/main";


export function createInjector() {

    const todoStore = new TodoStore("TodoStore", new TodoMutator(), new TodoState());

    return {
        todoStore,
        mainComponent: () => mainComponent(todoStore)
    }
}
