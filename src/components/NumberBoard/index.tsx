//@ts-nocheck
import React from "react";
import { IonButton } from "@ionic/react";
import NumberColumn from "../NumberColumn";
import "./index.css";

const NumberBoard: React.FC = ({ btns, pickNumber }: any) => (
  <div className="number-board">
    <NumberColumn btns={btns.slice(0, 5)} pickNumber={pickNumber} />
    <NumberColumn btns={btns.slice(5)} pickNumber={pickNumber} />
  </div>
);

export default NumberBoard;
