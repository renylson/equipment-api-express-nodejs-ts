export const getNextId = (devices: { id: number }[]): number => {
  const ids = devices.map((d) => d.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};


