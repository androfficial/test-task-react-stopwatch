export const timeFormatting = (seconds) => {
  const hrs = `0${Math.floor(seconds / 3600)}`.slice(-2);
  const min = `0${Math.floor(seconds / 60) % 60}`.slice(-2);
  const sec = `0${Math.floor(seconds % 60)}`.slice(-2);

  return `${hrs}:${min}:${sec}`;
};
