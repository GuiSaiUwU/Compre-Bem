import { Produto } from "../types/produto";
import { getPaginado, PaginaResponse } from "./api";


export async function getProdutos(pagina: number, filtro: string): Promise<Awaited<PaginaResponse<Produto>>> {
    return (await getPaginado<Produto>(`/produtos?page=${pagina}&busca=${filtro}`));
}