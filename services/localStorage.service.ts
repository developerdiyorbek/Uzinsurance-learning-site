type LocalStorageService = {
  setItem: <T>(key: string, value: T) => void;
  getItem: <T>(key: string) => T | null;
  removeItem: (key: string) => void;
  clear: () => void;
};

const localStorageService: LocalStorageService = {
  setItem: <T>(key: string, value: T) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;

    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch {
      localStorage.clear();
      return null;
    }
  },

  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },

  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

export default localStorageService;
