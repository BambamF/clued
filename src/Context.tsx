import { createContext, Dispatch, SetStateAction } from 'react';

type User = {
 id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
}

type UserContextType = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: {
    id: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  dob: '',
  },
  setUser: () => {},
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

type Clue = {
  clueId: string;
  userId: string;
  dateCreated: string;
  timeCreated: string;
  title: string;
  location: string;
  notes: string;
  audio: string;
  links: string;
  main: string;
  mainFileType: string;
}

type ClueContextType = {
  clueData: Clue;
  setClueData: Dispatch<SetStateAction<Clue>>;
};

export const ClueContext = createContext<ClueContextType>({
  clueData: {
    clueId: '',
    userId: '',
    dateCreated: '',
    timeCreated: '',
    title: '',
    location: '',
    notes: '',
    audio: '',
    links: '',
    main: '',
    mainFileType: ''
  },
  setClueData: () => {},
});

type ClueRawFileContextType = {
  rawFile: File | null;
  setRawFile: Dispatch<SetStateAction<File | null>>;
};

export const ClueRawFileContext = createContext<ClueRawFileContextType>({
  rawFile: null,
  setRawFile: () => {},
});