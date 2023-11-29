import { createSignal } from 'solid-js';
import { authService } from '~/services';

export const [isAuthenticated, setIsAuthenticated] = createSignal(false);
export const [needsReauth, setNeedsReauth] = createSignal(false);

export const signInWithGoogle = () => {
  const authLink = authService.getGoogleAuthLink();
  window.location.replace(authLink);
};

export const signInWithMicrosoft = () => {
  const authLink = authService.getMicrosoftAuthLink();
  window.location.replace(authLink);
};
