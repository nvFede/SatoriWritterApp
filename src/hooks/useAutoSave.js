import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';

const useAutoSave = (content, saveFunction, delay = 2000) => {
  const savedContent = useRef(content);

  useEffect(() => {
    const debouncedSave = debounce(() => {
      if (content !== savedContent.current) {
        saveFunction(content);
        savedContent.current = content;
      }
    }, delay);

    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [content, saveFunction, delay]);
};

export default useAutoSave;
