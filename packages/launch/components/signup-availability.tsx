'use client';
import { createContext, useContext } from 'react';
const SignupAvailability = createContext(false);
export function SignupAvailabilityProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  return <SignupAvailability.Provider value={enabled}>{children}</SignupAvailability.Provider>;
}
export function useSignupAvailability() {
  return useContext(SignupAvailability);
}
