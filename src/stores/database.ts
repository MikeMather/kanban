import { RxCollection, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import {
  columnsSchema,
  tasksSchema,
  ProjectDocument,
  TaskDocument,
  ColumnDocument,
  projectsSchema,
} from './schema';
import { addRxPlugin } from 'rxdb';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

addRxPlugin(RxDBUpdatePlugin);

export type DbCollections = {
  projects: ProjectsCollection;
  columns: ColumnsCollection;
  tasks: TasksCollection;
};

const database = await createRxDatabase<DbCollections>({
  name: 'project',
  storage: getRxStorageDexie(),
});

await database.addCollections({
  projects: {
    schema: projectsSchema,
  },
  columns: {
    schema: columnsSchema,
  },
  tasks: {
    schema: tasksSchema,
  },
});

export type ProjectsCollection = RxCollection<ProjectDocument, any, any>;
export type ColumnsCollection = RxCollection<ColumnDocument, any, any>;
export type TasksCollection = RxCollection<TaskDocument, any, any>;

export const projects: ProjectsCollection = database.projects;
export const columns: ColumnsCollection = database.columns;
export const tasks: TasksCollection = database.tasks;

