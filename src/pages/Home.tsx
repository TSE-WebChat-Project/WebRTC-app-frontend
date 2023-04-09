import { AuthenticationProvider } from "../components/Authentication";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <div>
        <AuthenticationProvider
          allowLoginOverlay={true}
          allowExitLoginOverlay={true}
        >
          <Navbar />
        </AuthenticationProvider>
        {/* {content} */}
      </div>
      <section className="hero is-large is-black">
        <div className="hero-body has-text-centered">
          <p className="title">Study together</p>
          <p className="subtitle">A University of Lincoln project</p>
          <a className="button is-primary is-large" href="/app">
            Get started
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
