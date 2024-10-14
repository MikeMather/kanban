import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { columns, projects } from '../../stores/database';
import { Subscription } from 'rxjs';
import { router } from '../../app-index';
import { ColumnDocument, ProjectDocument } from '../../stores/schema';

@customElement('project-board')
export class ProjectBoard extends LitElement {
  @state()
  _project: ProjectDocument | null = null;

  @state()
  _columns: ColumnDocument[] = [];

  static styles = css`
    :host {
      display: block;
      height: 80%;
      padding-bottom: 2rem;
      position: relative;
    }

    input {
      padding: 8px;
      font-size: 2rem;
      border: none;
      margin-top: 2rem;
      padding-left: 0;
    }

    input:hover {
      border-bottom: 1px solid var(--gray-4);
    }

    input:focus {
      outline: none;
      border-bottom: 1px solid var(--gray-6);
    }
  `;

  _projectSub: Subscription | null = null;

  async connectedCallback() {
    super.connectedCallback();
    const projectId = router?.location.params.projectId.toString();
    if (projectId) {
      this._project = await projects.findOne(projectId).exec();
      if (!this._project) {
        return;
      }
      this._projectSub = this._project.$.subscribe((project: any) => {
        this._project = project;
      });
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._projectSub) {
      this._projectSub.unsubscribe();
    }
  }

  async _handleTitleChange(e: any) {
    if (!this._project) {
      return;
    }
    await this._project.update({
      $set: {
        title: e.target.value,
      },
    });
  }

  render() {
    return html`
      <input
        type="text"
        value=${this._project?.title || ''}
        @blur=${this._handleTitleChange}
      />
      ${this._project?.id &&
      html`<project-columns
        projectId=${this._project?.id || ''}
      ></project-columns>`}
    `;
  }
}

