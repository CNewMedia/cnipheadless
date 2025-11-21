"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function HomePage() {
  useEffect(() => {
    // === Page loader ===
    const pl = document.querySelector(".page-loader") as HTMLElement | null;
    if (pl) {
      const hideLoader = () => {
        pl.classList.add("hidden");
        setTimeout(() => {
          pl.classList.add("force-hide");
          pl.style.display = "none";
        }, 600);
      };

      window.addEventListener("load", () => {
        setTimeout(hideLoader, 200);
      });

      setTimeout(hideLoader, 1000);
    }

    // === Floating CTA visibility ===
    const floatingCta = document.getElementById("floatingCta");
    const hero = document.querySelector(".hero");
    if (floatingCta && hero && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              floatingCta.classList.add("visible");
            } else {
              floatingCta.classList.remove("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(hero);
    }

    // === Video play button ===
    document.querySelectorAll<HTMLButtonElement>(".play-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const video = btn.previousElementSibling as HTMLVideoElement | null;
        const card = btn.closest(".work-video") as HTMLElement | null;
        const overlay = card?.querySelector(".work-overlay") as HTMLElement | null;

        if (!video || video.tagName !== "VIDEO") return;

        if (video.paused) {
          video.play();
          if (card) {
            card.classList.add("playing");
            btn.style.display = "none";
            if (overlay) overlay.style.display = "none";
          }
        } else {
          video.pause();
          if (card) {
            card.classList.remove("playing");
            btn.style.display = "flex";
            if (overlay) overlay.style.display = "flex";
          }
        }
      });
    });


    // === Lenis smooth scroll + GSAP ScrollTrigger ===
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis initialiseren
    const lenis = new Lenis({
      lerp: 0.1,          // hoe "smooth" (0–1)
      wheelMultiplier: 1, // scroll-gevoel
      touchMultiplier: 1.2,
      smoothWheel: true,
      smoothTouch: true,
    });

    // 2. Lenis en GSAP aan elkaar koppelen
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Animaties op je kaarten
    gsap.utils
      .toArray<HTMLElement>(".service-card, .work-item, .client-card")
      .forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

    // 4. Cleanup bij unmount (veiligheid)
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };


    
  
  }, []);

  return (
    <>
      {/* Loader */}
      <div className="page-loader">
        <div className="loader-text">CNIP</div>
      </div>

      {/* Header */}
      <header>
        <div className="header-content">
          <div className="logo-text">
            CNIP <span className="badge">Since 2002</span>
          </div>
          <nav>
            <a href="#work">Work</a>
            <a href="#story">Story</a>
            <a href="#clients">Klanten</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Floating CTA */}
      <a href="#contact" className="floating-cta" id="floatingCta">
        Gratis strategiesessie →
      </a>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-eyebrow">Boutique Marketing Bureau Gent</div>
            <h1 className="hero-title">
              Marketing die
              <br />
              vooruit denkt
            </h1>
            <p className="hero-subtitle">Creatief. Data. Resultaat.</p>
            <div className="hero-cta">
              <a className="cta-primary" href="#contact">
                Start Gesprek
              </a>
              <a className="cta-secondary" href="#work">
                Bekijk Ons Werk
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section" id="services">
          <div className="section-header">
            <div className="section-eyebrow">Onze Expertise</div>
            <h2 className="section-title">
              Alles wat je
              <br />
              merk nodig heeft
            </h2>
          </div>
          <div className="services-bento">
            <article className="service-card large">
              <div className="service-number">01</div>
              <div>
                <h3 className="service-title">
                  Video
                  <br />
                  Productie
                </h3>
                <p className="service-desc">
                  Cinema-kwaliteit video&apos;s die converteren. 500+ producties.
                </p>
              </div>
            </article>
            <article className="service-card">
              <div className="service-number">02</div>
              <h3 className="service-title">SEO</h3>
              <p className="service-desc">
                51+ keywords top 3. Meetbare organische groei.
              </p>
            </article>
            <article className="service-card">
              <div className="service-number">03</div>
              <h3 className="service-title">
                Social
                <br />
                Media
              </h3>
              <p className="service-desc">
                0 → 50k volgers met authentieke content.
              </p>
            </article>
            <article className="service-card wide">
              <div className="service-number">04</div>
              <h3 className="service-title">Marketing Automation</h3>
              <p className="service-desc">
                HubSpot workflows + AI. Systemen voor €5-50M bedrijven.
              </p>
            </article>
            <article className="service-card">
              <div className="service-number">05</div>
              <h3 className="service-title">Websites</h3>
              <p className="service-desc">
                SEO-ready. Conversie-focused. Websites die presteren.
              </p>
            </article>
            <article className="service-card">
              <div className="service-number">06</div>
              <h3 className="service-title">
                Google
                <br />
                Ads
              </h3>
              <p className="service-desc">
                ROI-focused. Meetbare resultaten voor premium merken.
              </p>
            </article>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="work-section">
          <div className="section-header">
            <div className="section-eyebrow">Ons Werk</div>
            <h2 className="section-title">
              Bewezen
              <br />
              Resultaten
            </h2>
          </div>

          <div className="work-grid">
            <article className="work-item">
              <div className="work-visual">
                <img
                  src="/images/Hof van Cleve.jpg"
                  alt="Hof van Cleve Social Media Case Study - 50.000+ volgers voor 3-sterren Michelin restaurant"
                  loading="lazy"
                />
              </div>
              <div className="work-overlay">
                <span className="work-tag">Social Media</span>
                <h3 className="work-title">Hof van Cleve</h3>
                <p className="work-desc">
                  Van 0 naar 50k volgers. 2.5M views/maand voor 3-sterrenrestaurant.
                </p>
                <div className="work-stats">
                  <div className="work-stat">
                    <div className="work-stat-num">50K+</div>
                    <div className="work-stat-label">Volgers</div>
                  </div>
                  <div className="work-stat">
                    <div className="work-stat-num">2.5M+</div>
                    <div className="work-stat-label">Views/maand</div>
                  </div>
                </div>
              </div>
            </article>

            <article className="work-item">
              <div className="work-visual">
                <img
                  src="/images/willems_2.jpg"
                  alt="Willems Veranda SEO Case Study - 3x Merk van het Jaar met 77 keywords top 10"
                  loading="lazy"
                />
              </div>
              <div className="work-overlay">
                <span className="work-tag">SEO &amp; Rebranding</span>
                <h3 className="work-title">Willems Veranda</h3>
                <p className="work-desc">
                  3× Merk van het Jaar. SEO dominantie met 77 keywords top 10.
                </p>
                <div className="work-stats">
                  <div className="work-stat">
                    <div className="work-stat-num">51</div>
                    <div className="work-stat-label">Keywords Top 3</div>
                  </div>
                  <div className="work-stat">
                    <div className="work-stat-num">77</div>
                    <div className="work-stat-label">Keywords Top 10</div>
                  </div>
                </div>
              </div>
            </article>

            <article className="work-item">
              <div className="work-visual">
                <img
                  src="/images/Logo design 6 (1).jpg"
                  alt="Tijdloze brand identity design voor premium merken - CNIP portfolio"
                  loading="lazy"
                />
              </div>
              <div className="work-overlay">
                <span className="work-tag">Brand Identity</span>
                <h3 className="work-title">Brand Design</h3>
                <p className="work-desc">
                  Tijdloze identiteiten die groeien met je merk.
                </p>
              </div>
            </article>

            <article className="work-item work-video">
              <div className="work-visual">
                <video
                  poster="/images/DSMKeukens commercial.jpg"
                  preload="none"
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://3375589.fs1.hubspotusercontent-na1.net/hubfs/3375589/DSMKeukens.mp4"
                    type="video/mp4"
                  />
                </video>
                <button className="play-btn" aria-label="Play video" />
              </div>
              <div className="work-overlay">
                <span className="work-tag">Video Production</span>
                <h3 className="work-title">DSM Keukens</h3>
                <p className="work-desc">
                  Jarenlange merkverhalen in filmkwaliteit. Premium video-content.
                </p>
                <div className="work-stats">
                  <div className="work-stat">
                    <div className="work-stat-num">5+</div>
                    <div className="work-stat-label">Jaar partnership</div>
                  </div>
                  <div className="work-stat">
                    <div className="work-stat-num">Cinema</div>
                    <div className="work-stat-label">Kwaliteit</div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* STORY / FOUNDER */}
        <section id="story" className="founder-section">
          <div className="founder-grid">
            <div>
              <div className="section-eyebrow">Waarom CNIP Bestaat</div>
              <h2
                className="section-title"
                style={{ marginBottom: 26 }}
              >
                Voor merken die
                <br />
                het menen
              </h2>
              <div className="founder-text">
                <p style={{ marginBottom: 0 }}>
                  Wij zijn er voor ambitieuze Belgische merken die serieus willen
                  groeien. Geen bandwerk, geen juniors, geen korte-termijn-trucjes.
                  Alleen een klein team seniors dat langetermijn-partnerships aangaat
                  en meetbare impact levert.
                </p>
              </div>
            </div>

            <aside className="founder-card">
              <div className="founder-media">
                <img
                  src="/images/christophecnip.png"
                  alt="Christophe Dejaeghere - Founder CNIP Marketing Bureau Gent sinds 2002"
                  loading="lazy"
                />
              </div>
              <div className="founder-info">
                <div className="founder-label">Christophe Dejaeghere</div>
                <div className="founder-name">Founder</div>
                <div className="founder-role">Sinds 2002</div>
              </div>
            </aside>
          </div>
        </section>

        {/* ORYEN */}
        <section className="oryen-section">
          <div className="oryen-grid">
            <div className="oryen-logo-container">
              <img
                src="/images/Oryen_logo_v5112025.png"
                alt="Oryen - Digitale Transformatie en Sales Optimalisatie voor €1M+ bedrijven"
                className="oryen-logo"
              />
            </div>

            <div className="oryen-content">
              <div className="section-eyebrow">Ons Zustermerk</div>
              <h2
                className="section-title"
                style={{ marginBottom: 26 }}
              >
                Systemen die
                <br />
                renderen
              </h2>
              <div className="oryen-text">
                <p style={{ marginBottom: 0 }}>
                  Oryen: ons zusterbedrijf voor sales- en marketing-systemen die
                  écht renderen. Voor bedrijven vanaf €1M klaar voor schaalbare
                  groei.
                </p>
              </div>
              <a
                href="https://oryen.be"
                target="_blank"
                rel="noopener"
                className="oryen-btn"
              >
                Ontdek Oryen →
              </a>
            </div>
          </div>
        </section>

        {/* CLIENTS */}
        <section id="clients" className="clients-section">
          <div className="section-header">
            <div className="section-eyebrow">Vertrouwd Door</div>
            <h2 className="section-title">Premium Merken</h2>
          </div>
          <div className="clients-grid">
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/2-Nov-04-2021-12-50-59-44-PM.png"
                alt="Hof van Cleve - 3 Michelin sterren - Social Media klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/7-2.png"
                alt="GE Healthcare - Medical Technology - Video productie klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/13.png"
                alt="DSM Keukens - Premium Keukens - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/3-4.png"
                alt="Willems Veranda - 3x Merk van het Jaar - SEO klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/15.png"
                alt="BMW - Premium Automotive - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/1-4.png"
                alt="Decospan - Houtfineer Specialist - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/8-2.png"
                alt="Citrosuco - Wereldleider Sinaasappelsap - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/11-1.png"
                alt="Haelvoet - Ziekenhuismeubilair - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/4-2.png"
                alt="Skylux - Premium Dakramen - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/19.png"
                alt="Keolis - Openbaar Vervoer - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/20.png"
                alt="Nuscience - Animal Nutrition - Marketing klant CNIP"
              />
            </div>
            <div className="client-card">
              <img
                loading="lazy"
                src="images/klanten/17.png"
                alt="Medina - Voedingindustrie - Marketing klant CNIP"
              />
            </div>
          </div>
        </section>

        {/* CERTIFICATEN */}
        <section className="certs-section">
          <div className="section-header">
            <div className="section-eyebrow">Validatie</div>
            <h2 className="section-title">
              Certified
              <br />
              Expertise
            </h2>
          </div>
          <div className="cert-grid">
            <div className="cert-badge">
              <img
                loading="lazy"
                src="images/certificaten/gold-badge-color-1.png"
                alt="HubSpot Gold Partner Certificering - CNIP Marketing Bureau"
              />
              <span>HubSpot Gold</span>
            </div>
            <div className="cert-badge">
              <img
                loading="lazy"
                src="https://oryen.be/hubfs/logo-university-of-cambridge-judge-business-school.png"
                alt="Cambridge Judge Business School Certificaat - CNIP"
              />
              <span>Cambridge</span>
            </div>
            <div className="cert-badge">
              <img
                loading="lazy"
                src="images/certificaten/Google-Adwords-Certification.png"
                alt="Google Ads Gecertificeerd - CNIP Marketing Bureau"
              />
              <span>Google Ads</span>
            </div>
            <div className="cert-badge">
              <img
                loading="lazy"
                src="images/certificaten/GA-certified.png"
                alt="Google Analytics Gecertificeerd - CNIP"
              />
              <span>Analytics</span>
            </div>
            <div className="cert-badge">
              <img
                loading="lazy"
                src="images/certificaten/YouTube-Certified-Badge-Light-cropped-1-1.png"
                alt="YouTube Gecertificeerd - CNIP"
              />
              <span>YouTube</span>
            </div>
            <div className="cert-badge">
              <img
                loading="lazy"
                src="images/certificaten/Semrush Agency Partner Badge.png"
                alt="Semrush Agency Partner - CNIP Marketing Bureau"
              />
              <span>Semrush</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="contact-grid">
            <div>
              <div className="section-eyebrow">Laten We Praten</div>
              <h2
                className="section-title"
                style={{ marginBottom: 28 }}
              >
                Klaar voor
                <br />
                meetbare impact?
              </h2>
              <p
                style={{
                  fontSize: "clamp(18px,4vw,22px)",
                  opacity: 0.95,
                  lineHeight: 1.6,
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Boek je gratis strategiesessie (30 min)
              </p>
              <p
                style={{
                  fontSize: "clamp(14px,3vw,16px)",
                  opacity: 0.8,
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                Geen verkooppraatje — enkel concrete quick wins voor jouw merk.
              </p>
            </div>

            <form
              className="contact-form"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <input
                type="hidden"
                name="access_key"
                value="3d439c1d-f54e-4c3e-8a3b-ac3cb2ef1fbc"
              />
              <input
                type="hidden"
                name="redirect"
                value="https://cnip.be/bedankt.html"
              />

              <div className="form-group">
                <label htmlFor="name">Naam *</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Bedrijf</label>
                <input id="company" name="company" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Bericht *</label>
                <textarea id="message" name="message" rows={4} required />
              </div>
              <button className="submit-btn" type="submit">
                Verstuur Bericht
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                marginBottom: 14,
              }}
            >
              CNIP
            </div>
            <address
              style={{
                opacity: 0.8,
                lineHeight: 1.8,
                fontSize: 14,
                fontStyle: "normal",
              }}
            >
              Ottergemsesteenweg Zuid 808
              <br />
              9000 Gent, België
              <br />
              <br />
              <a
                href="tel:+3293965883"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                +32 9 396 58 83
              </a>
              <br />
              <a
                href="/cdn-cgi/l/email-protection#3851565e57785b565148165a5d"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <span
                  className="__cf_email__"
                  data-cfemail="dbb2b5bdb49bb8b5b2abf5b9be"
                >
                  [email&nbsp;protected]
                </span>
              </a>
            </address>
          </div>

          <div>
            <div className="footer-heading">Diensten</div>
            <a href="#services">Video Productie</a>
            <a href="#services">SEO</a>
            <a href="#services">Social Media</a>
            <a href="#services">Marketing Automation</a>
          </div>

          <div>
            <div className="footer-heading">Bedrijf</div>
            <a href="#story">Story</a>
            <a href="#work">Work</a>
            <a href="#clients">Klanten</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <div className="footer-heading">Connect</div>
            <a href="/cdn-cgi/l/email-protection#86efe8e0e9c6e5e8eff6a8e4e3">
              Email
            </a>
            <a
              href="https://linkedin.com/company/cnipagency"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/cnip.be"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 CNIP | Boutique Marketing Bureau Gent
        </div>
      </footer>
    </>
  );
} 
