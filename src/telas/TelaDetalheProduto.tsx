import { View, Text, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import type { Produto } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

function DetalheProduto({ produto }: { produto: Produto }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
        {produto.descricao && <Text style={styles.descricao}>{produto.descricao}</Text>}
      </View>
    </SafeAreaView>
  );
}

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'>;

export default function TelaDetalheProduto({ route }: Props) {
  const { produto } = route.params;

  return <DetalheProduto produto={produto} />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAF9F6',
  },
  nome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  preco: {
    fontSize: 14,
    color: '#3182CE',
    fontWeight: '600'
  },
  descricao: {
    fontSize: 15,
    color: '#636366',
    marginTop: 16,
    lineHeight: 24,
  },
});
