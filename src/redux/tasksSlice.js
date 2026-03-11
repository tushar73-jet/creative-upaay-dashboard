import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    { id: '1', title: 'Brainstorm Features', description: 'List out all required app features', status: 'To Do', priority: 'High' },
    { id: '2', title: 'Design Database', description: 'Create ERD diagrams', status: 'In Progress', priority: 'Medium' },
    { id: '3', title: 'Setup UI', description: 'Install Chakra UI', status: 'Done', priority: 'High' },
  ]
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    updateTaskStatus: (state, action) => {
      const { id, newStatus } = action.payload
      const task = state.tasks.find(task => task.id === id)
      if (task) {
        task.status = newStatus
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    }
  }
});

export const { addTask, updateTaskStatus, deleteTask } = tasksSlice.actions

export default tasksSlice.reducer
