import { create } from "zustand/react";


interface SelectStore {
    selected: number[][] | null;
    setSelected: (quiz: number[][]) => void;
}

export const useSelectStore = create<SelectStore>((set) => ({
    selected: null,

    setSelected : (selected) => {set({ selected })},

}));