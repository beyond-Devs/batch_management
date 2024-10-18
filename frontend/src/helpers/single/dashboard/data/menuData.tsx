import { Home, Building, Layers, Users, Key, FileText, Map } from "lucide-react";

const menuItems = [
  { name: "Início", icon: Home, path: "/" },
  { name: "Condomínios", icon: Building, path: "/condominium" },
  // { name: "Ruas", icon: Map, path: "/street" },     
  // { name: "Lotes", icon: Layers, path: "/lotes" }, 
  { name: "Clientes / Proprietários", icon: Users, path: "/owner" },
  { name: "Ocupações", icon: Key, path: "/occupancy" },
  { name: "Relatórios", icon: FileText, path: "/relatorios" },
];

export default menuItems;
