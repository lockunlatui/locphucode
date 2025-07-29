interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const MenuToggle = ({
  isOpen,
  onToggle,
  className = "",
}: MenuToggleProps) => {
  return (
    <button
      className={`menu-toggle ${isOpen ? "active" : ""} ${className}`}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <span className="toggle-line"></span>
      <span className="toggle-line"></span>
      <span className="toggle-line"></span>
    </button>
  );
};
