export function getDateTime(date: string, time: string) {
  return (
    new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10) +
    new Date(new Date(time).getTime() + 2 * 60 * 60 * 1000)
      .toISOString()
      .slice(10, 19)
  );
}

export function getDate(date: string) {
  return new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}
