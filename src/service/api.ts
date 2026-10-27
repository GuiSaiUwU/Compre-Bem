export const SERVIDOR_URL = "http://localhost:8080";
const API_URL = `${SERVIDOR_URL}/api/v1`

export interface PaginaResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: object;
    size: number;
    sort: object;
    totalElements: number;
    totalPages: number;
}

export async function getPaginado<T>(endpoint: string): Promise<Awaited<PaginaResponse<T>>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if (!response.ok) {
        throw new Error(`Falha no get ${API_URL}${endpoint} `);
    }

    return response.json();
}