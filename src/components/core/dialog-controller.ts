import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Component } from '../abstract/BaseComponent';
import { router } from '../../app-index';

@customElement('dialog-controller')
export class DialogController extends Component {
  _dialogElement: HTMLElement | null = null;

  static dialogRoutes: any = {
    action: {
      'new-column': 'new-column-dialog',
    },
  };

  firstUpdated(): void {
    window.addEventListener('popstate', () => {
      this._renderDialog();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('popstate', () => {
      this._renderDialog();
    });
  }

  _renderDialog() {
    const action = router?.location.hash.replace('#', '');
    if (action) {
      const dialog = DialogController.dialogRoutes.action[action];
      if (dialog) {
        this._dialogElement = document.createElement(dialog);
        this.shadowRoot!.appendChild(this._dialogElement!);
      }
    } else {
      if (this._dialogElement) {
        this.shadowRoot!.removeChild(this._dialogElement);
      }
    }
  }

  render() {
    return html``;
  }
}

