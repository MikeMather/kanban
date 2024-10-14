import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-home')
export class AppHome extends LitElement {
  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `;

  render() {
    return html`
      <div>
        <k-header></k-header>
        <project-board></project-board>
      </div>
    `;
  }
}

