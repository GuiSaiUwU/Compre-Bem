import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types";


type Props = NativeStackScreenProps<RootStackParamList, 'CadastroProduto'>;

export default function TelaCadastro({ navigation }: { navigation: Props['navigation'] }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagem, setImagem] = useState('');

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

        const quantidadeNumerico = Number(quantidade.trim().replace(',', '.'));
        if (quantidade.trim() === '' || isNaN(quantidadeNumerico) || quantidadeNumerico < 0) {
            setErro('Quantidade Inválida');
            return;
        }

        if (descricao.length > 140) {
            /* Pode ser vazia, sem problemas */
            setErro('A descrição não deve ser maior que 140 caracteres.')
            return;
        }

        // TODO: add metodo POST
        /*
        adicionarProduto({
          id: "",
          nome,
          preco: precoNumerico,
          descricao: descricao,
          categoria: categoria,
          imagem: imagem,
          quantidade: quantidadeNumerico
        });
        */

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
                    <TextInput style={styles.input} placeholder='Categoria' value={categoria} onChangeText={setCategoria} />
                    <TextInput style={styles.input} placeholder='Imagem' value={imagem} onChangeText={setImagem} />
                    <TextInput style={styles.input} placeholder='Preço' keyboardType='numeric' value={preco} onChangeText={setPreco} />
                    <TextInput style={styles.input} placeholder='Quantidade' keyboardType='numeric' value={quantidade} onChangeText={setQuantidade} />

                    {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

                    <Button title='Cadastrar produto' onPress={validarESalvar} />
                </View>
            </View>
        </SafeAreaView>

    )
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