import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Component } from '../abstract/BaseComponent';

@customElement('form-capture')
export class FormCapture extends Component {
  _formElement: HTMLFormElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._initializeFormElements();
  }

  _initializeFormElements() {
    this._formElement = this.querySelector('form');
    if (this._formElement) {
      this._formElement.addEventListener('submit', this._handleFormSubmit);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._formElement) {
      this._formElement.removeEventListener('submit', this._handleFormSubmit);
    }
  }

  _handleFormSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      // Handle multiple form fields with the same name
      if (jsonData[key]) {
        if (Array.isArray(jsonData[key])) {
          jsonData[key].push(value);
        } else {
          jsonData[key] = [jsonData[key], value];
        }
      } else {
        jsonData[key] = value;
      }
    });
    const customEvent = new CustomEvent('form-submit', {
      detail: jsonData,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  }

  render = () => html`<slot></slot> `;
}

