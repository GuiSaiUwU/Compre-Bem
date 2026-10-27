import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../types';

import { useEffect, useState } from 'react';
import { Produto } from '../types/produto';
import { getProdutos } from '../service/produto-service';

function ProdutoItem({ produto, onPress }: { produto: Produto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>RS ${produto.preco}</Text>
    </TouchableOpacity>
  );
}


type Props = NativeStackScreenProps<RootStackParamList, 'ListaProdutos'>;

export default function TelaListaProdutos({ navigation }: { navigation: Props['navigation'] }) {
  const [produtos, setProdutos] = useState<Produto[]>();
  const [pagina, setPagina] = useState(0);
  const [filtro, setFiltro] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    getProdutos(pagina, filtro).then((res) => {
      setProdutos(res.content);
      setTotalPages(res.page.totalPages);
      setIsFirst(res.page.number == 0);
      setIsLast(res.page.number == (res.page.totalPages - 1));
    });
  }, [pagina, filtro]);

  function paginaAnterior() {
    if (!isFirst) {
      setPagina((prev) => prev - 1);
    }
  }

  function proximaPagina() {
    if (!isLast) {
      setPagina((prev) => prev + 1);
    }
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <View style={[styles.item, { 'padding': 2, 'backgroundColor': 'rgb(33, 150, 243)' }]}>
          <Button title='Cadastrar produto' onPress={() => { navigation.navigate('CadastroProduto') }} />
        </View>

        <View style={styles.cadastro}>
          <TextInput style={styles.input} placeholder='Busca' value={filtro} onChangeText={setFiltro} />
        </View>

        <FlatList
          data={produtos}
          keyExtractor={(item) => item.produtoId}
          renderItem={({ item }) => (
            <ProdutoItem
              produto={item}
              onPress={() => navigation.navigate('DetalheProduto', { produto: item })}
            />
          )}
        />

        <View style={styles.paginacaoContainer}>
          <TouchableOpacity
            style={[styles.botaoPaginacao, isFirst && styles.botaoDesabilitado]}
            onPress={paginaAnterior}
            disabled={isFirst}
          >
            <Text style={styles.textoBotao}>⬇️ Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.textoPagina}>
            {pagina + 1} / {totalPages || 1}
          </Text>

          <TouchableOpacity
            style={[styles.botaoPaginacao, isLast && styles.botaoDesabilitado]}
            onPress={proximaPagina}
            disabled={isLast}
          >
            <Text style={styles.textoBotao}>Próximo ⬆️</Text>
          </TouchableOpacity>
        </View>
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
  paginacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  botaoPaginacao: {
    backgroundColor: '#3182CE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  botaoDesabilitado: {
    backgroundColor: '#CBD5E0',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  textoPagina: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
});