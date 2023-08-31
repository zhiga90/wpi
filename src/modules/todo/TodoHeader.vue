<script setup lang="ts">
	import { ref } from 'vue'
	import { TodoStatus } from './TodoTypes'
	import type { TodoHeaderTitle, TodoFilterStatus } from './TodoTypes'

	const props = defineProps<{
		title: TodoHeaderTitle
		status: TodoFilterStatus
	}>()

	const emit = defineEmits<{
		'update:title': [title: TodoHeaderTitle]
		'update:status': [status: TodoFilterStatus]
	}>()

	const selectHadler = (e: Event) => {
		const value = (e.target as HTMLInputElement).value
		emit('update:status', +value)
	}

	const inputHandler = (e: Event) => {
		const value = (e.target as HTMLInputElement).value
		emit('update:title', value)
	}

	const options = ref<{ label: string; value: TodoFilterStatus }[]>([
		{ label: 'all', value: -1 },
		{ label: 'open', value: TodoStatus.open },
		{ label: 'done', value: TodoStatus.done },
	])
</script>

<template>
	<div class="todo-header">
		<div class="todo-header">
			<input class="todo-header-title" :value="props.title" @input="inputHandler" />
			<select class="todo-header-status" :value="props.status" @input="selectHadler">
				<option v-for="(option, optionIndex) in options" :key="'option' + optionIndex" :value="option.value">{{ option.label }}</option>
			</select>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	@import "./todo-variabless"

	.todo-header
		display: flex
		justify-content: space-between
		align-items: flex-end
		width: 100%
		&-title
			flex: 1 1 auto
			font-size: 2rem
			margin-right: $step *2
			border-bottom: solid 1px var(--todo-grey)
			max-width: 400px
			min-width: 100px
			&:hover
				border-bottom-color: var(--todo-grey2)
			&:focus
				border-bottom-color: var(--todo-blue)

		&-status
			flex: 0 0 auto
			@include todo-button
</style>
