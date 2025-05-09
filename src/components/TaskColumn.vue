<script setup>
import { defineProps, defineEmits } from 'vue'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  day: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['updateStatus', 'deleteTask', 'moveTask'])

const handleDragOver = (e) => {
  e.preventDefault()
}

const handleDrop = (e) => {
  e.preventDefault()
  const taskId = e.dataTransfer.getData('taskId')
  const fromDay = e.dataTransfer.getData('day')
  if (fromDay !== props.day) {
    emit('moveTask', taskId, fromDay, props.day)
  }
}

const handleStatusUpdate = (taskId, newStatus) => {
  emit('updateStatus', taskId, newStatus)
}

const handleDeleteTask = (taskId) => {
  emit('deleteTask', taskId)
}
</script>

<template>
  <div 
    class="bg-white p-4 rounded-lg shadow"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <h2 class="text-xl font-semibold mb-4 text-gray-700">{{ day }}</h2>
    <div class="space-y-2">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @update-status="handleStatusUpdate"
        @delete-task="handleDeleteTask"
      />
    </div>
  </div>
</template>