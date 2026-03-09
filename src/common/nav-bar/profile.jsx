import { useUser } from "@/hooks/useUserType";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  const handlelogout = async () => {
    localStorage.clear();
    setIsOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative w-[206px] hidden md:block cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="h-12 flex items-center justify-between rounded-full border border-[#EEEEEE] pl-2 pr-3">
          <div className="flex gap-2">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-primary text-white text-sm">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-black">{user?.name}</p>
              <p className="text-xs text-[#7A7E83] capitalize">{user?.role}</p>
            </div>
          </div>
          <ChevronDown size={14} className="cursor-pointer" />
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-full bg-white border border-[#EEEEEE] rounded-lg shadow-lg z-50">
            <ul className="text-sm text-black">
              <li
                onClick={handlelogout}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout{" "}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
