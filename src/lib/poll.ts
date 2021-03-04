/**
 * @param callback Polling will stop when callback returns false
 */
const poll = (callback: () => boolean, time: number) => {
  let interval = self.setInterval(() => {
    if (!callback()) {
      self.clearInterval(interval);
    }
  }, time);
};

export default poll;
