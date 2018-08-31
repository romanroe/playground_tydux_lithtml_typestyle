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
// page elements
// ============================================================================

/**
 * display text with the current background color
 */
const createInputLabel = (cssClass: string) => html`
    <span class="${cssClass}">New Todo:</span>
`;

/**
 * create an <input> to set the background color
 */
const createInputField = (value: string, onInput: (value: string) => void) => html`
    <input .value="${value}" @input="${(e: Event) => onInput((e.target as any).value)}">
`;

/**
 * create a <button> to add a new todoEntry
 */
const createAddTodoButton = (onClick: () => void) => html`
    <button @click="${onClick}">add</button>
`;

/**
 * creates an <li>
 */
const createTodoListEntry = (todo: string) => html`
    <li>${todo}</li>
`;

// ============================================================================
// body: mediator between store and page elements
// ============================================================================

const body = (store: TodoStore) => html`
    <h1>Todos</h1>
    <div>
        ${createInputLabel(getLabelCssClass(store.state.newTodoInput))}
        ${createInputField(store.state.newTodoInput, value => store.assignNewTodoInput(value))}
        ${createAddTodoButton(() => store.addTodo())}
    </div>
    <ul>
        ${store.state.todos.map(createTodoListEntry)}
    </ul>
`;

// ============================================================================
// init & render & update
// ============================================================================

const todoStore = new TodoStore("TodoStore", new TodoMutator(), new TodoState());

globalStateChanges$.subscribe(() => {
    return render(body(todoStore), document.body);
});
