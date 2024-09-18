export interface Permission {
    name: string;
  }
  
  export interface Menu {
    id: number;
    name: string;
    title: string;
    routes: string;
    parentId: number;
    icon: string;
    selected: boolean;
    path: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu: Menu[];
  }