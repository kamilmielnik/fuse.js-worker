/**
 * @param callback Polling will stop when callback returns false
 */
const poll = (callback: () => boolean, time: number) => {
  let interval = global.setInterval(() => {
    if (!callback()) {
      global.clearInterval(interval);
    }
  }, time);
};

export default poll;
