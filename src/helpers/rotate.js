export const rotate = (coordinates, origin) => {
  return coordinates.map(coord => {
    const dx = coord.x - origin.x;
    const dy = coord.y - origin.y

    return { x: origin.x - dy, y: origin.y + dx }
  });
}
