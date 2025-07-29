import Link from "next/link";
import { MenuItem } from "./types";

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onItemClick: () => void;
  className?: string;
}

export const MenuItemComponent = ({
  item,
  isActive,
  onItemClick,
  className = "",
}: MenuItemProps) => {
  const handleClick = () => {
    onItemClick();
  };

  const itemClasses = `
    menu-item 
    ${isActive ? "active" : ""} 
    ${className}
  `.trim();

  if (item.isExternal) {
    return (
      <li className={itemClasses}>
        <a href={item.href} onClick={handleClick} className="menu-link">
          {item.icon && <span className="menu-icon">{item.icon}</span>}
          <span className="menu-text">{item.label}</span>
        </a>
      </li>
    );
  }

  return (
    <li className={itemClasses}>
      <Link href={item.href} onClick={handleClick} className="menu-link">
        {item.icon && <span className="menu-icon">{item.icon}</span>}
        <span className="menu-text">{item.label}</span>
      </Link>
    </li>
  );
};
