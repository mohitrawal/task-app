<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updateStatus', 'deleteTask'])

const statusColors = {
  pending: 'bg-yellow-100 border-yellow-300',
  inProgress: 'bg-blue-100 border-blue-300',
  blocked: 'bg-red-100 border-red-300',
  completed: 'bg-green-100 border-green-300'
}

const statusDotColors = {
  pending: 'bg-yellow-400',
  inProgress: 'bg-blue-400',
  blocked: 'bg-red-400',
  completed: 'bg-green-400'
}

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-orange-500',
  high: 'text-red-500'
}

const handleDragStart = (e) => {
  e.dataTransfer.setData('taskId', props.task.id)
  e.dataTransfer.setData('day', props.task.day)
}

const updateTaskStatus = (newStatus) => {
  emit('updateStatus', props.task.id, newStatus)
}
</script>

<template>
  <div
    :class="['p-3 rounded-lg shadow-sm border-2 cursor-move mb-2', statusColors[task.status]]"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="flex justify-between items-start mb-2">
      <div>
        <h3 class="font-medium text-gray-800">{{ task.title }}</h3>
        <p class="text-sm text-gray-600 mt-1 mb-5">{{ task.description }}</p>
      </div>
      <button 
        @click.stop="emit('deleteTask', task.id)"
        class="text-gray-500 hover:text-red-500"
      >
        ×
      </button>
    </div>
    <div class="flex items-center justify-between mt-3">
      <div class="flex justify-between gap-2">
        <button 
          v-for="status in ['pending', 'inProgress', 'blocked', 'completed']" 
          :key="status"
          @click.stop="updateTaskStatus(status)"
          :class="[
            'w-4 h-4 rounded-full transition-transform hover:scale-110',
            statusDotColors[status],
            task.status === status ? 'ring-2 ring-offset-2 ring-gray-400' : ''
          ]"
          :title="status"
        />
      </div>
      <div>
          {{ task.priority.slice(0, 3).charAt(0).toUpperCase() + task.priority.slice(1, 3) }}
        </div>
    </div>
  </div>
</template>