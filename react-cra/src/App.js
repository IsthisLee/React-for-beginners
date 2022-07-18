import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Detail from './Pages/Detail';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
