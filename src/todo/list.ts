import {html} from "lit-html";
import {style} from "typestyle";
import {isNewTodoInputValid, Todo, TodoStore} from "./main";


// ============================================================================
// CSS with TypeStyle
// ============================================================================

const cssLabelWarning = style({color: "red"});

const cssLabelNormal = style({color: "green"});

const getLabelCssClass = (inputValue: string) => {
    return isNewTodoInputValid(inputValue) ? cssLabelNormal : cssLabelWarning;
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
const displayTodoListUlElement = (todos: Todo[]) => html`
    <ul>
        ${todos.map(t => html`<li>${t.id} - ${t.description}</li>`)}
    </ul>
`;

// ============================================================================
// todoComponent: mediator between store and elements
// ============================================================================

export const listComponent = (store: TodoStore) => html`
    <h2>Todo list</h2>
    
    ${newTodoDivElement(store.state.newTodoInput, v => store.assignNewTodoInput(v), () => store.addTodo()) }
        
    ${displayTodoListUlElement(store.state.todos)}
`;
