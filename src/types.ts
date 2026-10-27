import { Produto } from "./types/produto";

export type RootStackParamList = {
  ListaProdutos: undefined;
  CadastroProduto: undefined;
  DetalheProduto: { produto: Produto };
};