import { create } from 'zustand';

type MsgStore = {
    msg: string;
    setMsg: (message: string) => void;
}

const useMsgStore = create<MsgStore>((set) => ({
    msg: '',
    setMsg: (message: string) => set({ msg: message }), // Fixed the syntax here
}));

export default useMsgStore;
