import Menu from './components/Menu';
import Page from './pages/Page';
import LoginPage from './pages/Login';
import CategoriesPage from './pages/Categories';
import RegistUserPage from './pages/RegistUser';
import TestTypesPage from './pages/TestTypes';
import MultipleOptionsPage from './pages/MultipleOptions';
import InstructionsPage from './pages/Instructions';
import TestFinishedPage from './pages/TestFinished';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

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

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Route path="/page/categories" component={CategoriesPage} exact />
            <Route path="/page/regist-user" component={RegistUserPage} exact />
            <Route path="/page/test-types" component={TestTypesPage} exact />
            <Route path="/page/multiple-options" component={MultipleOptionsPage} exact />
            <Route path="/page/tutorial" component={InstructionsPage} exact />
            <Route path="/page/test-finished" component={TestFinishedPage} exact />
            <Redirect from="/" to="/login" exact />
          </IonRouterOutlet>
        </IonSplitPane>
        <Route path="/login" component={LoginPage} exact />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
