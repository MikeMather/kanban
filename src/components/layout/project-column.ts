import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ColumnDocument, TaskDocument } from '../../stores/schema';
import { Component } from '../abstract/BaseComponent';
import { tasks } from '../../stores/database';

@customElement('project-column')
export class ProjectColumn extends Component {
  @property({ type: Object })
  column = {} as ColumnDocument;

  @state()
  _tasks: TaskDocument[] = [];

  static styles = css`
    .column {
      height: 80vh;
      min-width: 300px;
      border-radius: 2px;
      flex: 1;
      padding: 0.5rem;
    }

    .header {
      padding: 10px;
      border-bottom: 1px solid var(--gray-6);
      text-align: center;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;

  async firstUpdated() {
    if (this.column.id) {
      this._tasks = await tasks
        .find({
          selector: {
            column: this.column.id,
          },
        })
        .exec();
    }
  }

  render() {
    return html`
      <div class="column mt-2">
        <div class="header">
          <span>${this.column.title}</span>
          <button class="btn-icon float-right">+</button>
        </div>
        <div class="tasks mt-3">
          ${this._tasks.map(
            (task) => html`<task-card .task=${task}></task-card>`
          )}
        </div>
      </div>
    `;
  }
}

