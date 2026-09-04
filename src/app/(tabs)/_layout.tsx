//LAYOUT DAS ABAS (tabs=abas)
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  // Configuração das abas do aplicativo
  return (
    <Tabs>
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
