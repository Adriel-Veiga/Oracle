//SERVIÇO DE NOTÍCIAS (API)
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export interface Noticia {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export async function buscarNoticias(
  categoria?: string,
  termoBusca?: string,
): Promise<Noticia[]> {
  try {
    const response = await api.get("/top-headlines", {
      params: {
        country: "us",
        category: categoria || undefined,
        q: termoBusca || undefined,
      },
    });
    return response.data.articles;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Chave de API inválida.");
      }
      if (error.response.status === 426 || error.response.status === 429) {
        throw new Error("Limite de requisições da NewsAPI atingido.");
      }
      throw new Error("Erro ao buscar notícias no servidor.");
    }
    throw new Error("Sem conexão com a internet.");
  }
}
