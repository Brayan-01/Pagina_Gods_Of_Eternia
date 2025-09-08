import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MenuButton = ({ name, icon, onClick, hasSubItems, className }) => {
  const baseClasses = "bg-transparent border-none w-full p-2.5 text-left text-sm text-white cursor-pointer flex justify-between items-center transition-colors duration-200 ease-in-out hover:bg-black/30 hover:text-amber-300";
  return (
    <button className={`${baseClasses} ${className || ""}`} onClick={onClick}>
      <span className="flex items-center gap-2">
        {icon && <span className="w-4">{icon}</span>}
        <span>{name}</span>
      </span>
      {hasSubItems && <span className="transform transition-transform duration-300">{"\u276F"}</span>}
    </button>
  );
};

const MenuItem = ({
  item,
  onItemClick,
  activeSubMenu,
  onToggleSubMenu,
  parentMenuName,
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isActive = activeSubMenu === item.id;

  const handleButtonClick = () => {
    if (hasSubItems) {
      onToggleSubMenu(item.id);
    } else if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleBackClick = () => {
    onToggleSubMenu(null);
  };

  return (
    <div className="overflow-hidden">
      <MenuButton
        onClick={handleButtonClick}
        name={item.name}
        icon={item.icon}
        hasSubItems={hasSubItems}
      />
      {hasSubItems && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#3e1f0d] to-[#8b4513]"
            >
              <MenuButton
                onClick={handleBackClick}
                icon={"\u2B05"}
                name={parentMenuName || item.name}
                className="font-bold text-amber-300 hover:text-white"
              />
              {item.subItems.map((subItem) => (
                <MenuButton
                  key={subItem.id || subItem.name}
                  name={subItem.name}
                  icon={subItem.icon}
                  onClick={() => {
                    if (onItemClick) onItemClick(subItem);
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export const Dropdown = ({ items, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => setIsOpen(!isOpen);

  const handleToggleSubMenu = (itemId) => setActiveSubMenu(itemId);

  const handleItemClick = (item) => {
    if (onItemSelected) {
      onItemSelected(item);
    }
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block font-sans z-50" ref={dropdownRef}>
      <button onClick={handleToggleDropdown} className="bg-gradient-to-r from-[#3e1f0d] via-[#8b4513] to-[#9b7e20] text-white border-none rounded-md px-3.5 py-1.5 cursor-pointer text-sm flex items-center gap-1.5 transition-opacity hover:opacity-90">
        Menú Perfil
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-52 rounded-lg overflow-hidden bg-gradient-to-r from-[#3e1f0d] to-[#8b4513] shadow-lg"
          >
            <div className="relative">
                {items.map((item) => (
                  <MenuItem
                    key={item.id || item.name}
                    item={item}
                    onItemClick={handleItemClick}
                    activeSubMenu={activeSubMenu}
                    onToggleSubMenu={handleToggleSubMenu}
                    parentMenuName="Principal"
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};