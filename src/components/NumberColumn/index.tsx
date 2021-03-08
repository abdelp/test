import React from "react";
import { IonButton } from "@ionic/react";

const NumberColumn: React.FC = ({ btns, pickNumber }: any) => (
  <div className="number-column">
    {btns.map((b: any) => {
      return (
        <IonButton
          key={b.num}
          expand="block"
          className="number-btn"
          color={b.color}
          onClick={() => pickNumber(b.num)}
        >
          {b.num}
        </IonButton>
      );
    })}
  </div>
);

export default NumberColumn;
