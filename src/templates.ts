/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WebsiteConfig, WebsiteTheme } from './types';

export function getIndexHtml(config: WebsiteConfig, theme: WebsiteTheme): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.companyName} | Modern Home</title>
  <!-- Google Fonts for Modern Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Link to Custom Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Navigation Bar -->
  <header class="navbar">
    <div class="nav-container">
      <a href="index.html" class="logo-link">
        <!-- Modern SVG Vector Logo -->
        <svg class="logo-svg" viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="url(#logo-grad)"/>
          <path d="M12 28V12L20 20L28 12V28" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="${theme.primaryHex}"/>
              <stop offset="1" stop-color="${theme.accentHex}"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="logo-text">${config.companyName}</span>
      </a>

      <!-- Hamburger Menu Button for Mobile -->
      <button class="mobile-toggle" id="menu-toggle" aria-label="Toggle navigation Menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>

      <!-- Menu links -->
      <nav class="nav-menu" id="nav-menu">
        <a href="index.html" class="nav-link active">Home</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="contact.html" class="nav-link">Contact</a>
        <a href="contact.html" class="cta-nav-btn">Get Started</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-background-glow"></div>
    <div class="container hero-container">
      <div class="hero-content">
        <span class="hero-badge">Welcome to the Future of AI</span>
        <h1 class="hero-title">${config.heroTitle}</h1>
        <p class="hero-subtitle">${config.heroSub}</p>
        <div class="hero-actions">
          <a href="contact.html" class="btn btn-primary" id="hero-cta-btn">${config.heroBtnText}</a>
          <a href="about.html" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Feature Cards Section -->
  <section class="features-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Key Capabilities</span>
        <h2>Why Choose Our AI Solutions?</h2>
        <p>Harness the power of next-generation artificial intelligence crafted with simplicity and performance in mind.</p>
      </div>

      <div class="features-grid">
        <!-- Feature Card 1 -->
        <div class="feature-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="card-icon">
              <path d="M12 2V22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <h3>${config.feature1Title}</h3>
          <p>${config.feature1Desc}</p>
        </div>

        <!-- Feature Card 2 -->
        <div class="feature-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="card-icon">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3>${config.feature2Title}</h3>
          <p>${config.feature2Desc}</p>
        </div>

        <!-- Feature Card 3 -->
        <div class="feature-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="card-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3>${config.feature3Title}</h3>
          <p>${config.feature3Desc}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Call to Action -->
  <section class="cta-banner">
    <div class="container cta-container">
      <div class="cta-inner">
        <h2>Ready to transform your workflow?</h2>
        <p>Join thousands of forward-thinking innovators who have scaled their operations using our premium web assets.</p>
        <a href="contact.html" class="btn btn-primary bg-white text-dark">Get Connected Now</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="main-footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <a href="index.html" class="logo-link">
          <span class="logo-text">${config.companyName}</span>
        </a>
        <p>A cutting-edge, ultra-fast static website built using modern design standards, optimized for Hostinger Shared Hosting.</p>
      </div>
      <div class="footer-links-group">
        <div class="footer-col">
          <h4>Navigation</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Hosting Partner</h4>
          <a href="https://www.hostinger.com" target="_blank" rel="noopener">Hostinger Shared</a>
          <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener">hPanel Portal</a>
          <a href="https://support.hostinger.com" target="_blank" rel="noopener">Support</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; <span id="current-year">2026</span> ${config.companyName}. All Rights Reserved.</p>
        <p class="hosting-tag">Optimized for <span class="highlight">Hostinger public_html</span></p>
      </div>
    </div>
  </footer>

  <!-- Script for interactivity (mobile toggle, copyright year, CTA animation) -->
  <script src="js/script.js"></script>
</body>
</html>`;
}

export function getAboutHtml(config: WebsiteConfig, theme: WebsiteTheme): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us | ${config.companyName}</title>
  <!-- Google Fonts for Modern Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Link to Custom Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Navigation Bar -->
  <header class="navbar">
    <div class="nav-container">
      <a href="index.html" class="logo-link">
        <svg class="logo-svg" viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="url(#logo-grad)"/>
          <path d="M12 28V12L20 20L28 12V28" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="${theme.primaryHex}"/>
              <stop offset="1" stop-color="${theme.accentHex}"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="logo-text">${config.companyName}</span>
      </a>

      <!-- Hamburger Menu Button for Mobile -->
      <button class="mobile-toggle" id="menu-toggle" aria-label="Toggle navigation Menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>

      <!-- Menu links -->
      <nav class="nav-menu" id="nav-menu">
        <a href="index.html" class="nav-link">Home</a>
        <a href="about.html" class="nav-link active">About</a>
        <a href="contact.html" class="nav-link">Contact</a>
        <a href="contact.html" class="cta-nav-btn">Get Started</a>
      </nav>
    </div>
  </header>

  <!-- Header Banner -->
  <section class="page-header">
    <div class="container">
      <span class="badge">Who We Are</span>
      <h1>Our Story & Mission</h1>
      <p>Discover the passion, values, and technological superiority driving ${config.companyName} forward.</p>
    </div>
  </section>

  <!-- Core Content Section (Grid & Flexbox) -->
  <section class="about-content-section">
    <div class="container">
      <!-- Introduction Grid -->
      <div class="about-intro-grid">
        <div class="about-text-panel">
          <h2>Company Introduction</h2>
          <p class="lead">We are pioneers committed to crafting accessible, reliable, and exceptionally fast AI products. Our solutions bridge the gap between complex system design and intuitive user interaction.</p>
          <p>By leveraging cloud infrastructure, static hosting simplicity, and deep learning paradigms, we empower individuals and corporations to accelerate their engineering cycles and enjoy stunning visual experiences.</p>
        </div>
        <div class="about-stats-panel">
          <div class="stat-box">
            <span class="stat-number">99.9%</span>
            <span class="stat-label">Uptime Sla</span>
          </div>
          <div class="stat-box">
            <span class="stat-number">10x</span>
            <span class="stat-label">Faster Loading</span>
          </div>
          <div class="stat-box">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Support Access</span>
          </div>
        </div>
      </div>

      <!-- Mission & Vision Split -->
      <div class="mission-vision-grid">
        <div class="mv-card mission-card">
          <div class="mv-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
          <h3>Our Mission</h3>
          <p>${config.mission}</p>
        </div>

        <div class="mv-card vision-card">
          <div class="mv-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h3>Our Vision</h3>
          <p>${config.vision}</p>
        </div>
      </div>

      <!-- Advantages Section -->
      <div class="advantages-block">
        <div class="section-header">
          <span class="section-tag">Key Advantages</span>
          <h2>The ${config.companyName} Advantage</h2>
          <p>Why we stand ahead of standard static hosting offerings on Hostinger.</p>
        </div>

        <div class="advantages-grid">
          <div class="advantage-item">
            <div class="advantage-num">01</div>
            <h4>${config.advantages[0] || 'Fully Optimized Assets'}</h4>
            <p>Every single line of HTML, CSS, and JS is fully hand-written and minified where appropriate to load in less than 200ms on Hostinger servers.</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-num">02</div>
            <h4>${config.advantages[1] || 'Zero Deployment Friction'}</h4>
            <p>No build processes, npm packages, or server side bundles required. Upload directly via Hostinger's hPanel File Manager in seconds.</p>
          </div>
          <div class="advantage-item">
            <div class="advantage-num">03</div>
            <h4>${config.advantages[2] || 'Responsive & Clean Styling'}</h4>
            <p>A flawless aesthetic tailored to all platforms—spanning mobile touch displays up to full ultra-wide desktop monitors.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="main-footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <a href="index.html" class="logo-link">
          <span class="logo-text">${config.companyName}</span>
        </a>
        <p>A cutting-edge, ultra-fast static website built using modern design standards, optimized for Hostinger Shared Hosting.</p>
      </div>
      <div class="footer-links-group">
        <div class="footer-col">
          <h4>Navigation</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Hosting Partner</h4>
          <a href="https://www.hostinger.com" target="_blank" rel="noopener">Hostinger Shared</a>
          <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener">hPanel Portal</a>
          <a href="https://support.hostinger.com" target="_blank" rel="noopener">Support</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; <span id="current-year">2026</span> ${config.companyName}. All Rights Reserved.</p>
        <p class="hosting-tag">Optimized for <span class="highlight">Hostinger public_html</span></p>
      </div>
    </div>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>`;
}

export function getContactHtml(config: WebsiteConfig, theme: WebsiteTheme): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us | ${config.companyName}</title>
  <!-- Google Fonts for Modern Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Link to Custom Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Navigation Bar -->
  <header class="navbar">
    <div class="nav-container">
      <a href="index.html" class="logo-link">
        <svg class="logo-svg" viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="url(#logo-grad)"/>
          <path d="M12 28V12L20 20L28 12V28" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="${theme.primaryHex}"/>
              <stop offset="1" stop-color="${theme.accentHex}"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="logo-text">${config.companyName}</span>
      </a>

      <!-- Hamburger Menu Button for Mobile -->
      <button class="mobile-toggle" id="menu-toggle" aria-label="Toggle navigation Menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>

      <!-- Menu links -->
      <nav class="nav-menu" id="nav-menu">
        <a href="index.html" class="nav-link">Home</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="contact.html" class="nav-link active">Contact</a>
        <a href="contact.html" class="cta-nav-btn">Get Started</a>
      </nav>
    </div>
  </header>

  <!-- Header Banner -->
  <section class="page-header">
    <div class="container">
      <span class="badge">Get in Touch</span>
      <h1>Contact Our Team</h1>
      <p>Have an inquiry or project proposal? Drop us a line and let's craft something amazing together.</p>
    </div>
  </section>

  <!-- Contact Section with Form -->
  <section class="contact-section">
    <div class="container contact-container">
      <div class="contact-split-grid">
        <!-- Contact Information Info Card -->
        <div class="contact-info-card">
          <h2>Let's connect</h2>
          <p>We are always eager to discuss new ideas, web designs, or integration strategies with Hostinger Cloud services.</p>
          
          <div class="info-list">
            <div class="info-item">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="info-text">
                <strong>Email Address</strong>
                <span>hello@${config.companyName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="info-text">
                <strong>Location</strong>
                <span>Hostinger Shared Server US-East</span>
              </div>
            </div>
          </div>

          <div class="info-tip-box">
            <span class="tip-title">⚡ Hosting Compatibility Note</span>
            <p>This contact form contains premium clientside validation. For absolute email delivery on Hostinger, you can easily pair this with Hostinger Email or a PHP mailer block inside public_html.</p>
          </div>
        </div>

        <!-- Contact Form Box -->
        <div class="contact-form-box">
          <div id="form-success-banner" class="success-banner hidden">
            <div class="success-icon">✓</div>
            <div class="success-message">
              <h4>Message Sent Successfully!</h4>
              <p>Thank you for reaching out. Our AI agent team will contact you shortly.</p>
            </div>
          </div>

          <form id="contact-form" action="#" method="POST" class="styled-form">
            <div class="form-group">
              <label for="form-name">Full Name *</label>
              <input type="text" id="form-name" name="name" placeholder="John Doe" required>
            </div>

            <div class="form-group">
              <label for="form-email">Email Address *</label>
              <input type="email" id="form-email" name="email" placeholder="john@example.com" required>
            </div>

            <div class="form-group">
              <label for="form-message">Your Message *</label>
              <textarea id="form-message" name="message" rows="5" placeholder="Tell us how we can help..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="form-submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="main-footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <a href="index.html" class="logo-link">
          <span class="logo-text">${config.companyName}</span>
        </a>
        <p>A cutting-edge, ultra-fast static website built using modern design standards, optimized for Hostinger Shared Hosting.</p>
      </div>
      <div class="footer-links-group">
        <div class="footer-col">
          <h4>Navigation</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Hosting Partner</h4>
          <a href="https://www.hostinger.com" target="_blank" rel="noopener">Hostinger Shared</a>
          <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener">hPanel Portal</a>
          <a href="https://support.hostinger.com" target="_blank" rel="noopener">Support</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; <span id="current-year">2026</span> ${config.companyName}. All Rights Reserved.</p>
        <p class="hosting-tag">Optimized for <span class="highlight">Hostinger public_html</span></p>
      </div>
    </div>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>`;
}

export function getStyleCss(config: WebsiteConfig, theme: WebsiteTheme): string {
  return `/* 
  =========================================
  CUSTOM STYLESHEET FOR ${config.companyName.toUpperCase()}
  Optimized for Hostinger Shared Hosting
  =========================================
*/

/* CSS Reset & Variables */
:root {
  /* Dynamic Theme Hex Colors Injected via Customizer */
  --primary: ${theme.primaryHex};
  --primary-rgb: ${hexToRgb(theme.primaryHex)};
  --secondary: ${theme.secondaryHex};
  --accent: ${theme.accentHex};
  --accent-rgb: ${hexToRgb(theme.accentHex)};
  
  /* Constant Accent Shades */
  --dark: #0f172a;
  --light: #f8fafc;
  --white: #ffffff;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-400: #94a3b8;
  --gray-600: #475569;
  --gray-800: #1e293b;
  
  /* Shadow Levels */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s ease;

  /* Font Families */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Outfit', system-ui, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background-color: var(--white);
  color: var(--gray-800);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
  transition: var(--transition-fast);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* =========================================
   NAVIGATION BAR
   ========================================= */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--gray-100);
  transition: var(--transition-normal);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: var(--dark);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-weight: 500;
  font-size: 15px;
  color: var(--gray-600);
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.cta-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: var(--primary);
  color: var(--white) !important;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  transition: var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.cta-nav-btn:hover {
  background-color: var(--secondary);
  transform: translateY(-1px);
}

/* Hamburger toggle for Mobile */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1010;
}

.hamburger-bar {
  width: 100%;
  height: 2.5px;
  background-color: var(--dark);
  border-radius: 4px;
  transition: var(--transition-normal);
}

/* =========================================
   HERO SECTION
   ========================================= */
.hero-section {
  position: relative;
  padding: 120px 0 100px;
  background: radial-gradient(circle at 80% 20%, rgba(var(--primary-rgb), 0.08) 0%, transparent 60%);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-background-glow {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.1) 0%, transparent 70%);
  filter: blur(60px);
  z-index: -1;
}

.hero-content {
  max-width: 680px;
}

.hero-badge {
  display: inline-block;
  padding: 6px 14px;
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 30px;
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  color: var(--dark);
  letter-spacing: -1.5px;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--gray-600);
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition-normal);
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 14px rgba(var(--primary-rgb), 0.3);
}

.btn-primary:hover {
  background-color: var(--secondary);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
}

.btn-secondary {
  background-color: var(--gray-100);
  color: var(--gray-800);
}

.btn-secondary:hover {
  background-color: var(--gray-200);
  transform: translateY(-2px);
}

.btn-block {
  width: 100%;
}

/* =========================================
   FEATURES / GRID SECTION
   ========================================= */
.features-section {
  padding: 100px 0;
  background-color: var(--light);
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 64px;
}

.section-tag {
  color: var(--primary);
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  display: block;
  margin-bottom: 12px;
}

.section-header h2 {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 700;
  color: var(--dark);
  letter-spacing: -0.5px;
  margin-bottom: 16px;
}

.section-header p {
  color: var(--gray-600);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.feature-card {
  background-color: var(--white);
  border-radius: 16px;
  padding: 40px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-100);
  transition: var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

.card-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: rgba(var(--primary-rgb), 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-bottom: 24px;
}

.card-icon {
  width: 28px;
  height: 28px;
}

.feature-card h3 {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 16px;
}

.feature-card p {
  color: var(--gray-600);
  font-size: 15px;
  line-height: 1.6;
}

/* =========================================
   CALL TO ACTION BANNER
   ========================================= */
.cta-banner {
  padding: 80px 0;
  background-color: var(--white);
}

.cta-inner {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  border-radius: 24px;
  padding: 64px;
  text-align: center;
  color: var(--white);
  box-shadow: var(--shadow-xl);
  position: relative;
  overflow: hidden;
}

.cta-inner::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
  border-radius: 50%;
}

.cta-inner h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
}

.cta-inner p {
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 32px;
}

.bg-white {
  background-color: var(--white);
}

.text-dark {
  color: var(--dark);
}

.text-dark:hover {
  background-color: var(--gray-100);
  color: var(--primary);
}

/* =========================================
   PAGE HEADER / SUBPAGES BANNER
   ========================================= */
.page-header {
  padding: 80px 0;
  background: linear-gradient(to bottom, rgba(var(--primary-rgb), 0.04), transparent);
  text-align: center;
}

.page-header .badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 20px;
  margin-bottom: 16px;
}

.page-header h1 {
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 16px;
}

.page-header p {
  color: var(--gray-600);
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
}

/* =========================================
   ABOUT US PAGE LAYOUT
   ========================================= */
.about-content-section {
  padding: 80px 0;
}

.about-intro-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 64px;
  margin-bottom: 80px;
  align-items: center;
}

.about-text-panel h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 20px;
}

.about-text-panel p {
  margin-bottom: 16px;
  color: var(--gray-600);
}

.about-text-panel .lead {
  font-size: 18px;
  font-weight: 500;
  color: var(--gray-800);
}

.about-stats-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-box {
  background-color: var(--light);
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: var(--transition-fast);
}

.stat-box:hover {
  transform: scale(1.02);
  border-color: var(--primary);
}

.stat-number {
  display: block;
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--gray-400);
  letter-spacing: 0.5px;
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 100px;
}

.mv-card {
  padding: 48px;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-100);
}

.mission-card {
  background-color: rgba(var(--primary-rgb), 0.02);
}

.vision-card {
  background-color: rgba(var(--accent-rgb), 0.02);
}

.mv-icon {
  color: var(--primary);
  margin-bottom: 24px;
}

.mv-card h3 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--dark);
}

.mv-card p {
  color: var(--gray-600);
}

.advantages-block {
  margin-top: 64px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.advantage-item {
  background: var(--white);
  padding: 32px;
  border-radius: 12px;
  border-left: 4px solid var(--primary);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
}

.advantage-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.advantage-num {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 12px;
}

.advantage-item h4 {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 12px;
}

.advantage-item p {
  font-size: 14px;
  color: var(--gray-600);
}

/* =========================================
   CONTACT PAGE & FORMS
   ========================================= */
.contact-section {
  padding: 60px 0 100px;
}

.contact-split-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
  align-items: flex-start;
}

.contact-info-card h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 20px;
}

.contact-info-card > p {
  color: var(--gray-600);
  margin-bottom: 40px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 48px;
}

.info-item {
  display: flex;
  gap: 16px;
}

.info-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: rgba(var(--primary-rgb), 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.info-text strong {
  display: block;
  font-size: 14px;
  color: var(--gray-400);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.info-text span {
  font-size: 16px;
  color: var(--gray-800);
  font-weight: 500;
}

.info-tip-box {
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 12px;
  padding: 24px;
}

.tip-title {
  display: block;
  font-weight: 700;
  color: #b45309;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-tip-box p {
  font-size: 13px;
  color: #78350f;
}

/* Contact Form Box Styling */
.contact-form-box {
  background-color: var(--white);
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-lg);
  border-radius: 20px;
  padding: 48px;
}

.styled-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-800);
}

.form-group input, .form-group textarea {
  font-family: var(--font-sans);
  font-size: 15px;
  padding: 12px 16px;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  color: var(--gray-800);
  background-color: var(--light);
  transition: var(--transition-fast);
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  background-color: var(--white);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
}

/* Form Success Banner */
.success-banner {
  display: flex;
  gap: 16px;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  align-items: center;
}

.success-banner.hidden {
  display: none !important;
}

.success-icon {
  width: 40px;
  height: 40px;
  background-color: #10b981;
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  flex-shrink: 0;
}

.success-message h4 {
  color: #065f46;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.success-message p {
  color: #047857;
  font-size: 14px;
}

/* =========================================
   FOOTER
   ========================================= */
.main-footer {
  background-color: var(--dark);
  color: var(--gray-400);
  padding: 80px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 64px;
  margin-bottom: 64px;
}

.footer-brand .logo-text {
  color: var(--white);
}

.footer-brand p {
  font-size: 14px;
  margin-top: 16px;
  max-width: 380px;
  line-height: 1.6;
}

.footer-links-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.footer-col h4 {
  color: var(--white);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-col a {
  display: block;
  font-size: 14px;
  margin-bottom: 12px;
}

.footer-col a:hover {
  color: var(--primary);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 32px 0;
}

.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.hosting-tag {
  font-weight: 500;
}

.hosting-tag .highlight {
  color: var(--primary);
  font-weight: 700;
}

/* =========================================
   RESPONSIVE MEDIA QUERIES (COLLAPSE/FLEX)
   ========================================= */

@media (max-width: 1024px) {
  .hero-title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  /* Navigation mobile behavior */
  .mobile-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--white);
    border-bottom: 1px solid var(--gray-100);
    flex-direction: column;
    padding: 32px 24px;
    gap: 20px;
    box-shadow: var(--shadow-lg);
    display: none; /* Controlled via script.js */
  }

  .nav-menu.active {
    display: flex;
  }

  /* Hamburger Toggle Animation classes */
  .mobile-toggle.active .hamburger-bar:nth-child(1) {
    transform: translateY(7.5px) rotate(45deg);
  }
  .mobile-toggle.active .hamburger-bar:nth-child(2) {
    opacity: 0;
  }
  .mobile-toggle.active .hamburger-bar:nth-child(3) {
    transform: translateY(-7.5px) rotate(-45deg);
  }

  /* Section headers */
  .section-header h2 {
    font-size: 30px;
  }
  
  /* Grids to single column */
  .features-grid, .advantages-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .about-intro-grid, .mission-vision-grid, .contact-split-grid, .footer-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .footer-links-group {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-section {
    padding: 80px 0 60px;
  }

  .hero-title {
    font-size: 36px;
  }

  .cta-inner {
    padding: 40px 24px;
  }

  .cta-inner h2 {
    font-size: 28px;
  }
  
  .contact-form-box {
    padding: 32px 20px;
  }
  
  .footer-bottom-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}

/* Helper function styles */
`;
}

export function getScriptJs(): string {
  return `/* 
  =========================================
  DYNAMIC JAVASCRIPT FOR HOSTINGER STATIC SITE
  =========================================
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== menuToggle) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // 2. Automatically Update Copyright Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Simple Interactive Button Hover Animation / Click Feedback
  const heroCta = document.getElementById('hero-cta-btn');
  if (heroCta) {
    heroCta.addEventListener('mousedown', function() {
      heroCta.style.transform = 'scale(0.95) translateY(-2px)';
    });
    
    heroCta.addEventListener('mouseup', function() {
      heroCta.style.transform = 'scale(1) translateY(-2px)';
    });
  }

  // 4. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Since it's a static site, prevent standard redirect for demo
      e.preventDefault();

      // Show success animation banner
      if (successBanner) {
        successBanner.classList.remove('hidden');
        successBanner.style.opacity = '0';
        successBanner.style.transform = 'translateY(-10px)';
        successBanner.style.transition = 'all 0.4s ease';
        
        // Force layout repaint
        void successBanner.offsetWidth;
        
        successBanner.style.opacity = '1';
        successBanner.style.transform = 'translateY(0)';
      }

      // Smooth scroll back to top of the card or form
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Reset form fields
      contactForm.reset();
    });
  }
});
`;
}

export function getReadmeMd(config: WebsiteConfig): string {
  return `# ${config.companyName}

Welcome to **${config.companyName}**! This is a modern, responsive, static website designed specifically for direct upload to **Hostinger Shared Hosting** without installing any packages, build tools, or complex configurations.

---

## 1. Folder Structure

The project directory is structured as follows:

\`\`\`
Trial-Website/
├── index.html          # Main Home page
├── about.html          # Company Profile, Mission, Vision & Advantages
├── contact.html        # Interactive Contact Form & Details
├── css/
│   └── style.css       # Fully customized CSS (Grid, Flexbox, Variables)
├── js/
│   └── script.js       # Dynamic interactions (nav bar, date, button bounce)
├── images/
│   └── logo.png        # Logo image asset
└── README.md           # This setup manual
\`\`\`

---

## 2. How to Open Locally

Since this is a vanilla static website, you do not need to run a local dev server or use npm:

1. Locate the project folder on your computer.
2. Double-click on \`index.html\`.
3. It will open immediately in your web browser (Chrome, Safari, Firefox, Edge).
4. Click through the navigation links (**Home**, **About**, **Contact**) to see the seamless routing and animations in action!

---

## 3. How to Upload to GitHub

To save your website into a GitHub repository:

1. Sign in to your [GitHub account](https://github.com).
2. Click **New** to create a new repository. Name it something descriptive (e.g., \`my-first-ai-website\`).
3. Keep it **Public** (recommended so you can connect other services) and click **Create repository**.
4. Open your terminal or Git bash inside the project folder and run:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit - Hostinger static website ready"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   \`\`\`

---

## 4. How to Upload to Hostinger Shared Hosting

Hostinger is one of the fastest and most budget-friendly platforms for hosting static websites. Follow these simple steps:

### Step 1: Export files
* Click **Download Zip** inside the Exporter Tool to get all files packed in a single archive.
* Unzip the archive on your local computer to verify all files (\`index.html\`, \`css/\`, \`js/\`, etc.) are present.

### Step 2: Log into hPanel
1. Navigate to [Hostinger hPanel](https://hpanel.hostinger.com) and log in.
2. Click on **Websites** in the top navigation or sidebar.
3. Locate your domain and click **Manage**.

### Step 3: Access File Manager
1. Scroll down or search for the **Files** section and click on **File Manager**.
2. Select **Access files of [your-domain]**. This opens a web-based file browser.

### Step 4: Upload Inside public_html
1. In the left panel or center grid, double-click on the folder named **\`public_html\`**.
   * *Note:* **CRITICAL RULE**: All website files **MUST** be placed directly inside the **\`public_html\`** folder.
2. If there is a default file named \`default.php\` or \`index.php\` created by Hostinger, **delete it** or rename it (so your new \`index.html\` takes precedence).
3. Click the **Upload** icon in the upper-right corner of hPanel File Manager (it looks like an arrow pointing up).
4. Select **Folder** to upload the \`css\`, \`js\`, and \`images\` folders, and **File** to upload \`index.html\`, \`about.html\`, and \`contact.html\`.
   * *Alternative (Easier)*: Upload the downloaded **ZIP** file directly, click on it inside File Manager, and choose **Extract**. Extract all files directly into \`public_html\`.

---

## 5. How to Test That Your Website is Working

Once your files are uploaded inside \`public_html\`:

1. Open a new incognito window in your browser.
2. Type in your domain name (e.g., \`https://yourdomain.com\`).
3. Check that the home page displays correctly:
   * Verify the visual colors and responsive grid are active.
   * Open the site on a mobile device or resize the window to check the mobile navigation menu.
   * Go to the **Contact** page, type a message, and submit the form to verify clientside validation.
4. Enjoy your lightning-fast, highly optimized website!

---

*Crafted proudly using AI technology, optimized for maximum loading performance on modern cloud clusters.*
`;
}

// Utility function to convert Hex to RGB values (used to inject RGB colors for Tailwind-like opacity variables in CSS)
function hexToRgb(hex: string): string {
  // Remove leading hash
  const cleanHex = hex.replace('#', '');
  
  // Parse shorthand hex like FFF
  const finalHex = cleanHex.length === 3 
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;
    
  const r = parseInt(finalHex.substring(0, 2), 16) || 0;
  const g = parseInt(finalHex.substring(2, 4), 16) || 0;
  const b = parseInt(finalHex.substring(4, 6), 16) || 0;
  
  return `${r}, ${g}, ${b}`;
}

export function getPackageJson(config: WebsiteConfig): string {
  const pkgName = config.companyName.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'my-ai-website';
  return `{
  "name": "${pkgName}",
  "version": "1.0.0",
  "description": "Static website built for direct deployment to Hostinger public_html",
  "private": true,
  "scripts": {
    "start": "echo 'Static website - direct HTML rendering inside public_html'"
  }
}
`;
}

export function generateLogoPngBase64(primaryHex: string, accentHex: string): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Draw rounded background
  const radius = 128;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(512 - radius, 0);
  ctx.quadraticCurveTo(512, 0, 512, radius);
  ctx.lineTo(512, 512 - radius);
  ctx.quadraticCurveTo(512, 512, 512 - radius, 512);
  ctx.lineTo(radius, 512);
  ctx.quadraticCurveTo(0, 512, 0, 512 - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  
  // Create gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, primaryHex);
  grad.addColorStop(1, accentHex);
  ctx.fillStyle = grad;
  ctx.fill();
  
  // Draw an elegant stylized geometric logo symbol (M shape for 'My website' / AI connect mesh)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 32;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.beginPath();
  ctx.moveTo(140, 360);
  ctx.lineTo(140, 160);
  ctx.lineTo(256, 280);
  ctx.lineTo(372, 160);
  ctx.lineTo(372, 360);
  ctx.stroke();
  
  // Glowing core nodes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(256, 280, 24, 0, Math.PI * 2);
  ctx.fill();
  
  const dataUrl = canvas.toDataURL('image/png');
  return dataUrl.split(',')[1];
}

