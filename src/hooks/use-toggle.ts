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
  setToggled: (value: boolean) => void;
} => {
  const [isToggled, setToggled] = useState(initialState);

  const toggle = useCallback(() => setToggled((prevIsToggled) => !prevIsToggled), []);

  const close = useCallback(() => setToggled(false), []);

  return useMemo(() => ({ isToggled, toggle, close, setToggled }), [close, isToggled, toggle]);
};

export default useToggle;
