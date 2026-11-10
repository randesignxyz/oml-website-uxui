/* Motion stays optional: content and navigation work if either library fails. */
(() => {
  let media, swapTween, initial = true;
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cleanup() { if (swapTween) {swapTween.kill(); swapTween = null;} if (media) { media.revert(); media = null; } }
  function swap(root) {
    if (!root || !window.gsap || reduced()) return;
    swapTween = gsap.fromTo(root.children, {opacity: .45, y: 12}, {opacity: 1, y: 0, duration: .35, ease: 'power2.out', overwrite: true, clearProps: 'opacity,transform'});
  }
  function mount() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    media = gsap.matchMedia();
    media.add({desktop: '(min-width: 901px)', mobile: '(max-width: 900px)', reduce: '(prefers-reduced-motion: reduce)'}, context => {
      if (context.conditions.reduce) return;
      const desktop = context.conditions.desktop;
      const distance = desktop ? 30 : 16;
      const app = document.querySelector('#app');
      const lead = app.querySelector('.hero, .page-hero');
      if (lead) {
        const intro = lead.querySelectorAll('.breadcrumb, .eyebrow, h1, p, .btn, .hero-bottom');
        gsap.from(intro, {y: distance, opacity: 0, duration: .75, stagger: .07, ease: 'power3.out', clearProps: 'opacity,transform'});
        if (lead.classList.contains('brand-hero')) {
          gsap.from('.showcase-art', {opacity:0, y:desktop?24:12, duration:1.15, ease:'power3.out', clearProps:'opacity,transform'});
        } else if (lead.classList.contains('hero')) {
          let visual = document.createElement('div');
          visual.className = 'hero-media'; visual.setAttribute('aria-hidden', 'true'); lead.prepend(visual);
          gsap.fromTo(visual, {scale: 1.065}, {scale: 1, duration: 1.6, ease: 'power2.out'});
        }
      }
      if (initial) {
        gsap.from('header .logo, header nav a', {opacity: 0, y: -8, duration: .5, stagger: .035, clearProps: 'opacity,transform'});
        initial = false;
      }
      const reveals = app.querySelectorAll('.chairman-opening, .chairman-profile, .chairman-letter, .section .two > *, .section.two > *, .section-head, .image-frame, .news-card, .business-card, .value, .timeline > div, .contact-grid > *, .cta > *, .section > h2, .section > p, .section > .eyebrow, .brand-tabs, #feature');
      reveals.forEach(el => {
        // A parent reveal owns its descendants, preventing stacked transforms.
        if (Array.from(reveals).some(parent => parent !== el && parent.contains(el))) return;
        gsap.from(el, {opacity: .12, y: distance, duration: .65, ease: 'power2.out', clearProps: 'opacity,transform', scrollTrigger: {trigger: el, start: 'top 94%', once: true}});
      });
      const chart = app.querySelector('.group-chart');
      if (chart) {
        const tree = gsap.timeline({scrollTrigger: {trigger: chart, start: 'top 85%', once: true}});
        tree.from(chart.querySelector('.group-parent'), {opacity: 0, y: 22, duration: .65, ease: 'power3.out', clearProps: 'opacity,transform'})
          .from(chart.querySelectorAll('.company-node'), {opacity: 0, y: 24, duration: .55, stagger: .12, ease: 'power3.out', clearProps: 'opacity,transform'}, '-=.15')
          .from(chart.querySelectorAll('.company-brands'), {opacity: 0, y: 14, duration: .5, stagger: .1, clearProps: 'opacity,transform'}, '-=.2');
      }
      const statCleanups = [];
      app.querySelectorAll('.stat strong').forEach(el => {
        const original = el.textContent; const target = Number(original.replace(/[^0-9]/g, ''));
        if (target === 2010) return;
        const proxy = {value: 0};
        gsap.to(proxy, {value: target, duration: desktop ? 1.1 : .75, ease: 'power2.out', snap: {value: 1}, scrollTrigger: {trigger: el, start: 'top 98%', once: true}, onUpdate: () => {el.textContent = (original.startsWith('0') ? String(proxy.value).padStart(2,'0') : proxy.value) + (original.includes('+') ? '+' : '');}});
        statCleanups.push(() => {el.textContent = original;});
      });
      const bar = document.querySelector('.reading-progress');
      if (bar) gsap.fromTo(bar, {scaleX: 0}, {scaleX: 1, ease: 'none', scrollTrigger: {trigger: document.documentElement, start: 0, end: 'max', scrub: .15}});
      return () => {statCleanups.forEach(fn => fn()); app.querySelectorAll('.hero-media').forEach(el => el.remove());};
    });
  }
  window.OMLMotion = {cleanup, mount, swap};
})();
