import React from "react";
import { useNavigate } from "react-router-dom";
import {Home, Folder, Clock3, Star, Trash2, HardDrive, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <aside className="w-64 h-75 bg-white border-r rounded-lg border-gray-200 flex flex-col shadow-sm mt-4">
      <nav className="flex-1 mt-3">
        <ul className=" px-4">
          <li>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <Folder size={20} />
              My Files
            </button>
          </li>
        </ul>
        {/* Storage */}
        <div className="px-6 mt-4">
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

      <div 
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-xl transition cursor-pointer"
        >
      <LogOut size={18}/>
       <span>Logout</span>
     </div>
    </aside>
  );
};

export default Sidebar;