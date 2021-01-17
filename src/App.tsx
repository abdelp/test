import Menu from './components/Menu';

import LoginPage from './pages/Login';
import RegistUserPage from './pages/RegistUser';
import TestTypesPage from './pages/TestTypes';
import MultipleOptionsPage from './pages/MultipleOptions';
import MemorizeNumbersPage from './pages/MemorizeNumbers';
import InstructionsPage from './pages/Instructions';
import TestFinishedPage from './pages/TestFinished';
import TimeOutPage from './pages/TimeOut';
import NoticePage from './pages/Notice';
import PrivateRoute from './components/PrivateRoute';

import React, { useEffect, useRef } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { CookiesProvider, withCookies, Cookies } from "react-cookie";

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

import { loggedIn } from './utils/db';
import { useHistory } from 'react-router-dom';

const App: React.FC = (props: any) => {
  const usuario = props.cookies.get('usuario');
  const history = useHistory();
  const menu = useRef();

  useEffect(() => console.log('effect'));

  return (
    <CookiesProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main" when={false}>
             <Menu />
            <IonRouterOutlet id="main">
              {/* 
  // @ts-ignore */}
              <PrivateRoute path="/page/regist-user" component={RegistUserPage} exact />
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
              <Route exact path="/">
                { usuario ? <Redirect to="/page/regist-user" /> : <LoginPage /> }
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
          <Route path="/login" component={LoginPage} exact >
            { usuario ? <Redirect to="/page/regist-user" /> : <LoginPage /> }
          </Route>
        </IonReactRouter>
      </IonApp>
    </CookiesProvider>
  );
};

export default withCookies(App);
