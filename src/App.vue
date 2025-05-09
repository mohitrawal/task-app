<script setup>
import { ref, onMounted } from 'vue'
import TaskColumn from './components/TaskColumn.vue'
import TaskForm from './components/TaskForm.vue'
import { initDB, getAllTasks, addTask as dbAddTask, updateTask as dbUpdateTask, deleteTask as dbDeleteTask } from './utils/db'

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const tasks = ref({
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: []
})

const isFormOpen = ref(false)

// Initialize database and load tasks
onMounted(async () => {
  try {
    await initDB()
    const savedTasks = await getAllTasks()
    // Group tasks by day
    weekDays.forEach(day => {
      tasks.value[day] = savedTasks.filter(task => task.day === day)
    })
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
})

const addTask = async (taskData) => {
  const task = {
    id: Date.now(),
    ...taskData,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  try {
    await dbAddTask(task)
    tasks.value[task.day].push(task)
    isFormOpen.value = false
  } catch (error) {
    console.error('Failed to add task:', error)
  }
}

const updateTaskStatus = async (day, taskId, newStatus) => {
  const task = tasks.value[day].find(t => t.id === taskId);
  if (task) {
    task.status = newStatus
    try {
      await dbUpdateTask(task)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }
}

const deleteTask = async (day, taskId) => {
  try {
    await dbDeleteTask(taskId)
    tasks.value[day] = tasks.value[day].filter(t => t.id !== taskId)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

const moveTask = async (taskId, fromDay, toDay) => {
  const taskIndex = tasks.value[fromDay].findIndex(t => t.id === taskId)
  if (taskIndex !== -1) {
    const task = tasks.value[fromDay][taskIndex]
    task.day = toDay
    try {
      await dbUpdateTask(task)
      tasks.value[fromDay].splice(taskIndex, 1)
      tasks.value[toDay].push(task)
    } catch (error) {
      console.error('Failed to move task:', error)
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Weekly Task Manager</h1>
      
      <!-- Add Task Button/Form -->
      <div class="mb-8">
        <button 
          v-if="!isFormOpen"
          @click="isFormOpen = true"
          class="mx-auto block bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create New Task
        </button>

        <TaskForm 
          v-else
          @add-task="addTask"
          @close="isFormOpen = false"
        />
      </div>

      <!-- Task Legend -->
      <div class="mb-4 flex gap-4 justify-center">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span>Pending</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span>In Progress</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Blocked</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Completed</span>
        </div>
      </div>

      <!-- Weekly Calendar -->
      <div class="grid grid-cols-5 gap-4">
        <TaskColumn
          v-for="day in weekDays"
          :key="day"
          :day="day"
          :tasks="tasks[day]"
          @update-status="(taskId, status) => updateTaskStatus(day, taskId, status)"
          @delete-task="(taskId) => deleteTask(day, taskId)"
          @move-task="moveTask"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(5, 1fr);
}
</style>
