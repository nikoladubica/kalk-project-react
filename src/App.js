import './App.css';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import List from './components/List/List';

const App = () => {
  return (
    <div className="App bg-blue-950 text-white">
      <Header />
      <Hero />
      <List />
    </div>
  );
}

export default App;
