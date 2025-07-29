export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
}

export interface MenuProps {
  locale: string;
  className?: string;
}

export interface MenuState {
  isOpen: boolean;
  activeItem: string | null;
  isScrolled: boolean;
}

export interface MenuActions {
  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveItem: (id: string | null) => void;
  handleScroll: () => void;
}
