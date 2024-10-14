import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxDocument,
  RxJsonSchema,
} from 'rxdb';

export const projectsSchemaLiteral = {
  title: 'project schema',
  description: 'a project',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string',
      maxLength: 200,
    },
  },
  required: ['id', 'title'],
  indexes: ['title'],
} as const;

export const columnsSchemaLiteral = {
  version: 0,
  title: 'column schema',
  description: 'a column',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string',
      maxLength: 200,
    },
    project: {
      type: 'string',
      maxLength: 100,
    },
  },
  required: ['id', 'title', 'project'],
  indexes: ['id'],
} as const;

export const tasksSchemaLiteral = {
  title: 'task schema',
  description: 'a task',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string',
      maxLength: 200,
    },
    column: {
      type: 'string',
      maxLength: 100,
    },
    project: {
      type: 'string',
      maxLength: 100,
    },
  },
  required: ['id', 'title', 'column', 'project'],
  indexes: ['id'],
} as const;

const projectSchemaTyped = toTypedRxJsonSchema(projectsSchemaLiteral);
const columnsSchemaTyped = toTypedRxJsonSchema(columnsSchemaLiteral);
const tasksSchemaTyped = toTypedRxJsonSchema(tasksSchemaLiteral);

export type ProjectType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof projectSchemaTyped
>;
export type ColumnType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof columnsSchemaTyped
>;

export type TaskType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof tasksSchemaTyped
>;

export type ProjectDocument = RxDocument<ProjectType>;
export type ColumnDocument = RxDocument<ColumnType>;
export type TaskDocument = RxDocument<TaskType>;

export const projectsSchema: RxJsonSchema<ProjectType> = projectsSchemaLiteral;
export const columnsSchema: RxJsonSchema<ColumnType> = columnsSchemaLiteral;
export const tasksSchema: RxJsonSchema<TaskType> = tasksSchemaLiteral;

