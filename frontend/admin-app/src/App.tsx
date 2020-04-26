import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import PageSpinner from './components/PageSpinner/PageSpinner';

import {IState} from './store'
import MainLayout from './components/Layout/MainLayout/MainLayout'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'

const ProductsPage = React.lazy(() => import('./pages/ProductsPage/ProductsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const TemplatesPage = React.lazy(() => import('./pages/TemplatesPage/TemplatesPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage/TeamPage'));
const TemplatePage = React.lazy(() => import('./pages/TemplatePage/TemplatePage'))



const mapState = (state: IState) => ({
  accessToken: state.user.accessToken,
  user: state.user.user
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

type IAppProps = PropsFromRedux & {

}

function App(props: IAppProps) {
  return (
    <>
      {!props.accessToken && !props.user ? (
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Redirect to="/login"/>
        </Switch>
      ) : (
        <MainLayout>
          <React.Suspense fallback={<PageSpinner />}>
            <Switch>
              <Route exact path="/company" component={ProfilePage} />
              <Route exact path="/templates/:templateId" component={TemplatePage} />
              <Route exact path="/templates" component={TemplatesPage} />
              <Route exact path="/products" component={ProductsPage} />
              <Route exact path="/team" component={TeamPage} />
              <Redirect to="/templates"/>
            </Switch>
          </React.Suspense>
        </MainLayout>
      )}
    </>
  );
}

export default connector(App);
