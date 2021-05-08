// Function in its own file so that it can be mocked.
export const getRandom = (max) => {
  return Math.floor(Math.random() * max);
};
