import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Compass, Leaf, MapPin, Menu, Mountain, Send, Sun, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const address = '769 N Main St, Willard, UT 84340';

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2.75 28.1 7.5v7.2c0 7.1-4.78 12.02-12.1 14.55C8.68 26.72 3.9 21.8 3.9 14.7V7.5L16 2.75Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="m8.15 20.55 4.1-6.45 2.15 3.15 3.3-5.05 6.15 8.35" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 7.5v5.35" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function Header({ open, onToggle, onNavigate }: { open: boolean; onToggle: () => void; onNavigate: () => void }) {
  return (
    <header className="topbar">
      <a className="brand-lockup" href="#top" onClick={onNavigate} data-testid="link-brand">
        <Mark />
        <span>
          <span className="brand-name">Willard Peak</span>
          <span className="brand-place">Campground / Northern Utah</span>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#field-notes" data-testid="link-field-notes">Field notes</a>
        <a href="#stay" data-testid="link-plan-stay">Plan a stay</a>
        <a href="#visit" data-testid="link-find-us">Find us</a>
        <a className="nav-action" href="#stay" data-testid="link-check-in">Check in</a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={onToggle} data-testid="button-mobile-menu">
        {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
      </button>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="#field-notes" onClick={onNavigate} data-testid="mobile-link-field-notes">Field notes</a>
          <a href="#stay" onClick={onNavigate} data-testid="mobile-link-plan-stay">Plan a stay</a>
          <a href="#visit" onClick={onNavigate} data-testid="mobile-link-find-us">Find us</a>
          <a href="#stay" onClick={onNavigate} data-testid="mobile-link-check-in">Check in</a>
        </nav>
      )}
    </header>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const openMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="field-guide" id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true">
          <img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="" />
        </div>
        <Header open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} onNavigate={() => setMenuOpen(false)} />
        <div className="hero-content">
          <div className="hero-kicker eyebrow reveal">A field guide to staying awhile</div>
          <h1 className="hero-title serif reveal reveal-delay-1" id="hero-title" data-testid="text-hero-title">A slower<br />night out.</h1>
          <p className="hero-subtitle reveal reveal-delay-2">Willard Peak Campground sits at the edge of the day, where northern Utah opens up and the hours have room to lengthen.</p>
          <div className="hero-foot reveal reveal-delay-3">
            <div className="hero-meta" aria-label="Campground location">
              <div className="hero-meta-item">
                <strong>Located in</strong>
                <span>Willard, Utah</span>
              </div>
              <div className="hero-meta-item">
                <strong>Find us at</strong>
                <span>769 N Main St</span>
              </div>
            </div>
            <a className="scroll-cue" href="#introduction" data-testid="link-scroll-intro"><i /><span>Read the guide</span><ArrowDown size={13} /></a>
          </div>
        </div>
      </section>

      <section className="intro-section" id="introduction" data-reveal aria-labelledby="intro-heading">
        <div className="section-shell intro-grid">
          <div className="section-number eyebrow">
            01 / Orientation
            <span className="serif">Begin here.</span>
          </div>
          <div>
            <h2 className="intro-heading serif" id="intro-heading">Come for the <em>quiet</em> between destinations.</h2>
            <p className="intro-copy">Not every night outside needs to be an expedition. Willard Peak is a place to arrive, put the day down, and notice what is still happening after the road goes quiet.</p>
            <div className="intro-note">
              <Compass size={17} strokeWidth={1.3} />
              <p>Use this page as a starting point. For current availability and stay details, reach out before you set out.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="image-band" data-reveal aria-labelledby="landscape-heading">
        <div className="image-band-bg" aria-hidden="true">
          <img src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="" />
        </div>
        <div className="image-band-content">
          <p className="eyebrow" style={{ color: '#d6ad77' }}>02 / The setting</p>
          <h2 className="image-band-heading serif" id="landscape-heading">A little more<br /><em>horizon</em> in the day.</h2>
          <div className="band-bottom">
            <p className="caption"><strong>Observation / 01</strong>There is a particular relief in a place that does not ask you to hurry through it. Bring your own pace; let the landscape set the rest.</p>
            <span className="band-index">WP / 41.408° N / 112.067° W</span>
          </div>
        </div>
      </section>

      <section className="field-section" id="field-notes" data-reveal aria-labelledby="field-heading">
        <div className="section-shell">
          <div className="field-header">
            <div>
              <p className="eyebrow section-number">03 / Notes from the edge</p>
              <h2 className="serif" id="field-heading">Pack for the<br />in-between.</h2>
            </div>
            <p>What to expect from the feeling of this place, rather than a list of promises.</p>
          </div>
          <div className="field-notes">
            <article className="field-note" data-testid="card-field-note-arrival">
              <div className="note-index eyebrow"><span>Note 01</span><Leaf size={16} strokeWidth={1.2} /></div>
              <h3 className="note-title serif">Arrive<br />unhurried.</h3>
              <p className="note-body">Leave a little margin around your arrival. The best part of being outside often starts before anything is unpacked.</p>
            </article>
            <article className="field-note" data-testid="card-field-note-evening">
              <div className="note-index eyebrow"><span>Note 02</span><Sun size={16} strokeWidth={1.2} /></div>
              <h3 className="note-title serif">Keep the<br />evening open.</h3>
              <p className="note-body">A jacket for the turn in temperature. Something warm in a cup. A reason not to check the time.</p>
            </article>
            <article className="field-note" data-testid="card-field-note-confirm">
              <div className="note-index eyebrow"><span>Note 03</span><Mountain size={16} strokeWidth={1.2} /></div>
              <h3 className="note-title serif">Ask before<br />you go.</h3>
              <p className="note-body">Operational details can change. Confirm availability, arrival instructions, and what to bring directly with the campground.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="stay-section" id="stay" data-reveal aria-labelledby="stay-heading">
        <div className="section-shell stay-grid">
          <div>
            <p className="eyebrow" style={{ color: '#d6ad77' }}>04 / Make a plan</p>
            <h2 className="stay-title serif" id="stay-heading">Start with<br />a good<br />question.</h2>
            <p className="stay-intro">Tell us what kind of night you are imagining. This is a planning note, not a reservation.</p>
          </div>
          <form className="stay-form" onSubmit={handleSubmit} aria-label="Stay planning form">
            <label className="form-field">
              <span className="form-label">Your name</span>
              <input className="form-input" name="name" required placeholder="How should we call you?" data-testid="input-name" />
            </label>
            <label className="form-field">
              <span className="form-label">Email</span>
              <input className="form-input" type="email" name="email" required placeholder="you@example.com" data-testid="input-email" />
            </label>
            <label className="form-field">
              <span className="form-label">When are you thinking?</span>
              <input className="form-input" type="date" name="date" data-testid="input-date" />
            </label>
            <label className="form-field">
              <span className="form-label">What are you bringing?</span>
              <select className="form-input" name="party" defaultValue="" data-testid="select-party">
                <option value="" disabled>Select one</option>
                <option value="just-me">Just me</option>
                <option value="two-of-us">Two of us</option>
                <option value="small-group">A small group</option>
              </select>
            </label>
            <label className="form-field full">
              <span className="form-label">A note for the campground</span>
              <textarea className="form-input" name="message" rows={2} placeholder="What would make the night feel right?" data-testid="input-message" />
            </label>
            <p className="form-disclaimer">Availability, pricing, amenities, and opening dates are not listed here. Please confirm current details directly before traveling.</p>
            {submitted && (
              <div className="form-success" role="status" data-testid="status-planning-submitted">
                <Check size={17} strokeWidth={1.5} />
                <span>Your planning note is ready to send. We do not have a booking inbox connected yet, so please use the address below to confirm the details directly.</span>
              </div>
            )}
            <button className="submit-button" type="submit" data-testid="button-submit-planning-note">
              <span>{submitted ? 'Note saved on this page' : 'Prepare my planning note'}</span>
              {submitted ? <Check size={15} /> : <Send size={15} />}
            </button>
          </form>
        </div>
      </section>

      <section className="visit-section" id="visit" data-reveal aria-labelledby="visit-heading">
        <div className="section-shell visit-grid">
          <div>
            <p className="eyebrow section-number">05 / The coordinates</p>
            <h2 className="visit-title serif" id="visit-heading">Worth knowing<br />where to turn.</h2>
            <div className="address-card">
              <p data-testid="text-address">Willard Peak Campground<br />769 N Main St<br />Willard, UT 84340</p>
              <button className="map-button" type="button" onClick={openMap} data-testid="button-open-map"><MapPin size={14} strokeWidth={1.4} /> Open map</button>
            </div>
          </div>
          <aside className="visit-aside">
            <p className="eyebrow">A useful note</p>
            <h3 className="serif">The details belong to the day you arrive.</h3>
            <p>For the most accurate information about your stay, ask the campground directly. This guide is here to help you decide if a slower night sounds like your kind of night.</p>
          </aside>
        </div>
      </section>

      <footer className="footer">
        <div className="section-shell footer-inner">
          <div className="footer-mark"><Mark /> Willard Peak Campground</div>
          <p data-testid="text-footer-note">A field guide for a slower night outside / Willard, Utah</p>
          <a href="#top" className="eyebrow" data-testid="link-back-to-top">Back to top <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;