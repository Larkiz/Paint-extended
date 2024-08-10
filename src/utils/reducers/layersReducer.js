export const layersReducer = (state, action) => {
  const type = action.type;
  if (type === "createShape") {
    const newLayers = state.layers.map((layer) => {
      if (layer.id === state.selectedLayerId) {
        layer.shapes.push(action.shape);
      }

      return layer;
    });

    return { ...state, layers: newLayers };
  }
  if (type === "addLayer") {
    const name = "Новый слой " + (state.layers.length + 1);
    const newLayers = [
      ...state.layers,
      { id: state.layers.length, name: name, shapes: [] },
    ];

    return { ...state, layers: newLayers };
  }
  if (type === "draw") {
    const newLayers = state.layers.map((layer) => {
      if (layer.id === state.selectedLayerId) {
        layer.shapes.splice(layer.shapes.length - 1, 1, action.shape);
      }

      return layer;
    });

    return { ...state, layers: newLayers };
  }
  if (type === "deleteLayer") {
    const newLayers = state.layers.filter(
      (item) => item.id !== state.selectedLayerId
    );
    return { ...state, layers: newLayers };
  }
  if (type === "selectLayer") {
    return { ...state, selectedLayerId: action.id };
  }
};
