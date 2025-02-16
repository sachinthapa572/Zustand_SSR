import {create} from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useStore = create(
  subscribeWithSelector((set) => ({
    count: 0,
    theme: 'light',
    increment: () => set((state) => ({ count: state.count + 1 })),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  }))
);

// Subscribe to count changes
const unsubscribeCount = useStore.subscribe(
  (state) => state.count,
  (count) => console.log('Count updated:', count)
);

// Subscribe to theme changes
const unsubscribeTheme = useStore.subscribe(
  (state) => state.theme,
  (theme) => console.log('Theme updated:', theme)
);

// Increment count (triggers count subscription)
useStore.getState().increment();

// Toggle theme (triggers theme subscription)
useStore.getState().toggleTheme();

// Cleanup
unsubscribeCount();
unsubscribeTheme();
