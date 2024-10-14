import { Building2, CirclePercent, ClipboardMinus, Clock, Database, FileText, Landmark, Users } from "lucide-react";
import { IconData } from "../ident/interfaces/modules.interface";

export const IconsData: IconData[] = [
    { Icon: Database, label: 'Dashboard', href: '/welcome' },
    { Icon: Clock, label: 'Agendamentos', href: '/appointments' },
    { Icon: Building2, label: 'Projectos', href: '/projects' },
    // { Icon: Landmark, label: 'Imovel', href: '/properties' },
    // { Icon: ClipboardMinus, label: 'Relatorios', href: '/reports' },
    // { Icon: FileText, label: 'Documentos', href: '/documents' },
    // { Icon: CirclePercent, label: 'Vendas', href: '/sales' },
    { Icon: Users, label: 'Gestao de usuarios', href: '/users-management' },
];