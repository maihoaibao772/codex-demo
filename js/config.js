/*
  config.js - deployment-time knobs. Allowlist is deprecated in V13.3 hotfix,
  so we expose empty arrays and rely solely on activation codes handled in the
  inline patch. HB_ACCESS_CODE is still available if future builds need it.
*/

window.HB_ALLOW = [];
window.HB_ACCESS_CODE = '';
