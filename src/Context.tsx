import { createContext, Dispatch, SetStateAction } from 'react';

type UsersContextType = {
  users: string[];
  setUsers: Dispatch<SetStateAction<string[]>>;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
});

type SignInContextType = {
  signedIn: boolean;
  setSignedIn: Dispatch<SetStateAction<boolean>>;
};

export const SignedInContext = createContext<SignInContextType>({
  signedIn: false,
  setSignedIn: () => {},
});

type TextSupplementContextType = {
  textSupplementActive: boolean;
  setTextSupplementActive: Dispatch<SetStateAction<boolean>>;
};

export const TextSupplementContext = createContext<TextSupplementContextType>({
  textSupplementActive: false,
  setTextSupplementActive: () => {},
});

type AudioSupplementContextType = {
  audioSupplementActive: boolean;
  setAudioSupplementActive: Dispatch<SetStateAction<boolean>>;
};

export const AudioSupplementContext = createContext<AudioSupplementContextType>({
  audioSupplementActive: false,
  setAudioSupplementActive: () => {},
});

type SupplementContextType = {
  supplementActive: boolean;
  setSupplementActive: Dispatch<SetStateAction<boolean>>;
};

export const SupplementContext = createContext<SupplementContextType>({
  supplementActive: false,
  setSupplementActive: () => {},
});

type SupportContextType = {
  supportActive: boolean;
  setSupportActive: Dispatch<SetStateAction<boolean>>;
};

export const SupportContext = createContext<SupportContextType>({
  supportActive: false,
  setSupportActive: () => {},
});