import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todos, TodoHeaderTitle, TodoText, TodoStatus } from './TodoTypes'

export const useTodoStore = defineStore('todo', () => {
	const localTitle = localStorage.getItem('title')
	const defaultTitle = 'Todo Project'

	const title = ref<TodoHeaderTitle>('')
	const setTitle = (newTitle: TodoHeaderTitle): void => {
		title.value = newTitle
		document.title = newTitle
		localStorage.setItem('title', newTitle)
	}
	setTitle(localTitle || defaultTitle)

	const localTodos: string | null = localStorage.getItem('todos')
	const todos = reactive<Todos>(localTodos ? JSON.parse(localTodos) : [])
	const syncTodos = (): void => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}

	const createTodo = (text?: TodoText): void => {
		if (!text) text = ''
		todos.push({ text, status: 0 })
		syncTodos()
	}

	const updateTodo = (index: number, todo: { text?: TodoText; status?: TodoStatus }): void => {
		const { text, status } = todo
		if (typeof text !== 'undefined' && text !== null) todos[index].text = text
		if (typeof status !== 'undefined' && status !== null) todos[index].status = status
		syncTodos()
	}

	const deleteTodo = (index: number): void => {
		todos.splice(index, 1)
		syncTodos()
	}

	return { title, todos, createTodo, setTitle, updateTodo, deleteTodo }
})
