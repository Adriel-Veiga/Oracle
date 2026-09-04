import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import NoticiaCard from "../../components/NoticiaCard";
import { listarFavoritos } from "../../services/favoritos";
import { Noticia } from "../../services/newsApi";

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
        <Text>Você ainda não tem notícias favoritas.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => <NoticiaCard noticia={item} />}
      contentContainerStyle={{ paddingTop: 12 }}
    />
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
