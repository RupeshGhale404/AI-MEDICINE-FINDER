import type { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import UserTopbar from "./UserTopbar";

interface UserLayoutProps {
  children: ReactNode;
}

function UserLayout({
  children,
}: UserLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <UserSidebar />

      {/* Right */}
      <div className="flex flex-1 flex-col">

        {/* Topbar */}
        <UserTopbar />

        {/* Page */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default UserLayout;