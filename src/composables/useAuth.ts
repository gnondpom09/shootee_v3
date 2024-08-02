import { ref } from "vue";
import { useCurrentUser } from "vuefire";

export function useAuth() {
  const currentUser = useCurrentUser();

  function checkUserAuth(userId: string): boolean {
    return userId === currentUser.value?.uid;
  }

  return {
    checkUserAuth,
  };
}
