import React, { useState, useEffect } from 'react';

const zeroPad = (num: any) => String(num).padStart(2, '0');

const Timer = ({min, sec}:any) => {
  return (
    <div className="time">
      {`${zeroPad(min)}:${zeroPad(sec)}`}
    </div>
  );
};

export default Timer;