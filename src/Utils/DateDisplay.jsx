import React from 'react';

const DateDisplay = (props) => {
  const calculateMinutesAgo = () => {
    const date = new Date(props.date);
    const currentTime = new Date();
    const timeDiff = Math.abs(currentTime - date);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) {
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months >= 1) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (weeks >= 1) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (days >= 1) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours >= 1) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  return (
    <div className='date-all1'>
      {calculateMinutesAgo()}
    </div>
  );
};

export default DateDisplay;