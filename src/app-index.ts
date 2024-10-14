import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import './pages/app-home';
import './components/layout';
import './components/core';
import { columns, projects, tasks } from './stores/database';
import { nanoid } from 'nanoid';
import { Router } from '@vaadin/router';

export let router: Router | null = null;

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('#outlet') private _outlet: HTMLDivElement | undefined;

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    main {
      padding-left: 16px;
      padding-right: 16px;
      min-height: 100%;
    }

    #outlet {
      min-height: 100%;
    }
  `;

  static routes = [
    {
      path: '/',
      component: 'app-home',
    },
    {
      path: '/projects/:projectId',
      component: 'app-home',
    },
  ];

  async connectedCallback() {
    super.connectedCallback();
    const existingProjects = await projects.find().exec();
    if (!existingProjects.length) {
      const projectId = nanoid();
      const columnId = nanoid();
      projects.insert({
        id: projectId,
        title: 'My Kanban Project',
      });
      columns.insert({
        id: columnId,
        title: 'To Do',
        project: projectId,
      });
      tasks.insert({
        id: nanoid(),
        title: 'My first task',
        column: columnId,
        project: projectId,
      });
      Router.go(`/projects/${projectId}`);
    } else {
      const firstProject = existingProjects[0];
      Router.go(`/projects/${firstProject.id}`);
    }
  }

  firstUpdated(): void {
    this._initRouter();
  }

  private _initRouter() {
    router = new Router(this._outlet);
    // @ts-ignore
    router.setRoutes(AppIndex.routes);
  }

  render() {
    return html`
      <main>
        <div id="outlet"></div>
        <dialog-controller></dialog-controller>
      </main>
    `;
  }
}

