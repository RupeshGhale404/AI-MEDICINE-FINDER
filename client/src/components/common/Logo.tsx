import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
        <span className="text-white text-2xl">
          💊
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          AI Medicine Finder
        </h1>

        <p className="text-xs text-gray-500">
          Smart Healthcare System
        </p>
      </div>
    </Link>
  );
}

export default Logo;