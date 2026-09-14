import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [erro, setErro] = useState('');
  const [preco, setPreco] = useState('');

  function validarESalvar() {
    if (nome.trim() === '') {
      setErro('O nome não pode ficar vazio.');
      return;
    }

    const precoNumerico = Number(preco.trim().replace(',', '.'));
    if (preco.trim() === '' || isNaN(precoNumerico) || precoNumerico <= 0) {
      setErro('O preço precisa ser um número maior que zero e estar formatado corretamente (ex.: 89,90).');
      return;
    }

    if (descricao.length > 140) {
      /* Pode ser vazia, sem problemas */
      setErro('A descrição não deve ser maior que 140 caracteres.')
      return;
    }

    adicionarProduto({
      id: produtos.length,
      nome,
      preco: `R$ ${precoNumerico.toFixed(2).replace('.', ',')}`,
      descricao: descricao,
    });

    setNome('');
    setPreco('');
    setDescricao('');
    setErro('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <View style={styles.cadastro}>
          <TextInput style={styles.input} placeholder='Nome' value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
          <TextInput style={styles.input} placeholder='Preço' keyboardType='numeric' value={preco} onChangeText={setPreco} />

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <Button title='Cadastrar produto' onPress={validarESalvar}/>
        </View>

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
  cadastro: {
    marginBottom: 16,
    gap: 8
  },
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
    minHeight: 44,
    justifyContent: 'center',
    marginBottom: 8
  },
  erro: {
    color: '#E53E3E',
    marginTop: -12,
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