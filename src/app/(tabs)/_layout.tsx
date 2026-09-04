//PAGINA DE LAYOUT (Tabs do App)
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { cores } from "../../theme/cores";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarStyle: { backgroundColor: cores.fundoCard },
        headerStyle: { backgroundColor: cores.fundo },
        headerTintColor: cores.texto,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Oracle",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
