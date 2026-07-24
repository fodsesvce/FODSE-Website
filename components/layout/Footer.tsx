export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs sm:text-sm text-text-muted font-medium tracking-wide">
          © {year} FODSE Club. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

