// ============================================================================
// store with Tydux
// ============================================================================

import {Mutator, Store} from "@w11k/tydux";
import {html} from "lit-html";
import {listComponent} from "./list";

export interface Todo {
    id: number;
    description: string;
}

export class TodoState {

    newTodoInput = "";

    todos: Todo[] = [];
}

export class TodoMutator extends Mutator<TodoState> {

    assignNewTodoInput(input: string) {
        this.state.newTodoInput = input;
    }

    pushTodo(todo: Todo) {
        this.state.todos = [
            ...this.state.todos,
            todo
        ];
    }
}

export class TodoStore extends Store<TodoMutator, TodoState> {

    private todoIdCounter = 0;

    assignNewTodoInput(input: string) {
        this.mutate.assignNewTodoInput(input);
    }

    addTodo() {
        if (!isNewTodoInputValid(this.state.newTodoInput)) {
            return;
        }
        this.mutate.pushTodo({id: this.todoIdCounter++, description: this.state.newTodoInput.trim()});
        this.mutate.assignNewTodoInput("");
    }
}

export function isNewTodoInputValid(value: string) {
    return value.length > 0;
}

// ============================================================================
// main component
// ============================================================================

export const mainComponent = (store: TodoStore) => html`
    <h1>Todos</h1>
    ${listComponent(store)}
`;

