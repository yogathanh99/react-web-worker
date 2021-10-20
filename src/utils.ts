const task = (num: number): void => {
  const sum = new Array(num)
    .fill(0)
    .map((el, index) => el + index)
    .reduce((sum, el) => sum + el, 0);

  console.log(sum);
};

export const runTask = (num: number): string => {
  task(num);
  return "done";
};
