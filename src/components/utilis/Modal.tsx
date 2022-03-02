import React from 'react';
import { useModal } from '@/context/ModalContextProvider';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function Modal({ children, selector = '#portal' }) {
  const { setIsModalOn } = useModal();
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
    setIsModalOn(true);
    return () => {
      setMounted(false);
      setIsModalOn(false);
    };
  }, [selector, setIsModalOn]);

  return mounted
    ? createPortal(children, document.querySelector(selector))
    : null;
}
