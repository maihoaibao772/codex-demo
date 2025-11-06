/*
  account.js - renders account tab with avatar, VIP toggle, export/import.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const {
    getCurrentUser,
    storageKeys,
    getStorage,
    setStorage,
    showToast,
    downloadJSON,
    readJSONFile,
    getAllowlist,
    setAllowlist,
    getCoins,
    setCoins,
    modifyCoins,
    getFrameInventory,
    setFrameInventory,
    applyFrameClass,
    buildStatsSummary,
    emit,
  } = HB;
  const { logout } = HB;

const container = document.querySelector('[data-account="container"]');
const headerAvatar = document.querySelector('[data-avatar-emoji]');
const headerAvatarFrame = document.querySelector('[data-avatar-vip]');

function renderLoggedOut() {
  container.innerHTML = `
    <section class="hb-account__section">
      <h3>Chưa đăng nhập</h3>
      <p>Hãy đăng nhập để quản lý avatar, VIP và dữ liệu học.</p>
      <button class="hb-btn hb-btn--primary" data-account-action="login">Đăng nhập ngay</button>
    </section>
  `;
  container.querySelector('[data-account-action="login"]').addEventListener('click', () => {
    window.location.hash = '#/account';
    document.querySelector('[data-auth="login"]').click();
  });
}

function renderLoggedIn(username) {
  const prefs = getStorage(storageKeys.prefs, {});
  const avatarEmoji = localStorage.getItem('hb:avatar') || '🙂';
  const coins = getCoins();
  const allow = getAllowlist();
  const activeFrame = prefs.activeFrame;

  container.innerHTML = `
    <section class="hb-account__section">
      <h3>Thông tin tài khoản</h3>
      <div class="hb-account__grid">
        <div>
          <p>Tên đăng nhập: <strong>${username}</strong></p>
          <p>VIP: <strong>${prefs.vipFrame ? 'Bật' : 'Tắt'}</strong></p>
          <p>Coin hiện có: <strong>${coins}</strong></p>
        </div>
        <div class="hb-account__avatar-preview" data-account="avatarPreview">
          <span>${avatarEmoji}</span>
          <span class="hb-account__frame-preview ${activeFrame || ''}"></span>
        </div>
      </div>
      <div class="hb-account__grid">
        <label class="hb-form-control">
          <span>Đổi avatar emoji</span>
          <input type="text" maxlength="4" data-account-input="emoji" value="${avatarEmoji}">
        </label>
        <label class="hb-form-control hb-form-control--inline">
          <span>Bật VIP frame</span>
          <input type="checkbox" data-account-input="vip" ${prefs.vipFrame ? 'checked' : ''}>
        </label>
      </div>
      <div class="hb-account__grid">
        <button class="hb-btn hb-btn--secondary" data-account-action="save">Lưu thay đổi</button>
        <button class="hb-btn hb-btn--ghost" data-account-action="logout">Đăng xuất</button>
      </div>
    </section>

    <section class="hb-account__section">
      <h3>Xuất / Nhập dữ liệu</h3>
      <p>Bạn có thể xuất toàn bộ dữ liệu ứng dụng ra JSON để sao lưu.</p>
      <div class="hb-account__grid">
        <button class="hb-btn hb-btn--secondary" data-account-action="export">Xuất JSON</button>
        <label class="hb-btn hb-btn--ghost">
          Nhập JSON
          <input type="file" accept="application/json" data-account-input="import" style="display:none;">
        </label>
      </div>
      <pre class="hb-account__summary" data-account="summary"></pre>
    </section>

    <section class="hb-account__section">
      <h3>Allowlist</h3>
      <p>CSV allowlist hiện tại: <code>${allow ? allow.join(', ') : 'Không thiết lập'}</code></p>
      <label class="hb-form-control">
        <span>Cập nhật allowlist (CSV)</span>
        <input type="text" data-account-input="allow" placeholder="user1,user2" value="${allow ? allow.join(',') : ''}">
      </label>
      <button class="hb-btn hb-btn--ghost" data-account-action="allow">Lưu allowlist</button>
    </section>

    <section class="hb-account__section">
      <h3>Admin coin</h3>
      <div class="hb-account__admin" data-account="admin" ${allow && !allow.includes(username) ? 'hidden' : ''}>
        <p>Chỉ owner mới thấy mục này. Bạn có thể cộng coin cho tài khoản hiện tại.</p>
        <label class="hb-form-control">
          <span>Số coin thêm</span>
          <input type="number" data-account-input="coinDelta" value="100">
        </label>
        <div class="hb-account__grid">
          <button class="hb-btn hb-btn--secondary" data-account-action="addCoins">+ Coin</button>
          <button class="hb-btn hb-btn--ghost" data-account-action="setCoins">Đặt giá trị coin</button>
        </div>
      </div>
    </section>
  `;

  const summaryEl = container.querySelector('[data-account="summary"]');
  summaryEl.textContent = buildStatsSummary(getStorage(storageKeys.stats, {}));

  container.querySelector('[data-account-action="save"]').addEventListener('click', () => {
    const emoji = container.querySelector('[data-account-input="emoji"]').value || '🙂';
    const vip = container.querySelector('[data-account-input="vip"]').checked;
    localStorage.setItem('hb:avatar', emoji);
    const prefs = getStorage(storageKeys.prefs, {});
    prefs.vipFrame = vip;
    setStorage(storageKeys.prefs, prefs);
    headerAvatar.textContent = emoji;
    headerAvatar.parentElement.dataset.vip = vip ? 'true' : 'false';
    showToast('Đã lưu avatar và VIP.');
  });

  container.querySelector('[data-account-action="logout"]').addEventListener('click', () => {
    logout();
    renderLoggedOut();
  });

  container.querySelector('[data-account-action="export"]').addEventListener('click', () => {
    const payload = {
      users: getStorage(storageKeys.users, {}),
      stats: getStorage(storageKeys.stats, {}),
      wrongPool: getStorage(storageKeys.wrongPool, {}),
      prefs: getStorage(storageKeys.prefs, {}),
      allow: getAllowlist(),
      coins: getCoins(),
      frames: getFrameInventory(),
    };
    downloadJSON('hanzi-bridge-export.json', payload);
  });

  container.querySelector('[data-account-input="import"]').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const data = await readJSONFile(file);
      setStorage(storageKeys.users, data.users || {});
      setStorage(storageKeys.stats, data.stats || {});
      setStorage(storageKeys.wrongPool, data.wrongPool || {});
      setStorage(storageKeys.prefs, data.prefs || {});
      if (data.allow) setAllowlist(Array.isArray(data.allow) ? data.allow : String(data.allow).split(','));
      if (data.coins !== undefined) setCoins(data.coins);
      if (data.frames) setFrameInventory(data.frames);
      showToast('Đã nhập dữ liệu.');
      renderAccount();
    } catch (error) {
      showToast('Lỗi khi đọc JSON.');
    }
  });

  container.querySelector('[data-account-action="allow"]').addEventListener('click', () => {
    const csv = container.querySelector('[data-account-input="allow"]').value;
    setAllowlist(csv.split(',').map((item) => item.trim()).filter(Boolean));
    showToast('Đã cập nhật allowlist.');
  });

  container.querySelector('[data-account-action="addCoins"]').addEventListener('click', () => {
    const delta = Number(container.querySelector('[data-account-input="coinDelta"]').value || 0);
    modifyCoins(delta);
    showToast(`Đã cộng ${delta} coin.`);
    renderAccount();
  });

  container.querySelector('[data-account-action="setCoins"]').addEventListener('click', () => {
    const delta = Number(container.querySelector('[data-account-input="coinDelta"]').value || 0);
    setCoins(delta);
    showToast('Đã đặt lại coin.');
    renderAccount();
  });
}

function renderAccount() {
  const username = getCurrentUser();
  if (!username) {
    renderLoggedOut();
    return;
  }
  headerAvatar.textContent = localStorage.getItem('hb:avatar') || '🙂';
  const prefs = getStorage(storageKeys.prefs, {});
  headerAvatar.parentElement.dataset.vip = prefs.vipFrame ? 'true' : 'false';
  applyFrameClass(headerAvatarFrame, prefs.activeFrame || '');
  renderLoggedIn(username);
}

emit('account:ready');
document.addEventListener('DOMContentLoaded', renderAccount);
  HB.renderAccount = renderAccount;
})(window);
