import { useState } from 'react';
import { FlatList, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Produto, RootStackParamList } from '../types';
import { produtosMock } from '../dados/DadosMockados';
import { SafeAreaView } from 'react-native-safe-area-context';

function ProdutoItem({ produto, onPress }: { produto: Produto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>
    </TouchableOpacity>
  );
}


type Props = NativeStackScreenProps<RootStackParamList, 'ListaProdutos'>;

export default function TelaListaProdutos({ navigation }: Props) {
  return (
    <SafeAreaView>

      <View style={styles.container}>
        <FlatList
          data={produtosMock}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    color: '#1A202C',
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