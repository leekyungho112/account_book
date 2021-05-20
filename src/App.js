import Day from './component/Day';
import DayList from './component/DayList';
import Header from './component/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmptyPage from './component/EmptyPage';
import CreateAccount from './component/CreateAccount';
import CreateDay from './component/CreateDay';
import EditAccount from './component/EditAccount';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <DayList />
          </Route>
          <Route path="/day/:day">
            <Day />
          </Route>
          <Route path="/create_account">
            <CreateAccount />
          </Route>
          <Route path="/create_day">
            <CreateDay />
          </Route>
          <Route path="/edit/account/:id">
            <EditAccount />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
