import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import React, { useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../../config.js";

// FIREBASE
const app = firebase.initializeApp(firebaseConfig);

var uiConfig = {
  //   signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInFlow: "popup",
  // // Terms of service url/callback.
  // tosUrl: '<your-tos-url>',
  // // Privacy policy url/callback.
  // privacyPolicyUrl: function() {
  //   window.location.assign('<your-privacy-policy-url>');
  // }
};
const ui = new firebaseui.auth.AuthUI(firebase.auth());

function startUi() {
  ui.start("#firebaseui-auth-container", uiConfig);
}
function resetUi() {
  ui.reset();
}
// END FIREBASE

export async function showAuthOverlay() {
  let overlay = document.getElementById("authOverlay");
  if (overlay) {
    overlay.style.display = "block";
  }
  startUi();
}

export function hideAuthOverlay() {
  let overlay = document.getElementById("authOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

export function signOut() {
  firebase.auth().signOut();
  resetUi();
}

interface IAuthenticationContext {
  loggedIn: boolean;
  username?: string;
  overlay_id: string;
}
export const AuthenticationContext =
  React.createContext<IAuthenticationContext | null>(null);

interface AuthenticationProviderProps {
  children?: React.ReactNode;
  allowLoginOverlay: boolean;
  allowExitLoginOverlay: boolean;
}
export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = (
  props
) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setUsername(user.displayName ?? "");
      hideAuthOverlay();
    } else {
      setLoggedIn(false);
    }
  });

  const loginOverlay = (
    <div id="authOverlay">
      <div id="authOverlayContent">
        <article className="message">
          <div className="message-header">
            <p>Sign in</p>
            {props.allowExitLoginOverlay && (
              <button className="delete" onClick={hideAuthOverlay}></button>
            )}
          </div>
          <div className="message-body">
            <div id="firebaseui-auth-container"></div>
          </div>
        </article>
      </div>
    </div>
  );

  return (
    <>
      <AuthenticationContext.Provider
        value={{
          loggedIn: loggedIn,
          username: username,
          overlay_id: "firebaseui-auth-container",
        }}
      >
        {props.children}
      </AuthenticationContext.Provider>
      {props.allowLoginOverlay && loginOverlay}
    </>
  );
};

export function EnforceAuthentication() {
  const context = useContext(AuthenticationContext);

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (!user) {
  //     showAuthOverlay();
  //   }
  // });

  useEffect(() => {
    if (!context) {
      return;
    }

    if (!context.loggedIn) {
      showAuthOverlay();
    }
  }, []);

  return null;
}
