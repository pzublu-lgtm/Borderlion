import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ProjectsGrid from './components/ProjectsGrid';
import ResearchList from './components/ResearchList';
import ContactForm from './components/ContactForm';
import TextilePhilosophy from './components/TextilePhilosophy';
import Portfolio2026 from './pages/Portfolio2026';

const App: React.FC = () => {
  return (
    <Router basename="/Borderlion">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/portfolio-2026" component={Portfolio2026} />
        <Route path="/projects" component={ProjectsGrid} />
        <Route path="/research" component={ResearchList} />
        <Route path="/contact" component={ContactForm} />
        <Route path="/textile-philosophy" component={TextilePhilosophy} />
      </Switch>
    </Router>
  );
};

export default App;