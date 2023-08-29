export enum TodoStatus {
	'open',
	'done',
}

export interface Todo {
	text?: string
	status: TodoStatus
}

export type Todos = Todo[]

export type TodoHeaderTitle = string
