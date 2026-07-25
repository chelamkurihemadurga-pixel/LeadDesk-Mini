import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Build Your Dream Website With Us</h1>

        <p>
          We create modern, responsive, and high-performance websites for
          businesses, startups, and individuals. Tell us about your project,
          and we'll get back to you within 24 hours.
        </p>

        <a href="#contact">
          <button className="hero-btn">
            Get Free Quote
          </button>
        </a>

      </div>

    </section>
  );
}

export default Hero;