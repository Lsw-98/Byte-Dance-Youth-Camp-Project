export const LoadingReducer = (prevState = {
  isLoading: false
}, action) => {
  let { type, payload } = action

  switch (type) {
    case "change_loading":
      let newState = { ...prevState }
      newState.isLoading = payload
      return newState
    default:
      return prevState;
  }
}