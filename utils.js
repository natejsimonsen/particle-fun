function getRandomInt(min, max) {
  let guess = 0;
  while (guess == 0) {
    guess = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return guess;
}

export { getRandomInt };
