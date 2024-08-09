export const paramReducer = (state, action) => {
  const type = action.type;
  if (type === "colorChange") {
    return (state = { ...state, color: action.color });
  }
  if (type === "widthChange") {
    return (state = { ...state, width: action.width });
  }
  if (type === "selectLayer") {
    return (state = { ...state, selectedLayerId: action.id });
  }
};
