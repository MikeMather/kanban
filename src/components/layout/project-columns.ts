import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ColumnDocument } from '../../stores/schema';
import { columns } from '../../stores/database';
import { Component } from '../abstract/BaseComponent';
import { Subscription } from 'rxjs';
import { router } from '../../app-index';

@customElement('project-columns')
export class ProjectColumns extends Component {
  @property({ type: String })
  projectId = '';

  @state()
  _columns: ColumnDocument[] = [];

  _columnsSub: Subscription | null = null;

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  async firstUpdated() {
    if (this.projectId) {
      this._columns = await columns
        .find({
          selector: {
            project: this.projectId,
          },
        })
        .exec();
      this._columnsSub = columns.$.subscribe((columns: any) => {
        this._columns = columns.filter(
          (column: any) => column.project === this.projectId
        );
      });
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._columnsSub) {
      this._columnsSub.unsubscribe();
    }
  }

  render() {
    return html`
      <div class="mt-2 h-4">
        <div class="d-flex justify-end align-center">
          <a class="btn" href="${router?.location.pathname}#new-column"
            >+ New Column</a
          >
        </div>
        <div class="d-flex mt-2 h-4">
          ${this._columns.map(
            (column) =>
              html`<project-column .column=${column}></project-column>`
          )}
        </div>
      </div>
    `;
  }
}

