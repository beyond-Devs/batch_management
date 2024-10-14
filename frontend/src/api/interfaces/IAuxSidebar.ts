export interface IAuxProps {
    setSubmenu: (submenu: string) => void;  
    submenu: string;
    toggleSubmenuVisibility: () => void;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void; 
    setCurrentTitle: (title: string) => void;
}

export interface IHandleMenuClick {
    submenuId: string; 
    title: string;     
}