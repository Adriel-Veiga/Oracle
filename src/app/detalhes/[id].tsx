//DETALHES (Tela de detalhes da notícia)
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Detalhes() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detalhes da notícia: {id}</Text>
    </View>
  );
}
// o [id] é uma forma de dizer ao expo que essa tela é uma variavel
