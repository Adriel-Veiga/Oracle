//PAGINA DE NOTICIAS (Home do App)
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
import { cores } from "../../theme/cores";
// lista de categorias disponíveis para filtro
const CATEGORIAS = [
  { label: "Geral", value: undefined },
  { label: "Tecnologia", value: "technology" },
  { label: "Esportes", value: "sports" },
  { label: "Negócios", value: "business" },
  { label: "Saúde", value: "health" },
  { label: "Entretenimento", value: "entertainment" },
];

export default function Home() {
  // estados para armazenar notícias, status de carregamento, erro, termo de busca e categoria ativa
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | undefined>(
    undefined,
  );
  // busca notícias sempre que a categoria ou o termo de busca mudar
  useEffect(() => {
    setCarregando(true);
    setErro(null);
    //garante que a busca é feita depois de 500ms
    const debounce = setTimeout(() => {
      buscarNoticias(categoriaAtiva, busca)
        .then((dados) => setNoticias(dados))
        .catch((e) => setErro(e.message))
        .finally(() => setCarregando(false));
    }, 500);
    //limpa o timeout
    return () => clearTimeout(debounce);
  }, [categoriaAtiva, busca]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar notícias..."
        value={busca}
        onChangeText={setBusca}
        placeholderTextColor={cores.textoSecundario}
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
          <ActivityIndicator size="large" color={cores.destaque} />
        </View>
      ) : erro ? (
        <View style={styles.centro}>
          <Text style={{ color: cores.texto }}>{erro}</Text>
        </View>
      ) : noticias.length === 0 ? (
        <View style={styles.centro}>
          <Text style={{ color: cores.texto }}>
            Nenhuma notícia encontrada.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ backgroundColor: cores.fundo }}
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
  container: { flex: 1, backgroundColor: cores.fundo },
  input: {
    margin: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: cores.fundoCard,
    color: cores.texto,
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
    backgroundColor: cores.fundoCard,
    marginRight: 8,
    height: 32,
  },
  chipAtivo: {
    backgroundColor: cores.destaque,
  },
  chipTexto: {
    fontSize: 12,
    color: cores.textoSecundario,
  },
  chipTextoAtivo: {
    color: cores.branco,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cores.fundo,
  },
});
