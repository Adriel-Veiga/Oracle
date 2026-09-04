//DETALHES (Tela de detalhes da notícia)
import { useLocalSearchParams } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cores } from "../../theme/cores";

export default function Detalhes() {
  const params = useLocalSearchParams();
  // extrai os parâmetros da notícia da URL
  const titulo = params.titulo as string;
  const descricao = params.descricao as string;
  const imagem = params.imagem as string;
  const fonte = params.fonte as string;
  const data = params.data as string;
  const url = params.id as string;

  const urlOriginal = decodeURIComponent(url);

  return (
    <ScrollView style={styles.container}>
      {imagem ? <Image source={{ uri: imagem }} style={styles.imagem} /> : null}

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.meta}>
          {fonte} · {data ? new Date(data).toLocaleDateString() : ""}
        </Text>

        {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}

        <TouchableOpacity
          style={styles.botao}
          onPress={() => Linking.openURL(urlOriginal)}
        >
          <Text style={styles.botaoTexto}>Ler notícia completa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  imagem: { width: "100%", height: 220 },
  conteudo: { padding: 16 },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: cores.texto,
    marginBottom: 6,
  },
  meta: { fontSize: 12, color: cores.textoSecundario, marginBottom: 12 },
  descricao: {
    fontSize: 14,
    color: cores.textoSecundario,
    lineHeight: 20,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: cores.destaque,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTexto: { color: cores.branco, fontWeight: "600" },
});
// o [id] é uma forma de dizer ao expo que essa tela é uma variavel
