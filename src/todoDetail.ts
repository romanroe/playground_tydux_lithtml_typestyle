import {html} from "lit-html";

export const detailComponent = (id: string) => html`
    <h2>Todo detail</h2>
    <div>
        ID: ${id}
    </div>
`;
