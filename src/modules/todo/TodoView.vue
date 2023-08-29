<template>
	<div class="main-container">
		<TodoHeader :title="title" @update:title="setTitle" />
		<TodoList :list="todos" @add="createTodo" />
		<TodoToolbar />
	</div>
</template>

<script setup lang="ts">
	import TodoList from './TodoList.vue'
	import TodoHeader from './TodoHeader.vue'
	import TodoToolbar from './TodoToolbar.vue'
	import { storeToRefs } from 'pinia'
	import { useTodoStore } from './TodoStore'

	const store = useTodoStore()
	const { todos, title } = storeToRefs(store)
	const { createTodo, setTitle } = store
</script>

<style lang="sass">
@import "todo.sass"
</style>
