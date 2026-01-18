import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../config/firebase";
import { googleSignInApi } from "../services/auth.service";

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const data = await googleSignInApi(idToken);

      localStorage.setItem("token", data.token);

      console.log("User:", data.user);
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};

export default GoogleSignIn;
