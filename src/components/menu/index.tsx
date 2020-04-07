import React, { useRef, useState, useEffect, useCallback } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

import Portal from 'components/portal';

import './index.scss';

interface Item {
  text: string;
  action: () => Promise<void>;
}

interface Props {
  items: Item[];
}

const Menu = ({ items }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible, setMenuVisible]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        right: window.innerWidth - rect.right,
      });
    }
  }, [buttonRef]);

  const menuRef = useRef(null);
  useOnclickOutside([buttonRef, menuRef], () => {
    setMenuVisible(false);
  });

  return (
    <>
      <button ref={buttonRef} className="button-icon" onClick={toggleMenu}>
        <i className="material-icons">more_horiz</i>
      </button>
      {menuVisible && (
        <Portal>
          <div ref={menuRef} className="popover-items" style={{ ...position }}>
            {items.map(item => (
              <div key={item.text} className="hoverable-item padding-h">
                <button className="button-phantom w-100" onClick={item.action}>
                  {item.text}
                </button>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Menu;
