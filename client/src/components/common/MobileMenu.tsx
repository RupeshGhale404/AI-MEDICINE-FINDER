import { X } from "lucide-react";
import NavLinks from "./NavLinks";

interface Props {
  open: boolean;
  onClose: () => void;
}

function MobileMenu({
  open,
  onClose,
}: Props) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-6">
        <button onClick={onClose}>
          <X size={28} />
        </button>
      </div>

      <div className="flex flex-col gap-8 px-8">
        <NavLinks />
      </div>
    </div>
  );
}

export default MobileMenu;