import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaskDocument } from '../../stores/schema';
import { Component } from '../abstract/BaseComponent';
import { router } from '../../app-index';

@customElement('task-card')
export class TaskCard extends Component {
  @property({ type: Object })
  task = {} as TaskDocument;

  static styles = css`
    .task {
      border: 1px solid var(--gray-6);
      border-radius: 2px;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      box-shadow: var(--shadow-1);
    }

    .task:hover {
      box-shadow: 1px 1px 5px var(--gray-5);
    }
  `;

  render() {
    return html`
      <a href="${router?.location.pathname}?task=${this.task.id}">
        <div class="task mt-2">
          <span>${this.task.title}</span>
        </div>
      </a>
    `;
  }
}

