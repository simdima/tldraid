import { useRef, useEffect } from 'react';

/**
 * Slightly modified version of the solution from https://stackoverflow.com/a/42234988
 */
function useOutsideClicker(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onShowSearchList: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        // console.log('You clicked outside of me!');
        onShowSearchList(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onShowSearchList]);
}

type Props = {
  children: React.ReactNode;
  onShowSearchList: React.Dispatch<React.SetStateAction<boolean>>;
};
const OutsideClicker: React.FC<Props> = ({ children, onShowSearchList }) => {
  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, onShowSearchList);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClicker;
