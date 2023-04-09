import React, { useContext } from "react";
import "bulma/bulma.sass";
import {
  AuthenticationContext,
  showAuthOverlay,
  signOut,
} from "./Authentication";

const Navbar: React.FC<{}> = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    return null;
  }

  let loginSection: JSX.Element;

  if (context.loggedIn) {
    loginSection = (
      <>
        <h3 className="mx-4">Hello, {context.username}</h3>
        <div
          className="button is-info is-small"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </div>
      </>
    );
  } else {
    loginSection = (
      <>
        <div
          className="button is-info is-small"
          onClick={() => {
            showAuthOverlay();
            console.log("done");
          }}
        >
          Sign in
        </div>
      </>
    );
  }

  return (
    <div className="navbar is-black" role={"navigation"}>
      <div className="navbar-brand">
        <div className="navbar-item">
          <h1 className="title">WebRTC App</h1>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">{loginSection}</div>
      </div>
    </div>
  );
};

export default Navbar;
