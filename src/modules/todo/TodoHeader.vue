<script setup lang="ts">
import type { TodoHeaderTitle } from './TodoTypes'

const props = defineProps<{
	title: TodoHeaderTitle
}>()

const emit = defineEmits<{
	'update:title': [title: TodoHeaderTitle]
}>()

</script>

<template>
	<div class="todo-header">
		<div class="todo-header">
			<input class="todo-header-title" :value="props.title" @input="emit('update:title', $event.target.value)" />
		</div>
	</div>
</template>

<style lang="sass" scoped>
@import "./todo-variabless"

.todo-header
	display: flex
	&-title
		font-size: 2rem
</style>
