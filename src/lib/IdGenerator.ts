function* IdGenerator(): Generator<number> {
  let i = 0;

  while (true) {
    yield i++;
  }
}

export default IdGenerator;
