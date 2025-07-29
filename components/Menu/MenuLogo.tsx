import Link from "next/link";

interface MenuLogoProps {
  locale: string;
  className?: string;
}

export const MenuLogo = ({ locale, className = "" }: MenuLogoProps) => {
  return (
    <Link href={`/${locale}`} className={`menu-logo ${className}`}>
      <div className="logo-container">
        <span className="logo-text">LocDo</span>
        <span className="logo-accent">.Tech</span>
      </div>
    </Link>
  );
};
