import { useCallback, useMemo, useState } from 'react';

/**
 * Switch between true or false
 */
const useToggle = (
  initialState = false,
): {
  isToggled: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
} => {
  const [isToggled, setToggled] = useState(initialState);

  const toggle = useCallback(() => setToggled((prevIsToggled) => !prevIsToggled), []);

  const close = useCallback(() => setToggled(false), []);

  const open = useCallback(() => setToggled(true), []);

  return useMemo(() => ({ isToggled, toggle, close, open }), [close, open, isToggled, toggle]);
};

export default useToggle;
