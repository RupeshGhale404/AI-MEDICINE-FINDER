import { NavLink } from "react-router-dom";

const menus = [
  { name: "Home", path: "/" },
  { name: "Medicines", path: "/search" },
  { name: "Pharmacies", path: "/pharmacies" },
  { name: "AI Assistant", path: "/ai-assistant" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function NavLinks() {
  return (
    <>
      {menus.map((menu) => (
        <NavLink
          key={menu.path}
          to={menu.path}
          className={({ isActive }) =>
            `relative font-medium transition-all duration-300
            ${
              isActive
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center">
              {menu.name}

              <span
                className={`h-[2px] bg-blue-600 mt-1 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </div>
          )}
        </NavLink>
      ))}
    </>
  );
}

export default NavLinks;