(function() {
  const placeholderId = 'github-user-PLACEHOLDER';
  const placeholderForm = document.getElementById(placeholderId);
  if (!placeholderForm) {
    console.warn('Github user form not found');
    return;
  }
  const seed = Math.random().toString(36).slice(2, 9);
  const dynamicId = 'github-user-' + seed;
  placeholderForm.id = dynamicId;

  const statusEl = document.getElementById('github-status');
  const createdAtEl = document.getElementById('github-created-at');
  const ageEl = document.getElementById('github-account-age');
  const usernameInput = document.getElementById('username');

  // Helper to read ?token= from URL
  function getQueryParam(param) {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get(param);
    } catch (e) {
      // Fallback parsing if URL constructor is unavailable
      const match = window.location.search.match(new RegExp('[?&]' + param + '=([^&]+)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
  }

  function computeAge(createdStr) {
    try {
      const createdDate = new Date(createdStr);
      if (isNaN(createdDate)) return 0;
      const now = new Date();
      let years = now.getUTCFullYear() - createdDate.getUTCFullYear();
      const m = now.getUTCMonth() - createdDate.getUTCMonth();
      if (m < 0 || (m === 0 && now.getUTCDate() < createdDate.getUTCDate())) {
        years--;
      }
      return Math.max(years, 0);
    } catch (e) {
      return 0;
    }
  }

  // Submit handler for the dynamically named form
  placeholderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = (usernameInput.value || '').trim();
    if (!username) {
      statusEl.textContent = 'Please enter a GitHub username.';
      return;
    }

    statusEl.textContent = 'Fetching data for ' + username + '...';

    const token = getQueryParam('token');
    const headers = token ? { 'Authorization': 'token ' + token } : undefined;

    try {
      const resp = await fetch('https://api.github.com/users/' + encodeURIComponent(username), {
        headers: headers
      });
      const data = await resp.json();
      if (!resp.ok) {
        const msg = data && data.message ? data.message : 'Unknown error';
        statusEl.textContent = 'Error: ' + msg;
        createdAtEl.textContent = 'Not loaded yet';
        ageEl.textContent = '0 years';
        return;
      }
      if (data && data.created_at) {
        const dt = new Date(data.created_at);
        const ymd = dt.toISOString().slice(0, 10);
        createdAtEl.textContent = ymd + ' UTC';
        const years = computeAge(data.created_at);
        ageEl.textContent = years + ' years';
        statusEl.textContent = 'Data loaded for ' + username;
      } else {
        createdAtEl.textContent = 'Unknown';
        ageEl.textContent = '0 years';
        statusEl.textContent = 'Creation date not available for this user.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error: ' + (err && err.message ? err.message : err);
    }
  });
})();
