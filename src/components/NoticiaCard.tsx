import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { alternarFavorito, ehFavorito } from "../services/favoritos";
import { Noticia } from "../services/newsApi";

interface Props {
  noticia: Noticia;
}

export default function NoticiaCard({ noticia }: Props) {
  const [favoritado, setFavoritado] = useState(false);
  const idCodificado = encodeURIComponent(noticia.url);

  useEffect(() => {
    ehFavorito(noticia.url).then(setFavoritado);
  }, []);

  async function handleFavoritar() {
    const novoEstado = await alternarFavorito(noticia);
    setFavoritado(novoEstado);
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/detalhes/[id]",
          params: {
            id: idCodificado,
            titulo: noticia.title,
            descricao: noticia.description,
            imagem: noticia.urlToImage,
            fonte: noticia.source?.name,
            data: noticia.publishedAt,
          },
        })
      }
    >
      {noticia.urlToImage ? (
        <Image source={{ uri: noticia.urlToImage }} style={styles.imagem} />
      ) : (
        <View style={[styles.imagem, styles.imagemVazia]} />
      )}

      <TouchableOpacity style={styles.estrela} onPress={handleFavoritar}>
        <Ionicons
          name={favoritado ? "star" : "star-outline"}
          size={20}
          color={favoritado ? "#f5c518" : "#fff"}
        />
      </TouchableOpacity>

      <View style={styles.conteudo}>
        <Text style={styles.titulo} numberOfLines={2}>
          {noticia.title}
        </Text>
        <Text style={styles.meta}>
          {noticia.source?.name} ·{" "}
          {new Date(noticia.publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  imagem: {
    width: "100%",
    height: 140,
  },
  imagemVazia: {
    backgroundColor: "#ddd",
  },
  estrela: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
  },
  conteudo: {
    padding: 10,
  },
  titulo: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    fontSize: 11,
    color: "#666",
  },
});
