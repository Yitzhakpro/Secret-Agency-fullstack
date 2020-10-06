import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Layout/Home';
import AddWanted from './components/wanteds/AddWanted';
import WantedList from './components/wanteds/WantedList';
import OwnerPanel from './components/OwnerAccess/OwnerPanel';
import UsersList from './components/OwnerAccess/UsersList';
import ManageUsers from './components/OwnerAccess/ManageUsers';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/OwnerPanel' component={OwnerPanel} />
          <Route path='/OwnerPanel/UsersList' component={UsersList} />
          <Route path='/OwnerPanel/ManageUsers' component={ManageUsers} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/wanted-list' component={WantedList} />
          <Route path='/add-wanted' component={AddWanted} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
