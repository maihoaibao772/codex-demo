/*
  router.js - simple hash router for three primary routes: home, faq, app.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const { focusMain, emit } = HB;

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

  function navigate(hash) {
  window.location.hash = hash;
}

  function initRouter() {
  function handleHashChange() {
    const hash = window.location.hash || '#/home';
    const routeName = resolveRoute(hash);
    setActiveRoute(routeName);
  }
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

  HB.navigate = navigate;
  HB.initRouter = initRouter;
})(window);
