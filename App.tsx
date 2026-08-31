import { SafeAreaProvider } from 'react-native-safe-area-context';
import TelaPrincipal from './src/telas/TelaPrincipal';


export default function App() {
  return (
    <SafeAreaProvider>
      <TelaPrincipal />
    </SafeAreaProvider>
  );
}
