import {Mutator, Store} from "@w11k/tydux";
import {html, TemplateResult} from "lit-html";

// ============================================================================
// store with Tydux
// ============================================================================

export interface Todo {
    id: number;
    description: string;
    dueDate: Date;
}

export class TodoState {

    newTodoInput = "";

    todos: Todo[] = [];
}

export class TodoMutator extends Mutator<TodoState> {

    assignNewTodoInput(input: string) {
        this.state.newTodoInput = input;
    }

    assignTodoList(todos: Todo[]) {
        this.state.todos = todos;
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

    constructor() {
        super("TodoStore", new TodoMutator(), new TodoState());
        this.createTestTodos();
    }

    private createTestTodos() {
        const todos: Todo[] = [];
        for (let i = 0; i <= 3; i++) {
            todos.push({
                id: this.todoIdCounter++,
                description: "A test TODO: " + Math.random() + " do something",
                dueDate: new Date()
            });
        }
        this.mutate.assignTodoList(todos);
    }

    assignNewTodoInput(input: string) {
        this.mutate.assignNewTodoInput(input);
    }

    addTodo() {
        if (!isNewTodoInputValid(this.state.newTodoInput)) {
            return;
        }
        this.mutate.pushTodo({
            id: this.todoIdCounter++,
            description: this.state.newTodoInput.trim(),
            dueDate: new Date()
        });
        this.mutate.assignNewTodoInput("");
    }
}

export function isNewTodoInputValid(value: string) {
    return value.length > 0;
}

// ============================================================================
// main component
// ============================================================================

export const todoComponent = (outlet: () => TemplateResult) => html`
    <h1>Todos</h1>
    ${outlet()}
`;

