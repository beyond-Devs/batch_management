import { Clock, FolderKanban, Home, Landmark, LayoutGrid, UserPlus,Building2,Proportions,AlignEndHorizontal } from "lucide-react";
import { NavigationLinks, } from "../ident/interfaces/navigation.interface";

const navigationLinks :NavigationLinks = {
    '/appointments': [
        { icon: Clock, href: '/appointments', label: 'Agendamentos' },
    ],
    '/projects': [
        { icon: Building2, href: '/projects', label: 'Projetos' },
        { icon: AlignEndHorizontal, href: '/projects/zone', label: 'Zonas' },
        { icon: Proportions, href: '/projects/property', label: 'Imoveis' },
    ],
    '/users-management': [
        { icon: LayoutGrid, href: '/users-management', label: 'Visualizar usuários' },
        { icon: UserPlus, href: '/users-management/create', label: 'Criar usuários' },
    ],
};

export default navigationLinks;