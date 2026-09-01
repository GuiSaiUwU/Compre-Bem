import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Produto, RootStackParamList } from "../types";
import TelaDetalheProduto from "./TelaDetalheProduto";
import TelaListaProdutos from "./TelaListaProdutos";
import { useState } from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

let listaProduto: Produto[] = [
]

export default function TelaPrincipal() {
    const [produtos, setProdutos] = useState<Produto[]>(listaProduto);

    function adicionarProduto(produto: Produto) {
        setProdutos([...produtos, produto]);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ListaProdutos">
                <Stack.Screen name="ListaProdutos">
                    {(props: NativeStackScreenProps<RootStackParamList, 'ListaProdutos'>) => (
                        <TelaListaProdutos
                            navigation={props.navigation}
                            produtos={produtos}
                            adicionarProduto={adicionarProduto}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="DetalheProduto" component={TelaDetalheProduto} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}