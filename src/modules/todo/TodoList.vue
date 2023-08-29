<script setup lang="ts">
	import TodoItem from './TodoItem.vue'
	import type { PropType } from 'vue'
	import type { Todos } from './TodoTypes'

	const props = defineProps({
		list: Array as PropType<Todos>,
	})

	const emit = defineEmits<{
		add: []
	}>()
</script>

<template>
	<div class="todos">
		<div class="todos-toolbar">
			<button class="todos-toolbar-btn" @click="emit('add')">add</button>
		</div>
		<div class="todos-list">
			<div v-for="(todo, todoIndex) in props.list" :key="'todo-item-' + todoIndex" class="todo">
				<TodoItem v-bind="todo" />
			</div>
		</div>
	</div>
</template>
