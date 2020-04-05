import { useState, useCallback } from 'react';

const useToggle = (initialToggled: boolean): [boolean, () => void] => {
  const [toggled, setToggled] = useState(initialToggled);
  const toggle = useCallback(() => {
    setToggled(!toggled);
  }, [toggled, setToggled]);
  return [toggled, toggle];
};

export default useToggle;
