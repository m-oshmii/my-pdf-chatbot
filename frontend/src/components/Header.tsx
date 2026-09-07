function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M7 3.5h7.5L19 8v12.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
            <path d="M14.5 3.5V8H19" />
            <path d="M9 13h6M9 16.5h4" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            PDF Chat
          </h1>
          <p className="text-sm text-slate-400">
            Upload a document, then ask questions about it
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
