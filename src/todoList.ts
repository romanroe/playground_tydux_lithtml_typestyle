import {Store} from "@w11k/tydux";
import {directive, html, TemplateResult} from "lit-html";
import {guard} from "lit-html/directives/guard";
import {repeat} from "lit-html/directives/repeat";
import {style} from "typestyle";
import {isNewTodoInputValid, Todo, TodoStore} from "./todoMain";


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
 * display the passed todos as <table>
 */
const todoListTableElement = (todos: Todo[]) => html`
    <table>
        ${repeat(todos, t => t.id, todoTableRowElement)}
    </table>
`;

/**
 * generate a <tr>
 */
const todoTableRowElement = (todo: Todo) => html`
    <tr>
        <td>${todo.id}</td>
        <td>${todo.description}</td>
        <td>${dateDisplayElement(todo.dueDate)}</td>
    </tr>
`;

const dateDisplayElement = (date: Date) => {
    return html`
        <span>${date.getFullYear()}-${date.getMonth()}-${date.getDay()}</span>
    `;
};

// ============================================================================
// todoComponent: mediator between store and elements
// ============================================================================

export const listComponent = (store: TodoStore) => html`
    <h2>Todo list</h2>
    
    ${newTodoDivElement(store.state.newTodoInput, v => store.assignNewTodoInput(v), () => store.addTodo()) }
    ${guard(store.state.todos, () => todoListTableElement(store.state.todos))}
`;
