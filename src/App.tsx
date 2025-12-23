import { GameProvider } from './context/GameContext';
import { Layout } from './components/Layout';

function App() {
  return (
    <GameProvider>
      <Layout />
    </GameProvider>
  );
}

export default App;
