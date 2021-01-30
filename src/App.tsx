import Menu from './components/Menu';

import LoginPage from './pages/Login';
import RegistUserPage from './pages/RegistUser';
import TestTypesPage from './pages/TestTypes';
import MultipleOptionsPage from './pages/MultipleOptions';
import MemorizeNumbersPage from './pages/MemorizeNumbers';
import PracticalTestPage from './pages/PracticalTest';
import InstructionsPage from './pages/Instructions';
import TestFinishedPage from './pages/TestFinished';
import TimeOutPage from './pages/TimeOut';
import NoticePage from './pages/Notice';
import DeclaracionJuradaPage from './pages/DeclaracionJurada';
import LocationTestPage from './pages/LocationTest';
import ColorsTestPage from './pages/ColorsTest';
import BiggerNumberPage from './pages/BiggerNumber';
import DirectionsTestPage from './pages/DirectionsTest';
import PrivateRoute from './components/PrivateRoute';
import UnloggedRoute from './components/UnloggedRoute';

import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { CookiesProvider, withCookies } from "react-cookie";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = (props: any) => {
  
  setupConfig({
    swipeBackEnabled: false,// also prevent swiping back on either platform
    hardwareBackButton: false// this is what you need (android only)
  });

  return (
    <CookiesProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main" when={false}>
            <Menu />
            <IonRouterOutlet id="main">
              {/*
                // @ts-ignore */}
              <PrivateRoute path="/regist-user" component={RegistUserPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/test-types" component={TestTypesPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/multiple-options" component={MultipleOptionsPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/memorize-numbers" component={MemorizeNumbersPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/test-practico" component={PracticalTestPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/instrucciones" component={InstructionsPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/test-finished" component={TestFinishedPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/time-out" component={TimeOutPage} exact />
              {/* 
                // @ts-ignore */}
              <PrivateRoute path="/page/notice" component={NoticePage} exact />
              {/*
                // @ts-ignore */}
              <PrivateRoute path="/page/declaracion-jurada" component={DeclaracionJuradaPage} exact />
              {/*
                // @ts-ignore */}
              <PrivateRoute path="/page/test-ubicaciones" component={LocationTestPage} exact />
              {/*
                // @ts-ignore */}
              <PrivateRoute path="/page/test-colores" component={ColorsTestPage} exact />
              {/*
                // @ts-ignore */}
              <PrivateRoute path="/page/test-direcciones" component={DirectionsTestPage} exact />
              {/*
              // @ts-ignore */}
              <PrivateRoute path="/page/numeros-grandes" component={BiggerNumberPage} exact />
              {/*
              // @ts-ignore */}
              <PrivateRoute path="/"
                exact
              >
                { props.cookies.get('usuario') ? <RegistUserPage /> : <LoginPage /> }
              </PrivateRoute>
            </IonRouterOutlet>
          </IonSplitPane>
          {/*
            // @ts-ignore */}
          <UnloggedRoute path="/login"
            component={LoginPage}
            exact
            render={() => {
              return props.cookies.get('usuario') ? <RegistUserPage /> : <LoginPage />;
            }}
          >
          </UnloggedRoute>
        </IonReactRouter>
      </IonApp>
    </CookiesProvider>
  );
};

export default withCookies(App);
