export type TodoText = string

export enum TodoStatus {
	'open',
	'done',
}

export type TodoFilterStatus = TodoStatus | -1

export interface Todo {
	text?: TodoText
	status: TodoStatus
}

export type Todos = Todo[]

export type TodoHeaderTitle = string
