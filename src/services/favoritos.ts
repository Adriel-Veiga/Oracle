import AsyncStorage from "@react-native-async-storage/async-storage";
import { Noticia } from "./newsApi";

const CHAVE_FAVORITOS = "@oracle_favoritos";

export async function listarFavoritos(): Promise<Noticia[]> {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error("Erro ao listar favoritos:", error);
    return [];
  }
}

export async function ehFavorito(url: string): Promise<boolean> {
  const favoritos = await listarFavoritos();
  return favoritos.some((noticia) => noticia.url === url);
}

export async function alternarFavorito(noticia: Noticia): Promise<boolean> {
  const favoritos = await listarFavoritos();
  const jaExiste = favoritos.some((item) => item.url === noticia.url);

  let novaLista: Noticia[];

  if (jaExiste) {
    novaLista = favoritos.filter((item) => item.url !== noticia.url);
  } else {
    novaLista = [...favoritos, noticia];
  }

  await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novaLista));
  return !jaExiste;
}
