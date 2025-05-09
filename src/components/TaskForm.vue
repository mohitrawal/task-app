<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['addTask', 'close'])

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const priorities = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 border-gray-300 text-gray-600' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-100 border-orange-300 text-orange-600' },
  { value: 'high', label: 'High', color: 'bg-red-100 border-red-300 text-red-600' }
]

const newTask = ref('')
const selectedDay = ref('Monday')
const taskDescription = ref('')
const taskPriority = ref('medium')

const handleSubmit = () => {
  if (newTask.value.trim()) {
    emit('addTask', {
      title: newTask.value.trim(),
      description: taskDescription.value.trim(),
      day: selectedDay.value,
      priority: taskPriority.value
    })
    // Reset form
    newTask.value = ''
    taskDescription.value = ''
    taskPriority.value = 'medium'
    selectedDay.value = 'Monday'
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-200">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-700">Create New Task</h2>
      <button 
        @click="emit('close')"
        class="text-gray-500 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
        <input 
          v-model="newTask"
          type="text"
          placeholder="Enter task title"
          class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          @keyup.enter="handleSubmit"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          v-model="taskDescription"
          rows="3"
          placeholder="Enter task description"
          class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Day</label>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="day in weekDays"
            :key="day"
            @click="selectedDay = day"
            :class="[
              'py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all',
              selectedDay === day 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50'
            ]"
          >
            {{ day.slice(0, 3) }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
        <div class="flex gap-3">
          <button
            v-for="priority in priorities"
            :key="priority.value"
            @click="taskPriority = priority.value"
            :class="[
              'flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all',
              taskPriority === priority.value
                ? priority.color + ' border-current'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ priority.label }}
          </button>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button 
          @click="emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
        >
          Cancel
        </button>
        <button 
          @click="handleSubmit"
          class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
        >
          Create Task
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(5, 1fr);
}
</style>