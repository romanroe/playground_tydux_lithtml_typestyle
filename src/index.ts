import {enableTyduxDevelopmentMode, Mutator, Store} from "@w11k/tydux";
import {globalStateChanges$} from "@w11k/tydux/dist/global-state";
import {html, render} from "lit-html";
import {style} from "typestyle";

enableTyduxDevelopmentMode();

// ============================================================================
// store with Tydux
// ============================================================================

class TodoState {

    newTodoInput = "";

    todos: string[] = [];
}

class TodoMutator extends Mutator<TodoState> {

    assignNewTodoInput(input: string) {
        this.state.newTodoInput = input;
    }

    pushTodo(todo: string) {
        this.state.todos = [
            ...this.state.todos,
            todo
        ];
    }
}

class TodoStore extends Store<TodoMutator, TodoState> {

    assignNewTodoInput(input: string) {
        this.mutate.assignNewTodoInput(input);
    }

    addTodo() {
        this.mutate.pushTodo(this.state.newTodoInput.trim());
        this.mutate.assignNewTodoInput("");
    }
}


// ============================================================================
// CSS with TypeStyle
// ============================================================================

const cssLabelWarning = style({color: "red"});

const cssLabelNormal = style({color: "green"});

const getLabelCssClass = (inputValue: string) => {
    return inputValue.trim().length === 0 ? cssLabelWarning : cssLabelNormal;
};

// ============================================================================
// elements: pure functions, no nothing about the store
// ============================================================================

/**
 * <div> to enter new todos
 */
const newTodoDivElement = (value: string,
                     onInput: (value: string) => void,
                     onClick: () => void) => html`

    <div>      
        <span class="${getLabelCssClass(value)}">New Todo:</span>
        <input .value="${value}" @input="${(e: Event) => onInput((e.target as any).value)}">
        <button @click="${onClick}">add</button>
    </div>
`;

/**
 * display the passed todos as <ul>
 */
const displayTodoListUlElement = (todos: string[]) => html`
    <ul>
        ${todos.map(t => html`<li>${t}</li>`)}
    </ul>
`;

// ============================================================================
// todoComponent: mediator between store and elements
// ============================================================================

const todoComponent = (store: TodoStore) => html`
    <h1>Todos</h1>
    ${newTodoDivElement(store.state.newTodoInput, v => store.assignNewTodoInput(v), () => store.addTodo())}
    ${displayTodoListUlElement(store.state.todos)}
`;

// ============================================================================
// init & render & update
// ============================================================================

const todoStore = new TodoStore("TodoStore", new TodoMutator(), new TodoState());

globalStateChanges$.subscribe(() => {
    return render(todoComponent(todoStore), document.body);
});
