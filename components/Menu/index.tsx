"use client";
import { useRef } from "react";
import { MenuProps } from "./types";
import { useMenuLogic } from "./useMenuLogic";
import { useMenuAnimations } from "@/hooks/useMenuAnimations";
import { MenuLogo } from "./MenuLogo";
import { MenuToggle } from "./MenuToggle";
import { MenuItemComponent } from "./MenuItem";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./index.scss";

const Menu = ({ locale, className = "" }: MenuProps) => {
  const menuRef = useRef<HTMLElement>(null);
  const { state, actions, menuItems } = useMenuLogic(locale);

  useMenuAnimations(menuRef, state.isOpen);

  const handleItemClick = () => {
    actions.closeMenu();
  };

  const menuClasses = `
    modern-menu 
    ${state.isScrolled ? "scrolled" : ""} 
    ${state.isOpen ? "open" : ""} 
    ${className}
  `.trim();

  return (
    <nav className={menuClasses} ref={menuRef}>
      <div className="menu-background"></div>

      <div className="menu-container">
        <MenuLogo locale={locale} />

        <div className="menu-content">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                isActive={state.activeItem === item.id}
                onItemClick={handleItemClick}
              />
            ))}
            <li className="menu-item language-item">
              <LanguageSwitcher currentLocale={locale} />
            </li>
          </ul>
        </div>

        <MenuToggle isOpen={state.isOpen} onToggle={actions.toggleMenu} />
      </div>
    </nav>
  );
};

export default Menu;
