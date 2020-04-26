import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PageSpinner from './components/PageSpinner/PageSpinner';

import MainLayout from './components/Layout/MainLayout/MainLayout'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'

const ProductsPage = React.lazy(() => import('./pages/ProductsPage/ProductsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const TemplatesPage = React.lazy(() => import('./pages/TemplatesPage/TemplatesPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage/TeamPage'));

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />

      <MainLayout>
        <React.Suspense fallback={<PageSpinner />}>
          <Route exact path="/company" component={ProfilePage} />
          <Route exact path="/templates" component={TemplatesPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/team" component={TeamPage} />
        </React.Suspense>
      </MainLayout>
      
    </Switch>
    
    </>
  );
}

export default App;