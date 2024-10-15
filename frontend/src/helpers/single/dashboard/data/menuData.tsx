import { Home, Building, Map, Users, Key, FileText } from "lucide-react";

const menuItems = [
  { name: "Início", icon: Home, path: "/" },
  { name: "Condomínios", icon: Building, path: "/condominium" },
  { name: "Terrenos", icon: Map, path: "/terrenos" },
  { name: "Proprietários", icon: Users, path: "/proprietarios" },
  { name: "Ocupações", icon: Key, path: "/ocupacoes" },
  { name: "Relatórios", icon: FileText, path: "/relatorios" },
];

export default menuItems;
