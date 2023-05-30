export default (startTimeProp: Date) => {
  const convertToTimeAgo = (date: Date) : string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (seconds < 60) {
      return `${seconds}s geleden`;
    }
    if (minutes < 60) {
      return `${minutes}m geleden`;
    }
    if (hours < 24) {
      if (minutes % 60 === 0) {
        return `${hours}u geleden`;
      }
      return `${hours}u ${minutes % 60}m geleden`;
    }
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }



  const elapsedTime = ref("");
  let interval: number | null = null;

  const updateElapsedTime = () => {
    elapsedTime.value = convertToTimeAgo(startTimeProp);
  };

  onMounted(() => {
    updateElapsedTime();
    // @ts-ignore
    interval = setInterval(updateElapsedTime, 1000);
  });

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  watch(() => startTimeProp, () => {
    updateElapsedTime();
  });


  return {
    elapsedTime: elapsedTime,
  };
};
