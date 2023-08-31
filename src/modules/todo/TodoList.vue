<script setup lang="ts">
	import type { PropType } from 'vue'
	import { TodoStatus as Statuses } from './TodoTypes'
	import type { Todos, TodoStatus } from './TodoTypes'

	const props = defineProps({
		list: Array as PropType<Todos>,
	})

	const emit = defineEmits<{
		choose: [index: number]
		remove: [index: number]
		statusChanged: [index: number]
	}>()

	const choose = (status: TodoStatus, i: number) => {
		if (status === Statuses.open) emit('choose', i)
	}
</script>

<template>
	<div class="todo-list">
		<div v-if="props.list && !props.list.length">the list is empty</div>
		<div v-else v-for="(todo, todoIndex) in props.list" :key="'todo-item-' + todoIndex" class="todo-list-item">
			<input class="todo-list-item-status" type="checkbox" :value="!!todo.status" @change="emit('statusChanged', todoIndex)" />
			<div class="todo-list-item-text" :class="[todo.status === 1 ? 'done' : 'open']" @click="choose(todo.status, todoIndex)">{{ todo.text }}</div>
			<button class="todo-list-item-delete" @click="emit('remove', todoIndex)">delete</button>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	@import "./todo-variabless"
	.todo-list-item
		display: flex
		margin-bottom: $step*2
		align-items: center
		&-status
			flex: 0 0 auto
			width: $step*3
			height: $step*3
			margin-right: $step*2
			@include todo-button
			padding: 0
			&:checked
				background: var(--todo-blue)
				border-color: var(--todo-blue)
		&-text
			flex: 1 1 auto
			cursor: text
			margin-right: $step*2
				
			&.done
				text-decoration: line-through
				font-style: italic
		&-delete
			flex: 0 0 auto
			@include todo-button
</style>
