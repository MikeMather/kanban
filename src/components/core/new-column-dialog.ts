import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Component } from '../abstract/BaseComponent';
import { router } from '../../app-index';

@customElement('new-column-dialog')
export class NewColumnDialog extends Component {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  `;

  @query('dialog')
  _dialog!: HTMLDialogElement;

  @query('input')
  _input!: HTMLInputElement;

  _closeDialog() {
    this._dialog.close();
    if (router) {
      router.location.search = '';
    }
  }

  protected firstUpdated(): void {
    this._dialog.showModal();
  }

  _handleSubmit() {
    const columnName = this._input.value;
    console.log(columnName);
  }

  render() {
    return html`
      <dialog>
        <div class="dialog-header">
          <span>New Column</span>
          <button class="btn-icon" @click=${this._closeDialog}>X</button>
        </div>
        <div class="dialog-content">
          <form>
            <label>Column Name</label>
            <input type="text" placeholder="Enter column name" />
          </form>
        </div>
        <div class="dialog-footer">
          <button class="btn" @click=${this._handleSubmit}>
            Create Column
          </button>
        </div>
      </dialog>
    `;
  }
}

