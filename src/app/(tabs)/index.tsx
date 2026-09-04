import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NoticiaCard from "../../components/NoticiaCard";
import { buscarNoticias, Noticia } from "../../services/newsApi";

const CATEGORIAS = [
  { label: "Geral", value: undefined },
  { label: "Tecnologia", value: "technology" },
  { label: "Esportes", value: "sports" },
  { label: "Negócios", value: "business" },
  { label: "Saúde", value: "health" },
  { label: "Entretenimento", value: "entertainment" },
];

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    const debounce = setTimeout(() => {
      buscarNoticias(categoriaAtiva, busca)
        .then((dados) => setNoticias(dados))
        .catch((e) => setErro(e.message))
        .finally(() => setCarregando(false));
    }, 500);

    return () => clearTimeout(debounce);
  }, [categoriaAtiva, busca]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar notícias..."
        value={busca}
        onChangeText={setBusca}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
      >
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.label}
            style={[
              styles.chip,
              categoriaAtiva === cat.value && styles.chipAtivo,
            ]}
            onPress={() => setCategoriaAtiva(cat.value)}
          >
            <Text
              style={[
                styles.chipTexto,
                categoriaAtiva === cat.value && styles.chipTextoAtivo,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" />
        </View>
      ) : erro ? (
        <View style={styles.centro}>
          <Text>{erro}</Text>
        </View>
      ) : noticias.length === 0 ? (
        <View style={styles.centro}>
          <Text>Nenhuma notícia encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={noticias}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => <NoticiaCard noticia={item} />}
          contentContainerStyle={{ paddingTop: 12 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    margin: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    fontSize: 14,
  },
  chipsContainer: {
    paddingHorizontal: 12,
    maxHeight: 40,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
    height: 32,
  },
  chipAtivo: {
    backgroundColor: "#1a1a1a",
  },
  chipTexto: {
    fontSize: 12,
    color: "#333",
  },
  chipTextoAtivo: {
    color: "#fff",
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
