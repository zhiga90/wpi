<script setup lang="ts">
	import type { TodoText } from './TodoTypes'

	const props = defineProps<{
		text: TodoText
		btnText?: string
	}>()

	const emit = defineEmits<{
		'update:text': [text: TodoText]
		save: []
	}>()

	const inputHandler = (e: Event) => {
		const value = (e.target as HTMLInputElement).value
		emit('update:text', value)
	}
</script>

<template>
	<div class="todo-toolbar">
		<div class="main-container">
			<form @submit.prevent="emit('save')">
				<input class="" :value="props.text" @input="inputHandler" />
				<button type="submit">{{ props.btnText }}</button>
			</form>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	@import "./todo-variabless"
	.todo-toolbar
		position: fixed
		bottom: 0
		left: 0
		visibility: hidden
		width: 100%
		.main-container
			visibility: visible
			display: flex
			justify-content: center
		form
			padding: $step*2 0
			display: flex
			input
				flex: 1 1 auto
				@include todo-button
				cursor: text
				margin-right: $step*2
				max-width: 400px
				min-width: 100px
			button
				flex: 0 0 auto
				@include todo-button
</style>
