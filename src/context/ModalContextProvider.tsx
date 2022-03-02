import React from 'react';
import { createContext, useContext, useState } from 'react';

type ModalContextState = {
  isModalOn: boolean;
  setIsModalOn: (newVal: boolean) => void;
};

const modalContext = createContext<ModalContextState>({
  isModalOn: false,
  setIsModalOn: (newVal: boolean) => {},
});

export const useModal = () => {
  const response = useContext(modalContext);
  return response;
};

export default function ModalContextProvider({ children }) {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);

  const state = {
    isModalOn,
    setIsModalOn,
  };

  return (
    <modalContext.Provider value={state}>{children}</modalContext.Provider>
  );
}
