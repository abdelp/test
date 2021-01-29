import React, { useState, useEffect } from 'react';

const zeroPad = (num: any) => String(num).padStart(2, '0');

const Timer = ({min, sec}:any) => {
  return (
    <div className="time">
      <div className="minutos_restantes">{`${zeroPad(min)}`}</div><div className="dos_puntos">:</div><div className="segundos_restantes">{`${zeroPad(sec)}`}</div>
    </div>
  );
};

export default Timer;