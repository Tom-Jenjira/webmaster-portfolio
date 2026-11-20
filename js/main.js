'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const themeButton = document.querySelector('.theme-toggle');
const root = document.documentElement;

function closeMenu() {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'เปิดเมนู');
}
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 681px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const storedTheme = (() => {
  try { return localStorage.getItem('portfolio-theme'); } catch { return null; }
})();
if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
themeButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = nextTheme;
  try { localStorage.setItem('portfolio-theme', nextTheme); } catch { /* private browsing */ }
});

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  projects.forEach(project => {
    project.hidden = selected !== 'all' && project.dataset.category !== selected;
  });
}));
document.querySelector('#year').textContent = String(new Date().getFullYear());
