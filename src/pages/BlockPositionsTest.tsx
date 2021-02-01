import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAlert
} from '@ionic/react';
// import Timer from './Timer';
import { useHistory } from 'react-router-dom';
// import { getPreguntasSenhales } from '../APIs';
import { set } from 'idb-keyval';
// import { sendResult } from '../APIs';
// import { updateUserTest } from '../utils/db';
import { withCookies, Cookies } from 'react-cookie';
import { sendResult } from '../APIs';
import { updateUserTest, actualizarDatosUsuarioTesteadoPorCedula } from '../utils/db';
import './MemorizeNumbers.css';
import { debug } from 'console';
import _ from 'lodash';
import './BlockPositionsTest.css';

// import { setMaxListeners } from 'process';

const defaultState = {
  round: 1,
  mensaje: '',
  bloquesAElegir: [[],[],[],[]],
  turnoUsuario: false,
  bloquesElegidos: [[],[],[],[]],
  pintarBloques: false,
  // min: 0,
  // sec: 5,
  roundFinished: false
};

const defaultPositions = [
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''},
  {justify: '', align: '', color: ''}
];

const MemorizeNumbers: React.FC = (props: any) => {
  const [state, setState] = useState<any>({..._.cloneDeep(defaultState)});
  const [showTimer, setShowTimer] = useState<any>(true);
  const history = useHistory();
  let continuar: boolean = false;
  const [showAlert, setShowAlert] = useState(false);
  const [bloques, setBloques] = useState<any>([..._.cloneDeep(defaultPositions)]);

  const doSaveExamProgress = async (exam: any) =>
    await set("exam", {exam});

  const randomNumber = (length: any) =>  
    Math.floor(Math.random() * (length - 0) + 0);

  const alignBlocks = () => {
    let nuevasPosiciones = [];
    const alignments = ['flex-start', 'flex-end', 'center'];

    for(let i = 0; i < 8; i++) {
      const justification = alignments[randomNumber(2)];
      const alignment = alignments[randomNumber(2)];

      nuevasPosiciones.push({justify: justification, align: alignment});
    }

    setBloques(nuevasPosiciones);
    setState((state: any) => ({...state, pintarBloques: true}))
  };

  useEffect(() => {
    alignBlocks();
  }, []);

  const colorizeBlocks = () => {
    let i = 0;
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7];
    let nuevosBloques = [..._.cloneDeep(bloques)];
    const { bloquesAElegir } = state;

    while(i <= state.round) {
      const timeout = window.setTimeout(() => {
        const bloqueRandom = indexes.splice(randomNumber(indexes.length), 1)[0];
        bloquesAElegir[round-1].push(bloqueRandom);
        nuevosBloques[bloqueRandom].color = 'red';
        setBloques((state: any) => [...nuevosBloques]);
        setState((state: any) => ({...state, bloquesAElegir }));
        }, (i * 1000 + 1000));
  
      i++;
    }

    const timeout = window.setTimeout(() => {
      const clearedBlocks = bloques.map((b: any) => ({...b, color: '' }));
      setBloques(clearedBlocks);
      setState((state: any) => ({...state, mensaje: 'Tu turno'}))
    }, 3000);
  }

  useEffect(() => {
    const {mensaje, bloquesAElegir, turnoUsuario, bloquesElegidos, roundFinished, pintarBloques } = state;
    let { round } = state;
    let rotationInterval: any;

    if(pintarBloques) {
      colorizeBlocks();
      setState((state: any) => ({...state, pintarBloques: false }));
    } else if (mensaje === 'Tu turno' && turnoUsuario) {
      setState((state: any) => ({...state, turnoUsuario: true }));

      rotationInterval = window.setTimeout(() => {
        setState((state: any) => ({...state, mensaje: '' }));
      }, 3000);
    }

    // if(!turnoUsuario) {
    //   if(roundFinished) {
    //     if(round === 4) {
    //       rotationInterval = window.setTimeout(() => {
    //         const { cookies } = props;
    //         const ticket = cookies.get('ticket');
    //         const categoria = cookies.get('categoria');
    //         const usuarioTesteado = cookies.get('usuario_testeado');
    //         const { cedula } = usuarioTesteado;
    //         const { bloquesAElegir, bloquesElegidos } = state;

    //         const examen = {
    //           examenes: {
    //             [categoria]: {
    //               "psiquica": {
    //                 "memorizar numeros": {bloquesAElegir, bloquesElegidos},
    //                 fecha: new Date()
    //               }
    //             }
    //           }
    //         };

    //         actualizarDatosUsuarioTesteadoPorCedula(cedula, examen)
    //         .then(result => {
    //           sendResult(ticket, cedula, 100)
    //           .then(result => {
    //             setState((state: any) => ({...state, ..._.cloneDeep(defaultState)}));

    //             history.replace('/page/instrucciones', {type: 'psiquica', test: 'test-colores'});
    //           })
    //           .catch((error: any) => console.log(error));
    //         })
    //         .catch((error: any) => {
    //           console.log(error);
    //         });
    //       }, 300);
    //     } else {
    //       round++;

    //       rotationInterval = window.setTimeout(() => {
    //         setState((state: any) => ({
    //           ..._.cloneDeep(defaultState),
    //           mensaje: 'Atención',
    //           round,
    //           bloquesAElegir: [...state.bloquesAElegir],
    //           turnoUsuario: false,
    //           bloquesElegidos: [...state.bloquesElegidos]
    //         }));
    //       }, 2000);
    //     }
    //   } else {
    //     if(round >= 1 && round <= 4) {
    //       if(mensaje === 'Atención') {        
    //         rotationInterval = window.setTimeout(() => {
    //           setState((state: any) => ({...state, mensaje: '' }));
    //         }, 2000);
    //       } else if (mensaje === '' && bloquesAElegir[round-1].length < round + 1) {
    //         let randNum: any = randomNumber(1).toString();

    //         while(bloquesAElegir[round-1].findIndex((n: any) => n == randNum) != -1) {
    //           randNum = randomNumber(1).toString();
    //         }

    //         bloquesAElegir[round-1].push(randNum);
    //         rotationInterval = window.setTimeout(() => {
    //           setState((state: any) => ({...state, mensaje: randNum, bloquesAElegir}));
    //         });
    //       } else if (mensaje != '' && mensaje != 'Atención') {
    //         rotationInterval = window.setTimeout(() => {
    //           setState((state: any) => ({...state, mensaje: '' }));
    //         }, 2000);
    //       } else if (bloquesAElegir[round-1].length === round + 1) {
    //         setState((state: any) => ({...state, mensaje: 'Tu turno', turnoUsuario: true}));
    //       }
    //     }
    //   }
    // } else {
    //   if (!showButtons) {
    //     rotationInterval = window.setTimeout(() => {
    //         setState((state: any) => ({...state, showButtons: true }));
    //     }, 2000);
    //   } else if(bloquesAElegir[round-1].length === bloquesElegidos[round-1].length) {
    //     const mensaje = bloquesAElegir[round-1].join('') === bloquesElegidos[round-1].join('') ? 'Correcto' : 'Incorrecto';

    //     rotationInterval = window.setTimeout(() => {
    //       setState((state: any) => ({...state, mensaje, turnoUsuario: false, roundFinished: true, showButtons: false }));
    //     }, 300);
    //   }
    // }
    // return () => {
    //   clearTimeout(rotationInterval)
    // }
  }, [state]);

  const empezar = () =>
    setState((state: any) => ({...state, mensaje: 'Atención', round: 1}));

  const { round, mensaje } = state;

  const pickBlock = (number: any) => {
    const { bloquesAElegir, bloquesElegidos } = state;
    let nuevosBloques = [..._.cloneDeep(bloques)];

    nuevosBloques[number].color = 'red';
    bloquesElegidos[round-1].push(number);

    setState((state: any) => ({...state, bloquesElegidos }));
    setBloques((state: any) => [...nuevosBloques]);

    /* contar cuantos bloques no tienen color */

    const coloredBlocks = nuevosBloques.filter((b: any) => b.color).length;

    if (coloredBlocks === bloquesAElegir[round-1].length) {
      console.log('finished');
      // setState((state: any) => ({...state, round: state.round + 1, mensaje: 'Atención'}));

    }
    // if(bloquesElegidos[round-1].length < bloquesAElegir[round-1].length) {
    //   bloquesElegidos[round-1].push(number);

      // setState((state: any) => ({...state, bloquesElegidos, btns}));
    // }
  };

  const claseDeMensaje = (mensaje: any) => {
    let result;
  
    if (parseInt(mensaje, 10) || parseInt(mensaje, 10) === 0) {
      result = 'elemento-grande ';
    } else {
      result = 'elemento-chico';

      if (mensaje === 'Atención') {
        result += ' atencion';
      }
    }

    return result;
  };

  const { min, sec, btns, showButtons } = state;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="alert">
          <IonTitle className="ion-text-uppercase ion-text-center title">prueba psiquica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="display-container">
          <div className="number-display">
            <p
              className={claseDeMensaje(mensaje)}>
            { mensaje }
            </p>
          </div>
        </div>
        <div className="grid">
            <div className="row">
              <div className="col"></div>
              <div className="col" style={{
                justifyContent: bloques[0].justify,
                alignItems: bloques[0].align}}>
                  <div className="block" onClick={() => pickBlock(0)} style={{backgroundColor: bloques[0].color}}></div></div>
              <div className="col" style={{
                justifyContent: bloques[1].justify,
                alignItems: bloques[1].align}}><div className="block" onClick={() => pickBlock(1)} style={{backgroundColor: bloques[1].color}}></div></div>
            </div>
            <div className="row">
              <div className="col" style={{
                justifyContent: bloques[2].justify,
                alignItems: bloques[2].align}}><div className="block" onClick={() => pickBlock(2)} style={{backgroundColor: bloques[2].color}}></div></div>
              <div className="col" style={{
                justifyContent: bloques[3].justify,
                alignItems: bloques[3].align}}><div className="block" onClick={() => pickBlock(3)} style={{backgroundColor: bloques[3].color}}></div></div>
              <div className="col" style={{
                justifyContent: bloques[4].justify,
                alignItems: bloques[4].align}}><div className="block" onClick={() => pickBlock(4)} style={{backgroundColor: bloques[4].color}}></div></div>
            </div>
            <div className="row">
              <div className="col" style={{
                justifyContent: bloques[5].justify,
                alignItems: bloques[5].align}}><div className="block" onClick={() => pickBlock(5)} style={{backgroundColor: bloques[5].color}}></div></div>
              <div className="col"></div>
              <div className="col" style={{
                justifyContent: bloques[6].justify,
                alignItems: bloques[6].align}}><div className="block" onClick={() => pickBlock(6)} style={{backgroundColor: bloques[6].color}}></div></div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col" style={{
                justifyContent: bloques[7].justify,
                alignItems: bloques[7].align}}><div className="block" onClick={() => pickBlock(7)} style={{backgroundColor: bloques[7].color}}></div></div>
              <div className="col"></div>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withCookies(MemorizeNumbers);