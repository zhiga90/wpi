<template>
	<div class="main-container">
		<TodoHeader class="todo-header" :status="filterStatus" :title="title" @update:title="setTitle" @update:status="setFilterStatus" />
		<TodoList :list="filterTodos" @add="createTodo" @choose="todoChoosed" @remove="deleteTodo" @statusChanged="statusChanged" />
		<TodoToolbar v-model:text="activeText" @save="textUpdated" :btn-text="isEdit ? 'update' : 'add'" />
	</div>
</template>

<script setup lang="ts">
	import TodoList from './TodoList.vue'
	import TodoHeader from './TodoHeader.vue'
	import TodoToolbar from './TodoToolbar.vue'
	import type { Todo, TodoText, TodoFilterStatus } from './TodoTypes'
	import { ref, computed, watch } from 'vue'
	import { useRouter, useRoute, type RouteLocationRaw } from 'vue-router'
	import { storeToRefs } from 'pinia'
	import { useTodoStore } from './TodoStore'

	const store = useTodoStore()
	const { todos, title } = storeToRefs(store)
	const { createTodo, setTitle, updateTodo, deleteTodo } = store

	let activeIndex = ref<number>(-1)
	const isEdit = computed(() => activeIndex.value > -1)
	const activeText = ref<TodoText>('')
	const oldText = ref<TodoText>('')

	const todoChoosed = (index: number) => {
		activeIndex.value = index
		if (activeText.value) oldText.value = activeText.value
		activeText.value = todos.value[index].text || ''
	}

	const textUpdated = () => {
		if (isEdit.value) {
			updateTodo(activeIndex.value, { text: activeText.value })
			activeText.value = oldText.value
			oldText.value = ''
			activeIndex.value = -1
		} else {
			createTodo(activeText.value)
			activeText.value = ''
		}
	}

	const statusChanged = (index: number): void => {
		updateTodo(index, { status: todos.value[index].status === 1 ? 0 : 1 })
	}

	const router = useRouter()
	const route = useRoute()

	const getRouteQueryStatus = (): number => route.query.status && Number.isInteger(+route.query.status) ? +route.query.status : -1
	const filterStatus = ref<TodoFilterStatus>(getRouteQueryStatus())
	const setFilterStatus = (status: TodoFilterStatus) => {
		const newRoute: RouteLocationRaw = { name: 'home' }
		if (status !== -1) newRoute.query = { status }
		router.push(newRoute)
	}

	watch(route, () => {
		filterStatus.value = getRouteQueryStatus()
	})
	const filterTodos = computed(() => {
		if (filterStatus.value === -1) {
			return todos.value
		} else {
			return todos.value.filter((item: Todo) => item.status === filterStatus.value)
		}
	})
</script>

<style lang="sass" scoped>
	@import "./todo.sass"
	@import "./todo-variabless.sass"

	.main-container
		padding-top: $step*5
		padding-bottom: $step*5
	.todo-header
		margin-bottom: $step*3
</style>
