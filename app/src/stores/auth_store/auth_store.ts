import { createSignal } from 'solid-js';

export const [isAuthenticated, setIsAuthenticated] = createSignal(false);
export const [needsReauth, setNeedsReauth] = createSignal(false);
