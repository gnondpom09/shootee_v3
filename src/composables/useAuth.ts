import { useCurrentUser } from "vuefire";

export function useAuth() {
  const currentUser = useCurrentUser();

  function checkUserAuth(userId: string): boolean {
    return userId === currentUser.value?.uid;
  }

  function checkIfShared(sharedWith: string[]) {
    if (sharedWith.length > 0) {
      return sharedWith.includes(String(currentUser.value?.uid));
    }
    return false;
  }

  return {
    checkUserAuth,
    checkIfShared,
  };
}
