//PAGINA DE FAVORITOS ()
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import NoticiaCard from "../../components/NoticiaCard";
import { listarFavoritos } from "../../services/favoritos";
import { Noticia } from "../../services/newsApi";
import { cores } from "../../theme/cores";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Noticia[]>([]);

  useFocusEffect(
    useCallback(() => {
      listarFavoritos().then(setFavoritos);
    }, []),
  );

  if (favoritos.length === 0) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoVazio}>
          Você ainda não tem notícias favoritas.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      data={favoritos}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => <NoticiaCard noticia={item} />}
      contentContainerStyle={{ paddingTop: 12 }}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cores.fundo,
  },
  textoVazio: {
    color: cores.textoSecundario,
  },
});
