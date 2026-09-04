//LAYOUT RAIZ do app
import { Stack } from "expo-router";
import { cores } from "../theme/cores";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="detalhes/[id]"
        options={{
          title: "Detalhes da Notícia",
          headerStyle: { backgroundColor: cores.fundo },
          headerTintColor: cores.texto,
        }}
      />
    </Stack>
  );
}
