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

type FullDateContextType = {
  fullDate: string;
  setFullDate: Dispatch<SetStateAction<string>>;
};

export const FullDateContext = createContext<FullDateContextType>({
  fullDate: "",
  setFullDate: () => {},
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
  id: string;
  userId: string;
  dateCreated: string;
  timeCreated: string;
  userClueTitle: string;
  clueLocation: string;
  userClueNotes: string;
  clueAudio: string;
  clueLinks: string;
  clueMain: string;
  clueMainType: string
}

type ClueContextType = {
  clueData: Clue;
  setClueData: Dispatch<SetStateAction<Clue>>;
};

export const ClueContext = createContext<ClueContextType>({
  clueData: {
    id: '',
    userId: '',
    dateCreated: '',
    timeCreated: '',
    userClueTitle: '',
    clueLocation: '',
    userClueNotes: '',
    clueAudio: '',
    clueLinks: '',
    clueMain: '',
    clueMainType: ''
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

type ClueRawFileTypeContextType = {
  rawFileType: string
  setRawFileType: Dispatch<SetStateAction<string>>;
};

export const ClueRawFileTypeContext = createContext<ClueRawFileTypeContextType>({
  rawFileType: '',
  setRawFileType: () => {},
});

type EditClueContextType = {
  editClue: boolean
  setEditClue: Dispatch<SetStateAction<boolean>>;
};

export const EditClueContext = createContext<EditClueContextType>({
  editClue: false,
  setEditClue: () => {},
})