import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "./firebase"

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider)

  return {
    uid: result.user.uid,
    email: result.user.email,
    name: result.user.displayName,
  }
}
