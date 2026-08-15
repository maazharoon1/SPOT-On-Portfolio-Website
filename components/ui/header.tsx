const navItems = [
  { name: "Home", id: "home" },
  { name: "Portfolio", id: "portfolio" },
];

const Header = () => {
  return (
    <header className="relative z-30 w-full px-4 pt-5 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        {/* Logo */}
        <a
          href="#home"
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-3xl transition-all duration-300 hover:border-purple-500/30 hover:bg-black/10 sm:px-6 sm:py-3"
        >
          <span className="text-base font-light tracking-[0.25em] text-white sm:text-xl">
            ZAIN
          </span>
        </a>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center rounded-3xl border border-white/10 bg-black/5 p-1.5 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] md:flex"
        >
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className={`mx-1 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 ${
                index === 0
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-purple-400 hover:bg-white/10 hover:text-purple-500"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;