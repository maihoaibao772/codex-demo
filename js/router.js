/*
  router.js - simple hash router for three primary routes: home, faq, app.
*/

import { focusMain, emit } from './utils.js';

const routes = new Map([
  ['#/faq', 'faq'],
  ['#/app', 'app'],
  ['#/home', 'home'],
]);

function resolveRoute(hash) {
  if (routes.has(hash)) return routes.get(hash);
  if (hash === '#/start') return 'app';
  if (hash === '#/account') return 'app';
  if (hash === '#/store') return 'app';
  return 'home';
}

function setActiveRoute(routeName) {
  document.querySelectorAll('[data-route]').forEach((section) => {
    section.classList.toggle('is-active', section.dataset.route === routeName);
  });
  if (routeName === 'app') {
    document.querySelector('.hb-view--app')?.classList.add('is-active');
  }
  if (routeName === 'faq') {
    document.querySelector('.hb-view--landing')?.classList.add('is-active');
  }
  focusMain();
  emit('route:change', routeName);
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function initRouter() {
  function handleHashChange() {
    const hash = window.location.hash || '#/home';
    const routeName = resolveRoute(hash);
    setActiveRoute(routeName);
  }
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}
