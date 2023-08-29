<script setup lang="ts">
	import type { Todo } from './TodoTypes'

	const { text, status } = defineProps<Todo>()
</script>

<template>
	<div :class="['todo-item', status === 1 ? 'done' : 'open']">{{ text }}</div>
</template>
