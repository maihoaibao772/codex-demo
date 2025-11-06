/*
  config.js - deployment-time configuration for allowlist and optional access code.
  Owners can edit HB_ALLOW or HB_ACCESS_CODE before deploying without touching
  application logic. The runtime also respects any allowlist CSV stored in
  localStorage (hb:allow) which overrides this static list.
*/

window.HB_ALLOW = ['hoai-bao', 'vip-acc'];
window.HB_ACCESS_CODE = '';
