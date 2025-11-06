/*
  auth.js - registration and login management using localStorage.
  Includes mobile bottom-sheet interactions with swipe-to-close and
  auto-dismiss on scroll per UI v12 guidelines.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const {
    storageKeys,
    getStorage,
    setStorage,
    showToast,
    getCurrentUser,
    emit,
    setAllowlist,
    getAllowlist,
    getAccessCode,
    isUserAllowed,
  } = HB;

  const authModal = document.querySelector('[data-modal="auth"]');
  if (!authModal) return;
  authModal.style.display = 'none';

  const modalDialog = authModal.querySelector('.hb-modal__dialog');
  const authForm = authModal.querySelector('[data-auth-form]');
  const authFeedback = authModal.querySelector('[data-auth-feedback]');
  const authToggleBtn = authModal.querySelector('[data-auth-toggle]');
  const authTitle = authModal.querySelector('#authTitle');
  const accessWrapper = authModal.querySelector('[data-auth-access]');
  const accessInput = authModal.querySelector('input[name="access"]');

  let authMode = 'login';
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  function loadUsers() {
    return getStorage(storageKeys.users, {});
  }

  function saveUsers(users) {
    setStorage(storageKeys.users, users);
  }

  function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return crypto.subtle.digest('SHA-256', data).then((hash) => {
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    });
  }

  function resetSheetPosition() {
    modalDialog.style.transition = '';
    modalDialog.style.transform = '';
    authModal.classList.remove('is-dragging');
  }

  function closeModal() {
    authModal.classList.remove('is-open');
    authModal.style.display = 'none';
    resetSheetPosition();
    authFeedback.textContent = '';
    authFeedback.dataset.state = '';
  }

  function openModal(mode = 'login') {
    authMode = mode;
    authModal.classList.add('is-open');
    authModal.style.display = 'flex';
    resetSheetPosition();
    authTitle.textContent = mode === 'login' ? 'Đăng nhập' : 'Đăng ký';
    authToggleBtn.textContent = mode === 'login' ? 'Chuyển sang đăng ký' : 'Chuyển sang đăng nhập';
    authFeedback.textContent = '';
    authFeedback.dataset.state = '';
    authForm.reset();
    if (accessInput) accessInput.value = '';
    const remember = localStorage.getItem(storageKeys.remember);
    if (remember) {
      authForm.username.value = remember;
      authForm.remember.checked = true;
    }
    const code = getAccessCode();
    if (accessWrapper) {
      accessWrapper.hidden = !code;
      if (code) {
        accessWrapper.removeAttribute('aria-hidden');
      } else {
        accessWrapper.setAttribute('aria-hidden', 'true');
      }
    }
  }

  function setSession(username) {
    setStorage(storageKeys.session, { username, loggedInAt: Date.now() });
    emit('auth:change', username);
  }

  function clearSession() {
    localStorage.removeItem(storageKeys.session);
    emit('auth:change', null);
  }

  async function handleLogin(username, password) {
    const users = loadUsers();
    const user = users[username];
    if (!user) {
      throw new Error('Không tìm thấy người dùng.');
    }
    const hash = await hashPassword(password);
    if (hash !== user.pass) {
      throw new Error('Sai mật khẩu.');
    }
    if (!isUserAllowed(username)) {
      throw new Error('Tài khoản chưa được cấp quyền.');
    }
    setSession(username);
  }

  async function handleSignup(username, password) {
    const users = loadUsers();
    if (users[username]) {
      throw new Error('Tên đăng nhập đã tồn tại.');
    }
    if (!isUserAllowed(username)) {
      throw new Error('Tài khoản chưa được cấp quyền.');
    }
    const hash = await hashPassword(password);
    users[username] = { pass: hash, created: Date.now() };
    saveUsers(users);
    setSession(username);
  }

  function handleRemember(isRemembered, username) {
    if (isRemembered) {
      localStorage.setItem(storageKeys.remember, username);
    } else {
      localStorage.removeItem(storageKeys.remember);
    }
  }

  authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(authForm);
    const username = formData.get('username').trim();
    const password = formData.get('password').trim();
    const remember = Boolean(formData.get('remember'));
    const accessCode = (formData.get('access') || '').trim();
    const requiredCode = getAccessCode();
    authFeedback.dataset.state = '';
    authFeedback.textContent = 'Đang xử lý...';
    try {
      if (requiredCode && accessCode !== requiredCode) {
        throw new Error('Sai mã truy cập.');
      }
      if (authMode === 'login') {
        await handleLogin(username, password);
        authFeedback.dataset.state = 'success';
        authFeedback.textContent = 'Đăng nhập thành công!';
      } else {
        await handleSignup(username, password);
        authFeedback.dataset.state = 'success';
        authFeedback.textContent = 'Đăng ký thành công!';
      }
      handleRemember(remember, username);
      HB.routeTo?.('app');
      HB.activateTab?.('learn');
      HB.renderAccount?.();
      setTimeout(() => {
        closeModal();
      }, 600);
    } catch (error) {
      authFeedback.dataset.state = 'error';
      authFeedback.textContent = error.message;
    }
  });

  authToggleBtn.addEventListener('click', () => {
    openModal(authMode === 'login' ? 'signup' : 'login');
  });

  authModal.addEventListener('click', (event) => {
    if (event.target === authModal) {
      closeModal();
    }
  });

  modalDialog.addEventListener(
    'touchstart',
    (event) => {
      if (!window.matchMedia('(max-width: 640px)').matches) return;
      if (event.touches.length !== 1) return;
      startY = event.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      authModal.classList.add('is-dragging');
      modalDialog.style.transition = 'none';
    },
    { passive: true }
  );

  modalDialog.addEventListener(
    'touchmove',
    (event) => {
      if (!isDragging) return;
      currentY = event.touches[0].clientY;
      const diff = Math.max(0, currentY - startY);
      modalDialog.style.transform = `translateY(${diff}px)`;
    },
    { passive: true }
  );

  function finishDrag() {
    if (!isDragging) return;
    const diff = Math.max(0, currentY - startY);
    modalDialog.style.transition = 'transform 0.2s ease';
    if (diff > 90) {
      closeModal();
    } else {
      modalDialog.style.transform = 'translateY(0)';
      setTimeout(() => {
        if (!isDragging) {
          modalDialog.style.transition = '';
        }
      }, 220);
    }
    isDragging = false;
    startY = 0;
    currentY = 0;
    setTimeout(() => {
      if (!isDragging) {
        authModal.classList.remove('is-dragging');
      }
    }, 200);
  }

  ['touchend', 'touchcancel'].forEach((evt) => {
    modalDialog.addEventListener(evt, finishDrag, { passive: true });
  });

  window.addEventListener(
    'scroll',
    () => {
      if (!authModal.classList.contains('is-open')) return;
      if (!window.matchMedia('(max-width: 640px)').matches) return;
      closeModal();
    },
    { passive: true }
  );

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (authModal.classList.contains('is-open')) {
        closeModal();
      }
      document
        .querySelectorAll('.hb-modal.is-open')
        .forEach((modal) => {
          if (modal !== authModal) {
            modal.classList.remove('is-open');
          }
        });
      resetSheetPosition();
    }
  });

  function logout() {
    clearSession();
    showToast('Đã đăng xuất.');
    HB.routeTo?.('home');
  }

  function ensureLoggedIn() {
    const user = getCurrentUser();
    if (!user || !isUserAllowed(user)) {
      if (user && !isUserAllowed(user)) {
        clearSession();
      }
      openModal('login');
      return false;
    }
    return true;
  }

  function updateAllowlist(csv) {
    const items = csv
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    setAllowlist(items);
    showToast('Đã cập nhật allowlist.');
  }

  function getUsersRaw() {
    return getStorage(storageKeys.users, {});
  }

  function importUsers(data) {
    const users = getUsersRaw();
    Object.assign(users, data);
    saveUsers(users);
  }

  Object.assign(HB, {
    logout,
    ensureLoggedIn,
    updateAllowlist,
    getUsersRaw,
    importUsers,
    openAuthModal: openModal,
    closeAuthModal: closeModal,
  });
})(window);
