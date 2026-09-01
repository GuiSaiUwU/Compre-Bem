import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Produto, RootStackParamList } from '../types';
import { useState } from 'react';

function ProdutoItem({ produto, onPress }: { produto: Produto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>
    </TouchableOpacity>
  );
}


type Props = NativeStackScreenProps<RootStackParamList, 'ListaProdutos'>;

export default function TelaListaProdutos({ navigation, produtos, adicionarProduto }: { navigation: Props['navigation'], produtos: Produto[], adicionarProduto: (p: Produto) => void }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');



  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Nome' value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
        <TextInput style={styles.input} placeholder='Preço' keyboardType='numeric' value={preco} onChangeText={setPreco} />
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProdutoItem
              produto={item}
              onPress={() => navigation.navigate('DetalheProduto', { produto: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: '#676767'
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8
  },
  erro: {
    color: '#E53E3E',
    marginBottom: 8,
    fontWeight: '500'
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    // Sombra leve para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748'
  },
  preco: {
    fontSize: 14,
    color: '#3182CE',
    fontWeight: '600'
  },
});