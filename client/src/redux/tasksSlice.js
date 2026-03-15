import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    { 
      id: '1', 
      title: 'Brainstorm Features', 
      description: 'List out all required app features', 
      status: 'To Do', 
      priority: 'High', 
      dueDate: '2024-01-15', 
      reminder: true,
      subtasks: [
        { id: 's1', title: 'Create routes', completed: false },
        { id: 's2', title: 'Write controllers', completed: true }
      ],
      activityLog: [
        { id: 'a1', action: 'Task created', time: new Date().toISOString() }
      ]
    },
    { id: '2', title: 'Design Database', description: 'Create ERD diagrams', status: 'In Progress', priority: 'Medium', dueDate: '2025-12-01', reminder: false, subtasks: [], activityLog: [] },
    { id: '3', title: 'Setup UI', description: 'Install Chakra UI', status: 'Done', priority: 'High', dueDate: '2025-06-20', reminder: true, subtasks: [], activityLog: [] },
  ]
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ 
        ...action.payload, 
        subtasks: [], 
        activityLog: [{ id: Date.now().toString(), action: 'Task created', time: new Date().toISOString() }] 
      })
    },
    updateTaskStatus: (state, action) => {
      const { id, newStatus } = action.payload
      const task = state.tasks.find(task => task.id === id)
      if (task) {
        const oldStatus = task.status;
        task.status = newStatus;
        if (!task.activityLog) task.activityLog = [];
        task.activityLog.push({
          id: Date.now().toString(),
          action: `Status changed from ${oldStatus} to ${newStatus}`,
          time: new Date().toISOString()
        });
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        if (!task.subtasks) task.subtasks = [];
        task.subtasks.push(subtask);
        if (!task.activityLog) task.activityLog = [];
        task.activityLog.push({
          id: Date.now().toString(),
          action: `Added subtask: ${subtask.title}`,
          time: new Date().toISOString()
        });
      }
    },
    toggleSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task && task.subtasks) {
        const subtask = task.subtasks.find(s => s.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          if (!task.activityLog) task.activityLog = [];
          task.activityLog.push({
            id: Date.now().toString(),
            action: `${subtask.completed ? 'Completed' : 'Unchecked'} subtask: ${subtask.title}`,
            time: new Date().toISOString()
          });
        }
      }
    }
  }
});

export const { addTask, updateTaskStatus, deleteTask, toggleSubtask, addSubtask } = tasksSlice.actions

export default tasksSlice.reducer
