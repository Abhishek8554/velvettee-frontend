import { create } from 'zustand';

interface ILoaderData {
    loaderVisible: boolean;
    showFullPageLoader: () => void;
    hideFullPageLoader: () => void;
}

const useLoader = create<ILoaderData>()((set) => ({
    loaderVisible: false,
    showFullPageLoader: () => set(() => ({ loaderVisible: true })),
    hideFullPageLoader: () => set(() => ({ loaderVisible: false })),
}));

export default useLoader;
