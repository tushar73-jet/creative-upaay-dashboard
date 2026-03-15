export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('dashboardState_v1')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('dashboardState_v1', serializedState)
  } catch {
  }
};
