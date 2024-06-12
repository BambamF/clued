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

type ClueNotesContextType = {
  clueNotes: string;
  setClueNotes: Dispatch<SetStateAction<string>>;
};

export const ClueNotesContext = createContext<ClueNotesContextType>({
  clueNotes: "",
  setClueNotes: () => {},
});

type ClueDateContextType = {
  clueDate: Date;
  setClueDate: Dispatch<SetStateAction<Date>>;
};

export const ClueDateContext = createContext<ClueDateContextType>({
  clueDate: new Date(),
  setClueDate: () => {},
});

type ClueTitleContextType = {
  clueTitle: string;
  setClueTitle: Dispatch<SetStateAction<string>>;
};

export const ClueTitleContext = createContext<ClueTitleContextType>({
  clueTitle: "",
  setClueTitle: () => {},
});

type ClueMainFileContextType = {
  clueMainFile: string;
  setClueMainFile: Dispatch<SetStateAction<string>>;
};

export const ClueMainFileContext = createContext<ClueMainFileContextType>({
  clueMainFile: "",
  setClueMainFile: () => {},
});

type ClueTimeContextType = {
  clueTime: string;
  setClueTime: Dispatch<SetStateAction<string>>;
};

export const ClueTimeContext = createContext<ClueTimeContextType>({
  clueTime: "",
  setClueTime: () => {},
});