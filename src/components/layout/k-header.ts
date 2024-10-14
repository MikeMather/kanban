import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('k-header')
export class AppHome extends LitElement {
  static styles = css`
    header {
      border-bottom: 1px solid var(--accent);
    }

    h1 {
      font-size: 1.5rem;
    }
  `;

  render() {
    return html`<header class="w-f d-flex justify-between">
      <h1>Instant Kanban</h1>
    </header> `;
  }
}

