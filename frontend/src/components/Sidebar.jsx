import React from "react";
import {Home, Folder, Clock3, Star, Trash2, HardDrive, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full-screen bg-white border-r rounded-lg border-gray-200 flex flex-col shadow-sm">
      <nav className="flex-1 mt-4">
        <ul className="space-y-2 px-4">
          <li>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-medium hover:bg-yellow-200 transition">
              <Home size={20} />
              Home
            </button>
          </li>

          <li>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition">
              <Folder size={20} />
              My Files
            </button>
          </li>

          <li>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition">
              <Clock3 size={20} />
              Recent
            </button>
          </li>

          <li>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition">
              <Star size={20} />
              Starred
            </button>
          </li>

          <li>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition">
              <Trash2 size={20} />
              Trash
            </button>
          </li>
        </ul>

        {/* Storage */}
        <div className="px-6 mt-6">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <HardDrive size={18} />
            <span className="font-medium">Storage</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-2/5 bg-yellow-400 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            2 GB of 5 GB used
          </p>
        </div>
      </nav>

      <div className="p-4">
        <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-xl transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;