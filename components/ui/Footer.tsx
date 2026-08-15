const socials = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1600px] px-5 pb-14 sm:px-8 lg:px-12">
      <div className="grid gap-10 pt-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="label-xs text-fuchsia-100">LET&apos;S WORK TOGETHER</p>

          <a
            href="mailto:hello@example.com"
            className="mt-4 inline-block text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none tracking-[-0.02em] text-fuchsia-100 transition-colors hover:text-white"
          >
            hello@example.com
          </a>
        </div>

        <nav aria-label="Social" className="lg:col-span-3">
          <ul className="space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-xs inline-flex items-center gap-2 text-fuchsia-100 transition-colors hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary opacity-70" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="label-xs ml-5 space-y-2 text-fuchsia-100 md:mt-5 lg:col-span-3">
          <p>© {new Date().getFullYear()} ZAIN</p>
        </div>
      </div>

      <div className="mt-16 h-px origin-left bg-border" />

      <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-fuchsia-100">
        <a href="#home" id="home" className="inline-block">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}