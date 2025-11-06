/*
  router.js - simple hash router for home, faq, and app routes with helpers so
  event delegation can call routeTo() directly.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const { focusMain, emit, storageKeys } = HB;

  const routeHashes = {
    home: '#/home',
    faq: '#/faq',
    app: '#/app',
  };

  function resolveRoute(hash) {
    if (hash === '#/faq') return 'faq';
    if (hash === '#/app' || hash === '#/start' || hash === '#/account' || hash === '#/store') return 'app';
    return 'home';
  }

  function syncNav(routeName) {
    const activeTab = localStorage.getItem(storageKeys.lastTab) || 'learn';
    document.querySelectorAll('button[data-route], a[data-route]').forEach((btn) => {
      let active = btn.dataset.route === routeName;
      if (routeName === 'app') {
        if (activeTab === 'account') {
          active = btn.dataset.route === 'account';
        } else {
          active = btn.dataset.route === 'app';
        }
      }
      btn.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  function setActiveRoute(routeName) {
    document.querySelectorAll('section[data-route]').forEach((section) => {
      section.classList.toggle('is-active', section.dataset.route === routeName);
      if (section.dataset.route === 'faq' && routeName === 'faq') {
        document.querySelector('.hb-view--landing')?.classList.add('is-active');
      }
      if (section.dataset.route !== routeName && section.dataset.route !== 'faq') {
        section.classList.remove('is-active');
      }
    });
    if (routeName === 'app') {
      document.querySelector('.hb-view--app')?.classList.add('is-active');
    } else if (routeName === 'home') {
      document.querySelector('.hb-view--landing')?.classList.add('is-active');
    }
    syncNav(routeName);
    focusMain?.();
    emit?.('route:change', routeName);
  }

  function handleHashChange() {
    const hash = window.location.hash || '#/home';
    const routeName = resolveRoute(hash);
    setActiveRoute(routeName);
  }

  function initRouter() {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
  }

  function routeTo(routeName) {
    const target = routeHashes[routeName] || routeHashes.home;
    if (window.location.hash === target) {
      setActiveRoute(routeName);
    } else {
      window.location.hash = target;
    }
  }

  HB.routeTo = routeTo;
  HB.initRouter = initRouter;
})(window);
