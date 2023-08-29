import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todos, TodoHeaderTitle } from './TodoTypes'

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

	const todos = reactive<Todos>([])

	const createTodo = (text?: string): void => {
		if (!text) text = ''
		todos.push({ text, status: 0 })
	}

	return { title, todos, createTodo, setTitle }
})
