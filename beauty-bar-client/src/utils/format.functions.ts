
function formatTime(timeString: string) {
    const hours = parseInt(timeString.slice(0, 2));
    const minutes = parseInt(timeString.slice(1));
    const hoursStr = hours.toString().padStart(2, "0");
    const minutesStr = minutes.toString().padStart(2, "0");
    return `${hoursStr}:${minutesStr}`;
  }
  
  function formatDate(dateString: string) {
    const year = parseInt(dateString.slice(0, 4));
    const month = parseInt(dateString.slice(1, 2));
    const day = parseInt(dateString.slice(2));
    const formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }
  function formatDateTime(dateTime: string){
    const dateObject = new Date(dateTime);
    const formattedDate = `${dateObject.getDate()}.${dateObject.getMonth() + 1}.${dateObject.getFullYear()}`;
    const formattedTime = `${dateObject.getHours()}:${String(dateObject.getMinutes()).padStart(2, '0')}`;
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;
     return formattedDateTime;
  }
  const TimeFormatService = {
    formatTime,
    formatDate,
    formatDateTime
  };

  export default TimeFormatService;