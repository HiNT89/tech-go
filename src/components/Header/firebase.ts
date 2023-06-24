import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "~/firebase/firebase";
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();
export const signInGoogle = async () => {
  const data: {
    account: string;
    typeAccount: string;
    avatar: string;
    name: string;
    address: string;
    phone: string;
    password: string;
  } = {
    account: "",
    typeAccount: "",
    name: "",
    avatar: "",
    address: "",
    phone: "",
    password: "",
  };
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      // The signed-in user info.
      // console.log(result.user)
      const user = result.user;
      data["account"] = user.email || "";
      data["avatar"] = user.photoURL || "";
      data["name"] = user.displayName || "";
      data["typeAccount"] = "email";

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  return data;
};
export const signOutGoogle = async () => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });

  return {
    account: "",
    typeAccount: "",
    name: "",
    avatar: "",
    address: "",
    phone: "",
  };
};
export const signInFacebook = async () => {
  await signInWithPopup(auth, providerFB)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
};
