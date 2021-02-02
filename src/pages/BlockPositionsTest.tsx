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

const defaultState = {
  round: 0,
  mensaje: '',
  bloquesAElegir: [[],[],[],[]],
  bloquesElegidos: [[],[],[],[]],
  bloquesAMostrar: _.cloneDeep(defaultPositions),
  action: null
};

const MemorizeNumbers: React.FC = (props: any) => {
  const [state, setState] = useState<any>({..._.cloneDeep(defaultState)});
  const history = useHistory();

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

    return nuevasPosiciones;
  };

  useEffect(() => {
    setState((state: any) => ({ ...state, mensaje: 'Atención', round: 1 }));
  }, []);

  useEffect(() => {
    const { mensaje, action, round, bloquesAMostrar, bloquesAElegir, bloquesElegidos } = state;
    let rotationInterval: any;

    if (round <= 4) {
      if (mensaje === 'Atención' && action !== 'Colorize blocks') {
        const nuevasPosiciones = alignBlocks();
        setState((state: any) => ({...state, bloquesAMostrar: nuevasPosiciones, action: 'Colorize blocks'}));
      } else if (action === 'Colorize blocks') {
        let nuevosBloquesAMostrar = _.cloneDeep(bloquesAMostrar);
        const bloquesLibres = bloquesAMostrar.map((v: any, idx: any) => ({...v, idx})).filter((b: any, idx: any) => !b.color).map((v: any) => v.idx);
        const bloquesElegidos = 8 - bloquesLibres.length;

        if (bloquesElegidos < round + 1) {
          const bloqueRandom = bloquesLibres.splice(randomNumber(bloquesLibres.length), 1)[0];
          nuevosBloquesAMostrar[bloqueRandom].color = 'red';
          bloquesAElegir[round - 1].push(bloqueRandom);

          rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({ ...state, mensaje: '', bloquesAMostrar: nuevosBloquesAMostrar, bloquesAElegir }));
          }, 1000);
        } else {
          rotationInterval = window.setTimeout(() => {
            setState((state: any) => ({ ...state, mensaje: '', action: 'Limpiar bloques' }));
          }, 2000);
        }
      } else if (action === 'Limpiar bloques') {
        const bloquesSinColor = bloquesAMostrar.map((b: any) => ({...b, color: ''}));
        setState((state: any) => ({ ...state, mensaje: 'Tu turno', action: 'Turno usuario', bloquesAMostrar: bloquesSinColor}));
      } else if (action === 'Turno usuario' && bloquesElegidos[round-1].length === bloquesAElegir[round-1].length) {
        const correcto = checkBlocksSelected(bloquesAElegir[round-1], bloquesElegidos[round-1]);
        let mensaje = correcto ? 'Correcto' : 'Incorrecto';

        setState((state: any) => ({ ...state, mensaje, action: ''}));
      } else if (mensaje === 'Correcto' || mensaje === 'Incorrecto') {
        rotationInterval = window.setTimeout(() => {
          setState((state: any) => ({ ...state, mensaje: 'Atención', round: state.round + 1, bloquesAMostrar: _.cloneDeep(defaultPositions)}));
        }, 2000);
      }
    } else {
      rotationInterval = window.setTimeout(() => {
        const { cookies } = props;
        const ticket = cookies.get('ticket');
        const categoria = cookies.get('categoria');
        const usuarioTesteado = cookies.get('usuario_testeado');
        const { cedula } = usuarioTesteado;
        const { bloquesAElegir, bloquesElegidos } = state;

        const examen = {
          examenes: {
            [categoria]: {
              "psiquica": {
                "posiciones bloques": {bloquesAElegir, bloquesElegidos},
                fecha: new Date()
              }
            }
          }
        };

        actualizarDatosUsuarioTesteadoPorCedula(cedula, examen)
        .then(result => {
          sendResult(ticket, cedula, 100)
          .then(result => {
            setState((state: any) => ({...state, ..._.cloneDeep(defaultState)}));

            history.replace('/page/test-finished', {type: 'psiquica', test: 'posiciones-bloques'});

          })
          .catch((error: any) => console.log(error));
        })
        .catch((error: any) => {
          console.log(error);
        });
      }, 300);
    }

    return () => {
      clearTimeout(rotationInterval)
    }
  }, [state]);

  const empezar = () =>
    setState((state: any) => ({...state, mensaje: 'Atención', round: 1}));

  const { round, mensaje } = state;

  const pickBlock = (number: any) => {
    const { bloquesElegidos, bloquesAMostrar, round } = state;

    bloquesAMostrar[number].color = 'red';
    bloquesElegidos[round - 1].push(number);

    setState((state: any) => ({...state, bloquesElegidos, bloquesAMostrar }));
  };

  const checkBlocksSelected = (bloquesAElegir: any, bloquesElegidos: any) =>
    JSON.stringify(bloquesAElegir[round-1]) === JSON.stringify(bloquesElegidos[round-1]);

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

  const { min, sec, btns, showButtons, bloquesAMostrar: bloques } = state;

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