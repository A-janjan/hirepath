/* ==========================================================================
   Hirepath — Job Search OS  ·  front-end application
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ icons */
  var ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    layers: '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9L4 7l2.8-2.8.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3.1V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L20 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2 5.3"/><path d="M20 4v7h-7"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 21h16"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.5L7 22l5-3 5 3-1.2-8.5"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14L21 3"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    zap: '<path d="M13 2L3 14h8l-1 8 10-12h-8z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>'
  };
  function ico(n, size) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"' +
      (size ? ' width="' + size + '" height="' + size + '"' : '') + '>' + (ICONS[n] || '') + '</svg>';
  }

  /* --------------------------------------------------------------- helpers */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return Charts.esc(s == null ? '' : s); }
  function pct(v, digits) { return v == null ? '—' : (v * 100).toFixed(digits == null ? 1 : digits).replace(/\.0$/, '') + '%'; }
  function num(v) { return v == null ? '—' : Number(v).toLocaleString(); }
  function one(v) { return v == null ? '—' : Number(v).toFixed(1); }
  function shortDate(s) {
    if (!s) return '—';
    var d = new Date(s + 'T00:00:00');
    return isNaN(d) ? s : d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
  }
  function fullDate(s) {
    if (!s) return '—';
    var d = new Date(s + 'T00:00:00');
    return isNaN(d) ? s : d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function addDays(s, k) {
    var d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + k);
    return d.toISOString().slice(0, 10);
  }
  function dow(s) { return new Date(s + 'T00:00:00').getDay(); }
  function opts(list, current, blank) {
    return (blank ? '<option value="">' + esc(blank) + '</option>' : '') +
      (list || []).map(function (v) {
        var val = typeof v === 'string' ? v : v.label || v.name;
        return '<option value="' + esc(val) + '"' + (val === current ? ' selected' : '') + '>' + esc(val) + '</option>';
      }).join('');
  }
  function badge(txt, kind, plain) {
    return '<span class="badge ' + (kind || '') + (plain ? ' plain' : '') + '">' + esc(txt) + '</span>';
  }
  function statusBadge(status, outcome, stage) {
    var kind = 'pending';
    if (outcome === 'Rejected') kind = 'rejected';
    else if (outcome === 'Offer') kind = 'offer';
    else if (outcome === 'Closed' || outcome === 'Withdrawn') kind = 'closed';
    else if (stage >= 2) kind = 'process';
    return badge(status || 'Unknown', kind);
  }
  function colorVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

  function toast(msg, isError) {
    var root = $('#toast-root');
    var el = document.createElement('div');
    el.className = 'toast' + (isError ? ' error' : '');
    el.innerHTML = ico(isError ? 'alert' : 'check') + '<span>' + esc(msg) + '</span>';
    root.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; setTimeout(function () { el.remove(); }, 260); }, 3200);
  }
  async function api(path, options) {
    var res = await fetch(path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, options || {}));
    var data;
    try { data = await res.json(); } catch (e) { data = {}; }
    if (!res.ok) throw new Error(data.error || ('Request failed (' + res.status + ')'));
    return data;
  }

  /* ----------------------------------------------------------------- state */
  var NAV = [
    { id: 'overview', label: 'Overview', icon: 'grid', sub: 'Your job search at a glance' },
    { id: 'applications', label: 'Applications', icon: 'briefcase', sub: 'One row per application — your source of truth' },
    { id: 'daily', label: 'Daily Log', icon: 'calendar', sub: 'Show up every day, even on zero-application days' },
    { id: 'funnel', label: 'Funnel & Rates', icon: 'filter', sub: 'Stage conversion vs rejection rates — different denominators' },
    { id: 'categories', label: 'Categories', icon: 'layers', sub: 'Which job categories actually respond?' },
    { id: 'strategy', label: 'Strategy', icon: 'sliders', sub: 'Resume, tailoring, cover letters, referrals and sources' },
    { id: 'insights', label: 'Insights', icon: 'bulb', sub: 'Observations and one experiment at a time' },
    { id: 'settings', label: 'Settings', icon: 'settings', sub: 'Targets, dropdown values and data management' }
  ];

  var S = {
    data: null, view: 'overview', loading: true,
    cohort: { from: '', to: '' },
    theme: localStorage.getItem('hirepath-theme') || 'light',
    ui: {
      apps: { q: '', status: '', category: '', resume: '', outcome: '', page: 1, sort: 'applied', dir: -1, per: 20 },
      daysPage: 30, strategyAll: false
    },
    modal: null
  };

  /* ------------------------------------------------------------------ boot */
  function boot() {
    document.documentElement.setAttribute('data-theme', S.theme);
    $('#nav').innerHTML = NAV.map(function (n) {
      return '<button class="nav-item" data-action="nav" data-view="' + n.id + '">' + ico(n.icon) + '<span>' + n.label + '</span></button>';
    }).join('');
    $('#add-btn').innerHTML = ico('plus') + '<span>Add application</span>';
    $('#refresh-btn').innerHTML = ico('refresh');
    $('#menu-btn').innerHTML = ico('menu');
    updateThemeBtn();
    load();
    bindEvents();
  }

  function updateThemeBtn() {
    $('#theme-btn').innerHTML = ico(S.theme === 'dark' ? 'sun' : 'moon');
  }

  async function load() {
    S.loading = true;
    var q = [];
    if (S.cohort.from) q.push('from=' + encodeURIComponent(S.cohort.from));
    if (S.cohort.to) q.push('to=' + encodeURIComponent(S.cohort.to));
    try {
      S.data = await api('/api/state' + (q.length ? '?' + q.join('&') : ''));
    } catch (e) {
      $('#view').innerHTML = '<div class="view-inner"><div class="card"><div class="card-body center" style="padding:60px">' +
        '<h2>Could not load data</h2><p class="muted">' + esc(e.message) + '</p>' +
        '<button class="btn btn-primary" data-action="refresh">Try again</button></div></div></div>';
      return;
    }
    S.loading = false;
    render();
  }

  function refresh() { return load(); }

  /* ---------------------------------------------------------------- render */
  function render() {
    if (!S.data) return;
    var a = S.data.analytics, o = a.overall, m = a.meta;
    var nav = NAV.filter(function (n) { return n.id === S.view; })[0] || NAV[0];
    $('#page-title').textContent = nav.label;
    $('#page-sub').textContent = nav.sub;
    $('#date-pill').innerHTML = ico('calendar') + '<span>' + fullDate(m.today) + '</span>';
    $$('.nav-item').forEach(function (el) { el.classList.toggle('active', el.dataset.view === S.view); });
    $('#side-streak').innerHTML = o.current_streak + ' <small>day streak</small>';
    $('#side-streak-sub').textContent = o.longest_streak + ' day personal best · ' + pct(o.showup, 0) + ' show-up rate';

    var html = '';
    switch (S.view) {
      case 'overview': html = viewOverview(); break;
      case 'applications': html = viewApplications(); break;
      case 'daily': html = viewDaily(); break;
      case 'funnel': html = viewFunnel(); break;
      case 'categories': html = viewCategories(); break;
      case 'strategy': html = viewStrategy(); break;
      case 'insights': html = viewInsights(); break;
      case 'settings': html = viewSettings(); break;
    }
    $('#view').innerHTML = '<div class="view-inner">' + html + '</div>';
    $('#view').scrollTop = 0;
    afterRender();
  }

  function renderOnlyView() {
    // re-render view body without moving scroll position
    var v = $('#view'), top = v.scrollTop;
    var html = '';
    switch (S.view) {
      case 'applications': html = viewApplications(); break;
      default: render(); return;
    }
    v.innerHTML = '<div class="view-inner">' + html + '</div>';
    v.scrollTop = top;
    afterRender();
  }

  function card(title, sub, body, extraClass, actions, foot) {
    return '<div class="card ' + (extraClass || '') + '">' +
      '<div class="card-head"><div><h3 class="card-title">' + esc(title) + '</h3>' +
      (sub ? '<p class="card-sub">' + esc(sub) + '</p>' : '') + '</div>' +
      (actions ? '<div class="card-actions">' + actions + '</div>' : '') + '</div>' +
      '<div class="card-body">' + body + '</div>' +
      (foot ? '<div class="card-foot">' + foot + '</div>' : '') + '</div>';
  }

  function kpi(o) {
    return '<div class="kpi" style="--accent:var(--' + o.color + ');--accent-soft:var(--' + (o.soft || (o.color + '-soft')) + ')">' +
      '<div class="kpi-top"><span class="kpi-label">' + esc(o.label) + '</span>' +
      '<span class="kpi-icon">' + ico(o.icon) + '</span></div>' +
      '<div class="kpi-value">' + o.value + (o.unit ? '<span class="unit">' + o.unit + '</span>' : '') + '</div>' +
      '<div class="kpi-sub">' + o.sub + '</div>' +
      (o.spark ? '<div class="kpi-spark">' + o.spark + '</div>' : '') + '</div>';
  }

  function sampleBanner() {
    return '<div class="banner banner-warn">' +
      '<div class="banner-icon">' + ico('alert') + '</div>' +
      '<div class="banner-text"><div class="banner-title">Demo data is active — these are not your results</div>' +
      '<div class="banner-desc">The app is loaded with fictional applications and activity so you can explore the dashboard. Remove them before entering real data.</div></div>' +
      '<button class="btn btn-sm" data-action="nav" data-view="settings">Settings</button>' +
      '<button class="btn btn-sm btn-primary" data-action="clear-sample">Remove sample data</button></div>';
  }

  function cohortBar() {
    var m = S.data.analytics.meta;
    var label = (!S.cohort.from && !S.cohort.to) ? 'All dates' :
      ((S.cohort.from ? shortDate(S.cohort.from) : 'start') + ' → ' + (S.cohort.to ? shortDate(S.cohort.to) : 'today'));
    return '<div class="toolbar" style="border:0;background:var(--surface);border:1px solid var(--line);border-radius:14px;margin-bottom:18px;padding:11px 14px">' +
      '<span class="small muted bold" style="letter-spacing:.4px">COHORT</span>' +
      badge(label, 'primary', true) +
      '<span class="small muted">Mature window: <b>' + m.maturity + ' days</b> · minimum n: <b>' + m.min_sample + '</b></span>' +
      '<span class="toolbar-spacer"></span>' +
      '<button class="btn btn-sm" data-action="cohort">' + ico('filter') + ' Change filter</button>' +
      ((S.cohort.from || S.cohort.to) ? '<button class="btn btn-sm btn-ghost" data-action="cohort-clear">Clear</button>' : '') +
      '</div>';
  }

  /* --------------------------------------------------------------- OVERVIEW */
  function viewOverview() {
    var a = S.data.analytics, o = a.overall, m = a.meta;
    var wk = a.trends.weekly.map(function (w) { return w.apps; });
    var spark = Charts.spark(wk, colorVar('--primary') || '#4f46e5', 160, 36);
    var delta = o.last7 - o.prev7;
    var h = '';
    if (o.sample_present) h += sampleBanner();
    h += cohortBar();
    h += '<div class="kpi-grid mb">' +
      kpi({ label: 'Total applications', value: num(o.total), icon: 'briefcase', color: 'primary', sub: 'In the selected cohort', spark: spark }) +
      kpi({ label: 'Applied today', value: num(o.today), icon: 'calendar', color: 'blue', sub: 'New applications today' }) +
      kpi({ label: 'Applied this week', value: num(o.week), icon: 'trend', color: 'blue',
            sub: (delta >= 0 ? '<span class="up">+' + delta + '</span>' : '<span class="down">' + delta + '</span>') + ' vs previous 7 days' }) +
      kpi({ label: 'Applied this month', value: num(o.month), icon: 'calendar', color: 'violet', soft: 'primary-soft', sub: 'Calendar month to date' }) +
      kpi({ label: 'Awaiting a decision', value: num(o.pending), icon: 'clock', color: 'violet', soft: 'primary-soft',
            sub: o.pending_first + ' awaiting first reply · ' + o.pending_process + ' in process' }) +
      kpi({ label: 'Interview invitations', value: num(o.hr_inv), icon: 'users', color: 'blue',
            sub: o.tech_inv + ' technical · ' + o.final_inv + ' final' }) +
      kpi({ label: 'Interviews attended', value: num(o.interviews_attended), icon: 'users', color: 'primary', soft: 'primary-soft',
            sub: 'Completed interview dates recorded' }) +
      kpi({ label: 'Offers received', value: num(o.offers), icon: 'award', color: 'teal',
            sub: o.offers_accepted + ' accepted · ' + pct(o.offer_rate) + ' offer rate' }) +
      kpi({ label: 'Response rate', value: pct(o.response_rate), icon: 'target', color: 'teal',
            sub: o.responses + ' explicit responses · pending excluded' }) +
      kpi({ label: 'Applications / active day', value: one(o.apps_per_active_day), icon: 'trend', color: 'primary', soft: 'primary-soft',
            sub: o.active_days + ' active days · cohort apps ÷ active days' }) +
      kpi({ label: 'Daily application target', value: pct(o.target_pct, 0), icon: 'target', color: 'amber',
            sub: o.target_days + ' target days · target ' + m.daily_target + ' apps/day' }) +
      kpi({ label: 'Time invested', value: one(o.hours), unit: 'hrs', icon: 'heart', color: 'rose',
            sub: num(o.minutes) + ' minutes logged · ' + pct(o.showup, 0) + ' show-up rate' }) +
      '</div>';

    h += '<div class="grid g2 mb">' +
      card('Applications over time', 'Daily submissions with a 7-day rolling average', '<div id="ch-daily"></div>', '') +
      card('Recruitment funnel', 'Stage conversion. Green = mature cohort (similar time to progress).', funnelBars(a.funnel), '') +
      '</div>';

    h += '<div class="grid g3 mb">' +
      card('Weekly target completion', 'Applications per week vs your target of ' + m.weekly_target, '<div id="ch-weekly"></div>') +
      card('Consistency heatmap', 'A day counts if you applied, sourced, messaged, interviewed or studied.', heatmapHtml(a)) +
      card('Activity vs results', 'Weekly applications, HR invitations and offers', '<div id="ch-activity"></div>') +
      '</div>';

    h += '<div class="grid g3">' +
      card('Recent applications', '', recentTable(a.recent), '',
        '<button class="btn btn-sm" data-action="nav" data-view="applications">View all ' + ico('external') + '</button>') +
      card('Needs attention', '', attentionHtml(a.attention), '',
        '<button class="btn btn-sm" data-action="nav" data-view="applications">Open ' + ico('external') + '</button>') +
      card('Explicit rejections by stage', 'Only confirmed rejections — silence is excluded', '<div id="ch-donut"></div>') +
      '</div>';
    return h;
  }

  function funnelBars(funnel) {
    return '<div>' + funnel.map(function (f) {
      var w = Math.max(2, (f.rate || 0) * 100);
      var mw = Math.max(2, (f.mrate || 0) * 100);
      return '<div class="funnel-item"><div class="funnel-head"><span class="funnel-name">' + esc(f.label) +
        '</span><span class="funnel-rate">' + pct(f.rate, 0) + '</span></div>' +
        '<div class="funnel-track"><div class="funnel-fill" style="width:' + w + '%"></div></div>' +
        '<div class="funnel-meta"><span>' + f.num + ' of ' + f.den + ' eligible</span>' +
        '<span>Mature <b>' + pct(f.mrate, 0) + '</b> <span class="muted">(' + f.mnum + '/' + f.mden + ')</span></span></div>' +
        '<div class="funnel-track" style="height:4px;margin-top:5px"><div class="funnel-fill mature" style="width:' + mw + '%"></div></div>' +
        '</div>';
    }).join('') + '</div>';
  }

  function heatmapHtml(a) {
    var today = a.meta.today;
    var start = addDays(today, -(17 * 7 - 1));
    // align start to Monday
    while (dow(start) !== 1) start = addDays(start, -1);
    var map = {};
    a.habit.series.forEach(function (d) { map[d.date] = d; });
    var cells = '', cur = start, end = addDays(today, 6 - ((dow(today) + 6) % 7));
    while (cur <= end) {
      for (var w = 0; w < 7; w++) {
        var d = addDays(cur, w);
        var rec = map[d];
        var lv = 0;
        if (rec) {
          if (rec.apps >= 3) lv = 4;
          else if (rec.apps >= 2) lv = 3;
          else if (rec.apps === 1) lv = 2;
          else if (rec.active) lv = 1;
        }
        var tip = d + ' · ' + (rec ? (rec.apps + ' applications, ' + rec.minutes + ' min') : 'no data');
        cells += '<div class="heat-cell ' + (d > today ? 'future' : (lv ? 'l' + lv : '')) + '" title="' + esc(tip) + '"></div>';
      }
      cur = addDays(cur, 7);
    }
    return '<div class="heatmap-wrap"><div class="heatmap">' + cells + '</div></div>' +
      '<div class="heat-legend"><span>Less</span>' +
      [0, 1, 2, 3, 4].map(function (i) { return '<i class="heat-cell ' + (i ? 'l' + i : '') + '"></i>'; }).join('') +
      '<span>More</span><span style="margin-left:auto">' + a.habit.active_days + ' active days</span></div>';
  }

  function recentTable(recent) {
    if (!recent.length) return emptyState('No applications yet', 'Add your first application to get started.');
    return '<div class="table-wrap"><table class="data"><thead><tr><th>Company / role</th><th>Applied</th><th>Status</th></tr></thead><tbody>' +
      recent.slice(0, 6).map(function (r) {
        return '<tr><td><div class="cell-company"><b>' + esc(r.company) + '</b><small>' + esc(r.title) + '</small></div></td>' +
          '<td class="nowrap small">' + shortDate(r.applied) + '</td>' +
          '<td>' + statusBadge(r.status, r.outcome, r.stage) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  function attentionHtml(att) {
    var items = [];
    att.followups.slice(0, 3).forEach(function (x) {
      items.push('<div class="attn-item"><i class="attn-dot" style="background:var(--amber)"></i>' +
        '<div class="attn-text"><b>' + esc(x.company) + '</b><small>Follow-up due ' + fullDate(x.date) + '</small></div>' +
        '<button class="attn-action" data-action="edit-application" data-id="' + esc(x.id) + '">Open</button></div>');
    });
    att.stale.slice(0, 2).forEach(function (x) {
      items.push('<div class="attn-item"><i class="attn-dot" style="background:var(--rose)"></i>' +
        '<div class="attn-text"><b>' + esc(x.company) + '</b><small>No reply in ' + x.age + ' days — still pending</small></div>' +
        '<button class="attn-action" data-action="edit-application" data-id="' + esc(x.id) + '">Open</button></div>');
    });
    att.missing.slice(0, 2).forEach(function (x) {
      items.push('<div class="attn-item"><i class="attn-dot" style="background:var(--muted)"></i>' +
        '<div class="attn-text"><b>' + esc(x.company) + '</b><small>Missing: ' + esc(x.fields.join(', ')) + '</small></div>' +
        '<button class="attn-action" data-action="edit-application" data-id="' + esc(x.id) + '">Fix</button></div>');
    });
    if (!items.length) items.push('<div class="callout teal">' + ico('check') + ' Nothing needs attention. Your data is complete and no follow-ups are due.</div>');
    return items.join('');
  }

  function emptyState(title, sub) {
    return '<div class="table-empty">' + ico('file', 34) + '<div><b>' + esc(title) + '</b></div><div class="small muted" style="margin-top:4px">' + esc(sub) + '</div></div>';
  }

  /* ----------------------------------------------------------- APPLICATIONS */
  function viewApplications() {
    var cfg = S.data.settings, u = S.ui.apps;
    var statuses = cfg.statuses.map(function (s) { return s.label; });
    var cats = cfg.categories.map(function (c) { return c.name; });
    var h = '';
    if (S.data.analytics.overall.sample_present) {
      h += '<div class="banner banner-warn" style="padding:11px 15px"><div class="banner-icon" style="width:32px;height:32px">' + ico('alert') + '</div>' +
        '<div class="banner-text"><div class="banner-title" style="font-size:12.5px">Rows marked SAMPLE are fictional demo data</div></div>' +
        '<button class="btn btn-sm" data-action="clear-sample">Remove sample data</button></div>';
    }
    h += '<div class="card">' +
      '<div class="toolbar">' +
      '<div class="search">' + ico('search') + '<input class="input" id="apps-q" data-filter="q" placeholder="Search company, role, notes…" value="' + esc(u.q) + '"></div>' +
      '<select class="select" data-filter="status">' + opts(statuses, u.status, 'All statuses') + '</select>' +
      '<select class="select" data-filter="category">' + opts(cats, u.category, 'All categories') + '</select>' +
      '<select class="select" data-filter="resume">' + opts(cfg.resumes, u.resume, 'All resumes') + '</select>' +
      '<select class="select" data-filter="outcome">' + opts(['Pending', 'Rejected', 'Offer', 'Withdrawn', 'Closed'], u.outcome, 'All outcomes') + '</select>' +
      '<span class="toolbar-spacer"></span>' +
      '<span class="result-count" id="apps-count"></span>' +
      '<button class="btn btn-sm" data-action="clear-filters">Reset</button>' +
      '<button class="btn btn-sm btn-primary" data-action="add-application">' + ico('plus') + ' Add</button>' +
      '</div>' +
      '<div id="apps-table-wrap"></div>' +
      '</div>';
    return h;
  }

  function filteredApps() {
    var u = S.ui.apps, q = u.q.trim().toLowerCase();
    var statuses = {};
    S.data.settings.statuses.forEach(function (s) { statuses[s.label] = s.outcome; });
    var list = S.data.applications.filter(function (a) {
      if (u.status && a.status !== u.status) return false;
      if (u.category && a.category !== u.category) return false;
      if (u.resume && a.resume !== u.resume) return false;
      if (u.outcome && statuses[a.status] !== u.outcome) return false;
      if (q) {
        var hay = [a.company, a.title, a.category, a.location, a.notes, a.source, a.id].join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    var dir = u.dir, key = u.sort;
    list.sort(function (x, y) {
      var vx = x[key] || '', vy = y[key] || '';
      if (key === 'applied' || key === 'discovered') { vx = vx || '9999'; vy = vy || '9999'; }
      return (vx < vy ? -1 : vx > vy ? 1 : 0) * dir;
    });
    return list;
  }

  function renderAppsTable() {
    var wrap = $('#apps-table-wrap');
    if (!wrap) return;
    var u = S.ui.apps, list = filteredApps();
    var pages = Math.max(1, Math.ceil(list.length / u.per));
    u.page = Math.min(u.page, pages);
    var page = list.slice((u.page - 1) * u.per, u.page * u.per);
    var statusMap = {};
    S.data.settings.statuses.forEach(function (s) { statusMap[s.label] = s; });
    var stageName = ['', 'Applied', 'HR', 'Technical', 'Final', 'Offer'];
    var th = [
      ['company', 'Company / role'], ['category', 'Category'], ['applied', 'Applied'],
      ['status', 'Status'], ['resume', 'Resume'], ['tailored', 'Tailored'], ['age', 'Age']
    ];
    var head = '<thead><tr>' + th.map(function (t) {
      return '<th class="sortable" data-sort="' + t[0] + '">' + t[1] + (u.sort === t[0] ? (u.dir === -1 ? ' ↓' : ' ↑') : '') + '</th>';
    }).join('') + '<th></th></tr></thead>';
    var body = page.map(function (a) {
      var st = statusMap[a.status] || { outcome: 'Pending', stage: 1 };
      var age = a.applied ? Math.max(0, Math.round((new Date(S.data.analytics.meta.today) - new Date(a.applied)) / 86400000)) : null;
      return '<tr><td><div class="cell-company"><b>' + esc(a.company) + '</b><small>' + esc(a.title) +
        (a.is_sample ? ' · <span style="color:var(--amber)">SAMPLE</span>' : '') + '</small></div></td>' +
        '<td class="small">' + esc(a.category) + '</td>' +
        '<td class="nowrap small">' + shortDate(a.applied) + '</td>' +
        '<td>' + statusBadge(a.status, st.outcome, st.stage) + '</td>' +
        '<td class="small">' + esc(a.resume || '—') + '</td>' +
        '<td>' + (a.tailored === 'Yes' ? badge('Yes', 'good') : '<span class="muted small">No</span>') + '</td>' +
        '<td class="num small">' + (age == null ? '—' : age + 'd') + '</td>' +
        '<td><div class="row-actions">' +
        (a.url ? '<a class="btn btn-sm btn-icon btn-ghost" href="' + esc(a.url) + '" target="_blank" rel="noopener" title="Open job posting">' + ico('external') + '</a>' : '') +
        '<button class="btn btn-sm btn-icon btn-ghost" data-action="edit-application" data-id="' + esc(a.id) + '" title="Edit">' + ico('edit') + '</button>' +
        '<button class="btn btn-sm btn-icon btn-ghost" data-action="delete-application" data-id="' + esc(a.id) + '" title="Delete">' + ico('trash') + '</button>' +
        '</div></td></tr>';
    }).join('');
    wrap.innerHTML = (page.length ?
      '<div class="table-wrap"><table class="data">' + head + '<tbody>' + body + '</tbody></table></div>' :
      emptyState('No matching applications', 'Try clearing a filter or add a new application.')) +
      '<div class="pager"><span>Showing ' + (list.length ? ((u.page - 1) * u.per + 1) : 0) + '–' + Math.min(u.page * u.per, list.length) + ' of ' + list.length + ' applications</span>' +
      '<span class="flex"><button class="btn btn-sm" data-action="apps-page" data-delta="-1"' + (u.page <= 1 ? ' disabled' : '') + '>Previous</button>' +
      '<span style="padding:0 8px">Page ' + u.page + ' / ' + pages + '</span>' +
      '<button class="btn btn-sm" data-action="apps-page" data-delta="1"' + (u.page >= pages ? ' disabled' : '') + '>Next</button></span></div>';
    if ($('#apps-count')) $('#apps-count').textContent = list.length + ' applications';
  }

  /* -------------------------------------------------------------- DAILY LOG */
  function viewDaily() {
    var a = S.data.analytics, o = a.overall, hab = a.habit, m = a.meta;
    var days = a.habit.series.slice().reverse();
    var cfg = S.data.settings;
    var h = '';
    h += '<div class="kpi-grid mb">' +
      kpi({ label: 'Current streak', value: hab.current_streak, unit: 'days', icon: 'zap', color: 'amber', sub: 'Longest: ' + hab.longest_streak + ' days' }) +
      kpi({ label: 'Show-up rate', value: pct(hab.showup, 0), icon: 'heart', color: 'teal', sub: hab.active_days + ' active of ' + hab.elapsed + ' days' }) +
      kpi({ label: 'Daily application target', value: pct(o.target_pct, 0), icon: 'target', color: 'primary',
            sub: o.target_days + ' target days · time goal hit on ' + hab.minutes_target_days + ' days' }) +
      kpi({ label: 'This week', value: hab.week_applications + '<span class="unit">/ ' + m.weekly_target + ' apps</span>', icon: 'clock', color: 'blue',
            sub: hab.week_active_days + ' / ' + m.weekly_days_target + ' active-day goal · ' + num(hab.week_minutes) + ' min' }) +
      '</div>';
    h += '<div class="grid g2 mb">' +
      card('Consistency heatmap', 'Every shaded square is a day you showed up.', heatmapHtml(a)) +
      card('Weekly applications vs target', 'The dashed line is your weekly target.', '<div id="ch-weekly2"></div>') +
      '</div>';
    h += '<div class="card">' +
      '<div class="toolbar"><div><b style="font-size:13px">Activity log</b><div class="small muted">Grey columns are calculated from your Applications — no double entry.</div></div>' +
      '<span class="toolbar-spacer"></span>' +
      '<button class="btn btn-sm btn-primary" data-action="add-day">' + ico('plus') + ' Log today</button></div>' +
      '<div class="table-wrap"><table class="data"><thead><tr><th>Date</th><th>Day</th><th class="num">Found</th>' +
      '<th class="num" title="Auto from Applications">Apps*</th><th class="num" title="Auto">Tailored*</th><th class="num" title="Auto">Letters*</th>' +
      '<th class="num" title="Auto">Interviews*</th><th class="num">Follow-ups</th><th class="num">Messages</th>' +
      '<th class="num">Minutes</th><th>Notes</th><th></th></tr></thead><tbody>' +
      days.slice(0, S.ui.daysPage).map(function (d) {
        var dt = new Date(d.date + 'T00:00:00');
        return '<tr><td class="nowrap small strong">' + fullDate(d.date) + '</td>' +
          '<td class="small muted">' + dt.toLocaleDateString(undefined, { weekday: 'short' }) + '</td>' +
          '<td class="num">' + d.discovered + '</td>' +
          '<td class="num"><b>' + d.apps + '</b></td>' +
          '<td class="num muted">' + d.tailored + '</td>' +
          '<td class="num muted">' + d.covers + '</td>' +
          '<td class="num muted">' + d.interviews + '</td>' +
          '<td class="num">' + d.followups + '</td>' +
          '<td class="num">' + d.messages + '</td>' +
          '<td class="num">' + d.minutes + '</td>' +
          '<td class="small muted" style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(d.notes || '—') + '</td>' +
          '<td><button class="btn btn-sm btn-icon btn-ghost" data-action="edit-day" data-date="' + d.date + '" title="Edit">' + ico('edit') + '</button></td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="pager"><span>Last ' + Math.min(S.ui.daysPage, days.length) + ' days · * automatically calculated</span>' +
      '<button class="btn btn-sm" data-action="more-days">Show more</button></div></div>';
    return h;
  }

  /* ------------------------------------------------------------ FUNNEL VIEW */
  function viewFunnel() {
    var a = S.data.analytics, m = a.meta;
    var h = cohortBar();
    h += '<div class="grid g2 mb">' +
      card('Stage conversion rates', 'How applications progress through recruitment. These are NOT failure rates.', funnelBars(a.funnel), '',
        '', 'Numerator ÷ eligible denominator. Pending applications are not failures.') +
      card('Explicit rejection rates', 'Share of applications that END at each stage — different denominators.', rejectionTable(a.rejections), '') +
      '</div>';
    h += '<div class="grid g2 mb">' +
      card('Funnel conversion over time', 'Monthly application cohorts · rates are per stage', '<div id="ch-monthly"></div>') +
      card('Stage timing', 'Average calendar days between stage dates',
        '<div>' + a.timing.map(function (t) {
          return '<div class="stat-row"><span>' + esc(t.label) + '<div class="tiny muted">' + esc(t.definition) + '</div></span>' +
            '<b style="font-size:16px">' + (t.days == null ? '—' : t.days + ' d') + '</b></div>';
        }).join('') + '</div>' +
        '<div class="callout" style="margin-top:14px">' + ico('info') + ' Only applications with both dates filled are included (n shown in the Funnel view). Blank stage dates are ignored, not treated as zero.</div>') +
      '</div>';
    h += '<div class="card"><div class="card-head"><div><h3 class="card-title">Rejection rate denominators</h3>' +
      '<p class="card-sub">Read the denominator before comparing any two rates.</p></div></div>' +
      '<div class="card-body"><div class="table-wrap"><table class="data"><thead><tr><th>Metric</th><th>Rejections</th><th>Denominator</th><th>Rate</th><th>Mature rate</th><th>Definition</th></tr></thead><tbody>' +
      a.rejections.map(function (r) {
        return '<tr><td class="strong">' + esc(r.label) + '</td><td class="num">' + r.num + '</td><td class="num">' + r.den + '</td>' +
          '<td class="num"><b>' + pct(r.rate) + '</b></td><td class="num">' + pct(r.mrate) + '</td>' +
          '<td class="small muted" style="max-width:340px">' + esc(r.definition) + '</td></tr>';
      }).join('') + '</tbody></table></div></div></div>';
    return h;
  }

  function rejectionTable(rej) {
    return '<div>' + rej.map(function (r) {
      var w = Math.max(2, (r.rate || 0) * 100);
      var c = r.label.indexOf('resume') >= 0 || r.label.indexOf('Resume') >= 0 ? 'rose' : 'amber';
      return '<div class="funnel-item"><div class="funnel-head"><span class="funnel-name">' + esc(r.label) +
        '</span><span class="funnel-rate">' + pct(r.rate) + '</span></div>' +
        '<div class="funnel-track"><div class="funnel-fill" style="width:' + w + '%;background:linear-gradient(90deg,var(--' + c + '),color-mix(in srgb,var(--' + c + ') 60%,var(--surface)))"></div></div>' +
        '<div class="funnel-meta"><span>' + r.num + ' of ' + r.den + '</span><span>Mature <b>' + pct(r.mrate) + '</b></span></div></div>';
    }).join('') + '</div>';
  }

  /* --------------------------------------------------------- CATEGORY VIEW */
  function viewCategories() {
    var a = S.data.analytics, cats = a.categories, m = a.meta;
    var h = cohortBar();
    h += '<div class="grid g2 mb">' +
      card('Response rate by category', 'Only categories with n ≥ ' + m.min_sample + ' are reliable', '<div id="ch-cat-response"></div>', '',
        '', 'Sending more applications is not the same as getting more responses.') +
      card('Rejection distribution by category', 'Counts of explicit rejections at each stage', '<div id="ch-cat-rejections"></div>') +
      '</div>';
    h += '<div class="card"><div class="card-head"><div><h3 class="card-title">All categories</h3>' +
      '<p class="card-sub">Primary and secondary targets are compared on equal terms. Low-n rows are hints, not conclusions.</p></div></div>' +
      '<div class="card-body"><div class="table-wrap"><table class="data"><thead><tr>' +
      '<th>Category</th><th>Tier</th><th class="num">n</th><th class="num">Responses</th><th class="num">Resp. rate</th>' +
      '<th class="num">HR rate</th><th class="num">Tech rate</th><th class="num">Offer rate</th>' +
      '<th class="num">Resume rej.</th><th class="num">HR rej.</th><th class="num">Tech rej.</th><th class="num">Final rej.</th>' +
      '<th class="num">Avg days</th><th>Evidence</th></tr></thead><tbody>' +
      cats.map(function (c) {
        return '<tr><td class="strong">' + esc(c.label) + '</td><td>' + badge(c.tier, c.tier === 'Primary' ? 'primary' : 'secondary') + '</td>' +
          '<td class="num"><b>' + c.n + '</b></td><td class="num">' + c.responses + '</td>' +
          '<td class="num"><b>' + pct(c.response_rate) + '</b></td><td class="num">' + pct(c.hr_rate) + '</td>' +
          '<td class="num">' + pct(c.tech_rate) + '</td><td class="num">' + pct(c.offer_rate) + '</td>' +
          '<td class="num">' + c.rej_resume + '</td><td class="num">' + c.rej_hr + '</td>' +
          '<td class="num">' + c.rej_technical + '</td><td class="num">' + c.rej_final + '</td>' +
          '<td class="num">' + (c.avg_days == null ? '—' : c.avg_days) + '</td>' +
          '<td>' + badge(c.n >= m.min_sample ? 'OK' : 'Low n', c.n >= m.min_sample ? 'good' : 'low') + '</td></tr>';
      }).join('') + '</tbody></table></div></div></div>';
    return h;
  }

  /* ---------------------------------------------------------- STRATEGY VIEW */
  function viewStrategy() {
    var a = S.data.analytics, st = a.strategy, m = a.meta;
    var keys = ['resume', 'tailored', 'cover', 'referral', 'source', 'seniority', 'arrangement', 'location'];
    var h = cohortBar();
    h += '<div class="callout mb" style="display:flex;gap:10px;align-items:flex-start">' + ico('info', 16) +
      '<div>Every comparison shows its sample size. Rows with fewer than <b>' + m.min_sample +
      '</b> applications are flagged — a few percentage points at small n is noise, not evidence.</div></div>';
    h += '<div class="grid g2">';
    keys.forEach(function (k) {
      var b = st[k], rows = b.rows;
      var maxRate = Math.max.apply(Math, rows.map(function (r) { return r.response_rate || 0; }).concat([0.01]));
      var yes = rows.filter(function (r) { return r.label === 'Yes'; })[0];
      var no = rows.filter(function (r) { return r.label === 'No'; })[0];
      var lift = '';
      if (yes && no && yes.response_rate != null && no.response_rate != null) {
        var diff = yes.response_rate - no.response_rate;
        lift = '<div class="callout ' + (diff > 0 ? 'teal' : '') + '" style="margin-top:12px">Response-rate difference with vs without: <b>' +
          (diff >= 0 ? '+' : '') + (diff * 100).toFixed(1) + ' pp</b> (n=' + yes.n + ' vs ' + no.n + ')</div>';
      }
      var body = '<div class="table-wrap"><table class="data"><thead><tr><th>Option</th><th class="num">n</th>' +
        '<th style="min-width:130px">Response rate</th><th class="num">HR</th><th class="num">Tech</th><th class="num">Offer</th><th>Evidence</th></tr></thead><tbody>' +
        rows.map(function (r) {
          var w = Math.max(2, ((r.response_rate || 0) / maxRate) * 100);
          return '<tr><td class="strong nowrap">' + esc(r.label) + '</td><td class="num"><b>' + r.n + '</b></td>' +
            '<td><div class="flex" style="gap:8px"><div class="progress" style="flex:1;min-width:60px"><div class="progress-fill" style="width:' + w + '%"></div></div>' +
            '<span class="small" style="min-width:38px;text-align:right">' + pct(r.response_rate, 0) + '</span></div></td>' +
            '<td class="num">' + pct(r.hr_rate, 0) + '</td><td class="num">' + pct(r.tech_rate, 0) + '</td>' +
            '<td class="num">' + pct(r.offer_rate, 0) + '</td>' +
            '<td>' + badge(r.evidence === 'Reasonable' ? 'OK' : (r.evidence === 'Early signal' ? 'Early' : 'Low n'),
              r.evidence === 'Reasonable' ? 'good' : (r.evidence === 'Early signal' ? 'primary' : 'low')) + '</td></tr>';
        }).join('') + '</tbody></table></div>' + lift;
      h += card(b.title, b.substring ? 'Editable labels · substring match on location' :
        'Sample sizes and conversion rates · cohort filtered', body);
    });
    h += '</div>';
    return h;
  }

  /* ---------------------------------------------------------- INSIGHTS VIEW */
  function viewInsights() {
    var a = S.data.analytics, list = a.insights;
    var h = '<div class="callout mb" style="display:flex;gap:10px;align-items:flex-start">' + ico('bulb', 16) +
      '<div>These are <b>hypotheses, not verdicts</b>. Each line states its sample size and evidence strength. Change one variable at a time and re-check after 2–3 weeks.</div></div>';
    h += '<div class="grid g3">' + list.map(function (i) {
      return '<div class="insight-card ' + i.tone + '">' +
        '<div class="insight-head"><span class="insight-topic">' + esc(i.topic) + '</span>' +
        badge(i.evidence.replace('Insufficient data', 'Low n'), i.evidence === 'Reasonable' ? 'good' : (i.evidence === 'Early signal' ? 'primary' : 'low')) + '</div>' +
        '<div class="insight-obs">' + esc(i.observation) + '</div>' +
        '<div class="insight-exp">' + ico('spark') + '<span>' + esc(i.experiment) + '</span></div>' +
        '<div class="insight-foot">' + ico('users') + ' n = ' + i.n + ' · minimum reliable n = ' + a.meta.min_sample + '</div></div>';
    }).join('') + '</div>';
    return h;
  }

  /* ---------------------------------------------------------- SETTINGS VIEW */
  function viewSettings() {
    var cfg = S.data.settings, t = cfg.targets, m = S.data.analytics.meta;
    var h = '<div class="between mb"><div><div class="small muted">Everything here is stored locally in SQLite on your machine.</div></div>' +
      '<button class="btn btn-primary" data-action="save-settings">' + ico('save') + ' Save all changes</button></div>';
    h += '<div class="settings-layout"><div>';

    // targets
    h += card('Targets & thresholds', 'Change these and every metric recalculates immediately.',
      '<div class="targets-grid">' +
      tField('Daily application target', 'daily_apps', t.daily_apps, 'Days with at least this many applications count as on target.') +
      tField('Daily minutes target', 'daily_minutes', t.daily_minutes, 'Daily effort target in minutes.') +
      tField('Weekly application target', 'weekly_apps', t.weekly_apps, 'Used by the weekly completion chart.') +
      tField('Weekly active-day target', 'weekly_days', t.weekly_days, 'How many days a week you aim to show up.') +
      tField('No-response threshold (days)', 'no_response_days', t.no_response_days, 'Pending applications older than this are flagged — never counted as rejections.') +
      tField('Maturity window (days)', 'maturity_days', t.maturity_days, 'Green funnel rates only use applications at least this old.') +
      tField('Minimum sample size (n)', 'min_sample', t.min_sample, 'Comparisons below this are labelled insufficient evidence.') +
      tField('Follow-up lead (days)', 'followup_lead', t.followup_lead, 'Highlight a follow-up this many days before it is due.') +
      '<div class="field"><label>Job-search start date</label><input class="input" type="date" data-target="start_date" value="' + esc(t.start_date) + '"><span class="hint">Drives the daily log date range.</span></div>' +
      '</div>');

    // categories
    h += '<div class="mt">' + card('Job categories', 'Add, remove or rename. The Applications dropdown and category table update automatically.',
      '<div id="cat-editor" class="list-editor">' + cfg.categories.map(function (c, i) {
        return '<div class="list-row" data-cat-row><input class="input" data-cat-name value="' + esc(c.name) + '" placeholder="Category name">' +
          '<select class="select" data-cat-tier>' + opts(['Primary', 'Secondary'], c.tier) + '</select>' +
          '<button class="btn btn-icon btn-ghost" data-action="remove-cat" data-index="' + i + '" title="Remove">' + ico('trash') + '</button></div>';
      }).join('') + '</div>' +
      '<button class="btn btn-sm mt" data-action="add-cat">' + ico('plus') + ' Add category</button>');
    h += '</div>';

    // statuses
    h += '<div class="mt">' + card('Application statuses', 'The mapping columns drive every funnel and rejection metric — keep them filled in.',
      '<div class="status-head"><span>Status label</span><span>Stage 1–5</span><span>Outcome class</span><span>Rejection stage</span><span></span></div>' +
      '<div id="status-editor" class="list-editor">' + cfg.statuses.map(function (s, i) {
        return '<div class="status-row" data-status-row>' +
          '<input class="input" data-st-label value="' + esc(s.label) + '">' +
          '<input class="input" type="number" min="1" max="5" data-st-stage value="' + esc(s.stage) + '">' +
          '<select class="select" data-st-outcome>' + opts(['Pending', 'Rejected', 'Offer', 'Withdrawn', 'Closed'], s.outcome) + '</select>' +
          '<select class="select" data-st-rejection>' + opts(['Resume screening', 'HR', 'Technical', 'Final'], s.rejection || '', '—') + '</select>' +
          '<button class="btn btn-icon btn-ghost" data-action="remove-status" data-index="' + i + '" title="Remove">' + ico('trash') + '</button></div>';
      }).join('') + '</div>' +
      '<button class="btn btn-sm mt" data-action="add-status">' + ico('plus') + ' Add status</button>' +
      '<div class="setting-note">Stage: 1=Applied, 2=HR, 3=Technical, 4=Final, 5=Offer. Only <b>Pending</b> is still in play; only <b>Rejected</b> is an explicit rejection. "Closed" means no employer reply.</div>');
    h += '</div>';

    // dropdown lists
    h += '<div class="mt">' + card('Dropdown values', 'One value per line. Blank lines are ignored.',
      '<div class="form-grid two">' +
      textList('Resume versions', 'resumes', cfg.resumes) +
      textList('Job sources', 'sources', cfg.sources) +
      textList('Seniority levels', 'seniority', cfg.seniority) +
      textList('Work arrangements', 'arrangements', cfg.arrangements) +
      textList('Location labels (substring match)', 'locations', cfg.locations) +
      '</div>');
    h += '</div></div>';

    // right column
    h += '<div>';
    h += card('Data management', 'Your data lives in ./data/jobsearch.db and is never sent anywhere.',
      '<div class="data-action"><div><b>Export backup</b><span>Download all applications, logs and settings as JSON.</span></div>' +
      '<a class="btn btn-sm" href="/api/export" download>' + ico('download') + ' Export</a></div>' +
      '<div class="data-action"><div><b>Import backup</b><span>Replace all data with a previously exported JSON file.</span></div>' +
      '<button class="btn btn-sm" data-action="import">' + ico('upload') + ' Import</button></div>' +
      '<div class="data-action"><div><b>Remove sample data</b><span>Deletes only the fictional demo rows. Safe to run after entering real data.</span></div>' +
      '<button class="btn btn-sm" data-action="clear-sample">Remove</button></div>' +
      '<div class="data-action"><div><b>Reload sample data</b><span>Re-insert the demo records for exploration.</span></div>' +
      '<button class="btn btn-sm" data-action="load-sample">Load</button></div>' +
      '<div class="data-action"><div><b>Reset everything</b><span>Wipe all data and restore the original demo state.</span></div>' +
      '<button class="btn btn-sm btn-danger" data-action="reset">' + ico('trash') + ' Reset</button></div>' +
      '<input type="file" id="import-file" accept="application/json,.json" style="display:none">');
    h += '<div class="mt">' + card('Metric glossary', 'The important definitions, in plain language.',
      '<div style="font-size:12px;line-height:1.65;color:var(--ink-2)">' +
      glossaryItem('Pending', 'Status class = Pending. Neither a success nor a failure.') +
      glossaryItem('Known outcome', 'Rejected + Offer + Withdrawn + Closed. Denominator for overall rejection rates.') +
      glossaryItem('Response', 'An interview invitation, an explicit rejection or an offer. Silence is not a response.') +
      glossaryItem('Stage 1–5', 'Furthest stage reached. Preserves history even after a later rejection.') +
      glossaryItem('Conversion rate', 'Reached next stage ÷ reached current stage. Measures progression.') +
      glossaryItem('Rejection rate', 'Share ending at a stage, using a stage-specific denominator.') +
      glossaryItem('Mature cohort', 'Applications at least N days old — fairer comparison of strategy over time.') +
      glossaryItem('Show-up rate', 'Active days ÷ elapsed days. The core habit metric.') +
      '</div>');
    h += '</div>';
    h += '<div class="mt">' + card('About', 'Hirepath · Job Search OS',
      '<div class="small muted" style="line-height:1.7">A private, self-hosted tracker. Python standard library + SQLite on the backend, zero dependencies on the frontend. Built for consistency over intensity, quality and quantity, and honest analytics.</div>' +
      '<div class="divider"></div><div class="small muted">Server date: ' + fullDate(m.today) + ' · Database: <code>data/jobsearch.db</code></div>');
    h += '</div></div></div>';
    return h;
  }

  function tField(label, key, val, hint) {
    return '<div class="field"><label>' + esc(label) + '</label>' +
      '<input class="input" type="number" min="0" data-target="' + key + '" value="' + esc(val) + '">' +
      '<span class="hint">' + esc(hint) + '</span></div>';
  }
  function textList(label, key, values) {
    return '<div class="field span2"><label>' + esc(label) + ' <span class="opt">(one per line)</span></label>' +
      '<textarea class="input" rows="5" data-list="' + key + '">' + esc((values || []).join('\n')) + '</textarea></div>';
  }
  function glossaryItem(t, d) {
    return '<div style="margin-bottom:9px"><b>' + esc(t) + '</b> — ' + esc(d) + '</div>';
  }

  /* ------------------------------------------------------------ chart mount */
  function afterRender() {
    renderAppsTable();
    var a = S.data.analytics, t = a.trends;
    if (S.view === 'overview') {
      var d = t.daily;
      Charts.line('#ch-daily', {
        labels: d.map(function (x) { return shortDate(x.date); }), height: 230,
        series: [
          { name: 'Applications / day', color: colorVar('--primary') || '#4f46e5', data: d.map(function (x) { return x.apps; }) },
          { name: '7-day average', color: colorVar('--teal') || '#0d9b86', data: d.map(function (x) { return x.avg7; }), fill: false, dash: true, width: 2 }
        ]
      });
      Charts.bar('#ch-weekly', {
        labels: t.weekly.map(function (w) { return w.label; }), height: 200,
        series: [{ name: 'Applications', color: colorVar('--primary') || '#4f46e5', data: t.weekly.map(function (w) { return w.apps; }) }],
        target: a.meta.weekly_target
      });
      Charts.line('#ch-activity', {
        labels: t.weekly.map(function (w) { return w.label; }), height: 200,
        series: [
          { name: 'Applications', color: colorVar('--primary') || '#4f46e5', data: t.weekly.map(function (w) { return w.apps; }) },
          { name: 'HR invitations', color: colorVar('--blue') || '#3b82f6', data: t.weekly.map(function (w) { return w.hr; }), fill: false },
          { name: 'Offers', color: colorVar('--teal') || '#0d9b86', data: t.weekly.map(function (w) { return w.offers; }), fill: false }
        ]
      });
      var rr = a.rejections;
      var stageCounts = {
        'Resume screen': rr[0].num, 'HR': rr[1].num, 'Technical': rr[2].num, 'Final': rr[3].num
      };
      Charts.donut('#ch-donut', {
        items: [
          { label: 'Resume screen', value: stageCounts['Resume screen'], color: colorVar('--rose') || '#dc5b71' },
          { label: 'HR', value: stageCounts.HR, color: colorVar('--amber') || '#dc9630' },
          { label: 'Technical', value: stageCounts.Technical, color: colorVar('--blue') || '#3b82f6' },
          { label: 'Final', value: stageCounts.Final, color: colorVar('--violet') || '#8b5cf6' }
        ], centerLabel: 'explicit rejections'
      });
    }
    if (S.view === 'daily') {
      Charts.bar('#ch-weekly2', {
        labels: t.weekly.map(function (w) { return w.label; }), height: 210,
        series: [{ name: 'Applications', color: colorVar('--primary') || '#4f46e5', data: t.weekly.map(function (w) { return w.apps; }) }],
        target: a.meta.weekly_target
      });
    }
    if (S.view === 'funnel') {
      Charts.line('#ch-monthly', {
        labels: t.monthly.map(function (x) { return x.label; }), height: 230, percent: true,
        series: [
          { name: 'App → HR', color: colorVar('--primary') || '#4f46e5', data: t.monthly.map(function (x) { return x.app_hr; }) },
          { name: 'HR → Tech', color: colorVar('--blue') || '#3b82f6', data: t.monthly.map(function (x) { return x.hr_tech; }), fill: false },
          { name: 'Tech → Final', color: colorVar('--amber') || '#dc9630', data: t.monthly.map(function (x) { return x.tech_final; }), fill: false },
          { name: 'Final → Offer', color: colorVar('--teal') || '#0d9b86', data: t.monthly.map(function (x) { return x.final_offer; }), fill: false }
        ]
      });
    }
    if (S.view === 'categories') {
      Charts.bar('#ch-cat-response', {
        labels: a.categories.map(function (c) { return c.label.length > 15 ? c.label.slice(0, 14) + '…' : c.label; }),
        height: 260, percent: true,
        series: [{ name: 'Response rate', color: colorVar('--primary') || '#4f46e5', data: a.categories.map(function (c) { return c.response_rate || 0; }) }]
      });
      Charts.bar('#ch-cat-rejections', {
        labels: a.categories.map(function (c) { return c.label.length > 15 ? c.label.slice(0, 14) + '…' : c.label; }),
        height: 260, stacked: true,
        series: [
          { name: 'Resume', color: colorVar('--rose') || '#dc5b71', data: a.categories.map(function (c) { return c.rej_resume; }) },
          { name: 'HR', color: colorVar('--amber') || '#dc9630', data: a.categories.map(function (c) { return c.rej_hr; }) },
          { name: 'Technical', color: colorVar('--blue') || '#3b82f6', data: a.categories.map(function (c) { return c.rej_technical; }) },
          { name: 'Final', color: colorVar('--violet') || '#8b5cf6', data: a.categories.map(function (c) { return c.rej_final; }) }
        ]
      });
    }
  }

  /* ----------------------------------------------------------------- modals */
  function openModal(html, size) {
    $('#modal-root').innerHTML = '<div class="modal-backdrop" data-action="backdrop"><div class="modal ' + (size || '') + '">' + html + '</div></div>';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() { $('#modal-root').innerHTML = ''; document.body.style.overflow = ''; S.modal = null; }
  function modalHead(title, sub) {
    return '<div class="modal-head"><div><h2>' + esc(title) + '</h2>' + (sub ? '<p>' + esc(sub) + '</p>' : '') + '</div>' +
      '<button class="btn btn-icon btn-ghost" data-action="close-modal">' + ico('x') + '</button></div>';
  }

  function appModal(id) {
    var rec = id ? S.data.applications.filter(function (a) { return a.id === id; })[0] : null;
    var cfg = S.data.settings;
    var d = rec || {
      id: '', company: '', title: '', category: cfg.categories[0] ? cfg.categories[0].name : '',
      seniority: 'Junior', location: '', arrangement: 'Remote', url: '', source: 'LinkedIn',
      discovered: S.data.analytics.meta.today, applied: S.data.analytics.meta.today,
      status: cfg.statuses[0] ? cfg.statuses[0].label : '', followup: '', notes: '',
      resume: cfg.resumes[cfg.resumes.length - 1] || '', cover: 'No', referral: 'No', tailored: 'No'
    };
    var f = function (name, label, type, extra) {
      return '<div class="field ' + (extra && extra.span ? 'span' + extra.span : '') + '"><label>' + esc(label) + '</label>' +
        '<input class="input" type="' + (type || 'text') + '" name="' + name + '" value="' + esc(d[name] || '') + '"' +
        (extra && extra.placeholder ? ' placeholder="' + esc(extra.placeholder) + '"' : '') + '></div>';
    };
    var sel = function (name, label, list, blank) {
      return '<div class="field"><label>' + esc(label) + '</label><select class="select" name="' + name + '">' +
        opts(list, d[name], blank) + '</select></div>';
    };
    var body =
      '<div class="form-section"><h3>Job information</h3><div class="form-grid">' +
      f('company', 'Company name', 'text', { span: 1 }) +
      f('title', 'Job title', 'text', { span: 2 }) +
      sel('category', 'Job category', cfg.categories.map(function (c) { return c.name; }), '—') +
      sel('seniority', 'Seniority', cfg.seniority, '—') +
      f('location', 'Location / country') +
      sel('arrangement', 'Remote / hybrid / onsite', cfg.arrangements, '—') +
      sel('source', 'Where you found it', cfg.sources, '—') +
      f('url', 'Job posting URL', 'url', { span: 2, placeholder: 'https://…' }) +
      '</div></div>' +
      '<div class="form-section"><h3>Application</h3><div class="form-grid">' +
      f('discovered', 'Date discovered', 'date') +
      f('applied', 'Date applied', 'date') +
      sel('status', 'Current status', cfg.statuses.map(function (s) { return s.label; }), '—') +
      sel('resume', 'Resume version', cfg.resumes, '—') +
      f('followup', 'Next follow-up date', 'date') +
      '<div class="field"><label>Strategy flags</label><div class="check-grid">' +
      ['tailored', 'cover', 'referral'].map(function (k) {
        var labels = { tailored: 'Tailored', cover: 'Cover letter', referral: 'Referral' };
        return '<label class="check-pill ' + (d[k] === 'Yes' ? 'on' : '') + '"><input type="checkbox" name="' + k + '"' +
          (d[k] === 'Yes' ? ' checked' : '') + '> ' + labels[k] + '</label>';
      }).join('') + '</div></div>' +
      '</div></div>' +
      '<div class="form-section"><h3>Timeline — stage dates (optional but powerful)</h3><div class="form-grid">' +
      f('hr_invited', 'HR invited', 'date') + f('hr_completed', 'HR completed', 'date') +
      f('tech_invited', 'Tech invited', 'date') + f('tech_completed', 'Tech completed', 'date') +
      f('final_invited', 'Final invited', 'date') + f('final_completed', 'Final completed', 'date') +
      f('offer_date', 'Offer received', 'date') + f('closed_date', 'Outcome / closed', 'date') +
      '</div><div class="setting-note">Invitation vs completed dates let the funnel distinguish an invitation from an interview you actually attended. Stage dates also preserve history after a later rejection.</div></div>' +
      '<div class="form-section"><h3>Notes</h3><div class="form-grid"><div class="field span3">' +
      '<textarea class="input" name="notes" rows="3" placeholder="Feedback, contacts, lessons learned…">' + esc(d.notes || '') + '</textarea></div></div></div>';
    openModal(modalHead(rec ? 'Edit application' : 'Add application',
      rec ? esc(rec.company) + ' · ' + rec.id : 'One row per application. Only the white fields are stored.') +
      '<form id="app-form"><div class="modal-body">' + body + '</div>' +
      '<div class="modal-foot">' +
      (rec ? '<button type="button" class="btn btn-danger" data-action="delete-application" data-id="' + esc(rec.id) + '">' + ico('trash') + ' Delete</button>' : '') +
      '<span style="flex:1"></span>' +
      '<button type="button" class="btn" data-action="close-modal">Cancel</button>' +
      '<button type="submit" class="btn btn-primary">' + ico('check') + ' Save application</button></div></form>');
    $('#app-form').addEventListener('submit', saveAppForm);
    $$('.check-pill input').forEach(function (el) {
      el.addEventListener('change', function () { el.parentNode.classList.toggle('on', el.checked); });
    });
  }

  async function saveAppForm(e) {
    e.preventDefault();
    var form = e.target, fd = new FormData(form);
    var rec = {};
    fd.forEach(function (v, k) { rec[k] = v; });
    ['tailored', 'cover', 'referral'].forEach(function (k) { rec[k] = fd.get(k) ? 'Yes' : 'No'; });
    var id = $('#app-form').dataset.editId;
    try {
      if (id) await api('/api/applications/' + encodeURIComponent(id), { method: 'PUT', body: JSON.stringify(rec) });
      else await api('/api/applications', { method: 'POST', body: JSON.stringify(rec) });
      closeModal(); toast(id ? 'Application updated' : 'Application added');
      await refresh();
      if (S.view !== 'applications') { S.view = 'applications'; render(); }
    } catch (err) { toast(err.message, true); }
  }

  function dayModal(date) {
    var rec = S.data.daily_log.filter(function (d) { return d.date === date; })[0] || {};
    var a = S.data.analytics.habit.series.filter(function (d) { return d.date === date; })[0] || {};
    var field = function (name, label, val, type) {
      return '<div class="field"><label>' + esc(label) + '</label><input class="input" type="' + (type || 'number') +
        '" min="0" name="' + name + '" value="' + esc(val == null ? 0 : val) + '"></div>';
    };
    var body = '<div class="form-grid">' +
      '<div class="field"><label>Date</label><input class="input" type="date" name="date" value="' + esc(date) + '"></div>' +
      field('discovered', 'New positions discovered', rec.discovered) +
      field('followups', 'Follow-ups sent', rec.followups) +
      field('messages', 'Recruiter / networking messages', rec.messages) +
      field('minutes', 'Time spent (minutes)', rec.minutes) +
      '</div>' +
      '<div class="form-section mt"><h3>Automatically calculated from Applications</h3>' +
      '<div class="readonly-box"><span>Applications <b>' + (a.apps || 0) + '</b></span>' +
      '<span>Tailored <b>' + (a.tailored || 0) + '</b></span><span>Cover letters <b>' + (a.covers || 0) + '</b></span>' +
      '<span>Interviews <b>' + (a.interviews || 0) + '</b></span></div>' +
      '<div class="setting-note">You never have to type these twice. A day with zero applications still counts as active if you log sourcing, messages, minutes or a note.</div></div>' +
      '<div class="form-section mt"><h3>Notes &amp; lessons learned</h3><div class="form-grid"><div class="field span3">' +
      '<textarea class="input" name="notes" rows="3" placeholder="What did you learn today?">' + esc(rec.notes || '') + '</textarea></div></div></div>';
    openModal(modalHead('Log activity', fullDate(date)) +
      '<form id="day-form"><div class="modal-body">' + body + '</div>' +
      '<div class="modal-foot"><button type="button" class="btn" data-action="close-modal">Cancel</button>' +
      '<button type="submit" class="btn btn-primary">' + ico('check') + ' Save day</button></div></form>', 'md');
    $('#day-form').addEventListener('submit', saveDayForm);
  }

  async function saveDayForm(e) {
    e.preventDefault();
    var fd = new FormData(e.target), rec = {};
    fd.forEach(function (v, k) { rec[k] = v; });
    try {
      await api('/api/daily-log', { method: 'POST', body: JSON.stringify(rec) });
      closeModal(); toast('Daily log saved'); await refresh();
    } catch (err) { toast(err.message, true); }
  }

  function cohortModal() {
    openModal(modalHead('Cohort filter', 'Compare applications that had a similar amount of time to progress.') +
      '<form id="cohort-form"><div class="modal-body"><div class="form-grid two">' +
      '<div class="field"><label>From date <span class="opt">(blank = all)</span></label><input class="input" type="date" name="from" value="' + esc(S.cohort.from) + '"></div>' +
      '<div class="field"><label>To date <span class="opt">(blank = today)</span></label><input class="input" type="date" name="to" value="' + esc(S.cohort.to) + '"></div>' +
      '</div><div class="callout mt">' + ico('info') + ' Recent applications have not had time to get a reply. Use a historical range, or rely on the green <b>mature cohort</b> rates, to judge whether your strategy is improving. The maturity window is set in Settings.</div>' +
      '</div><div class="modal-foot"><button type="button" class="btn" data-action="cohort-clear">Clear filter</button>' +
      '<button type="button" class="btn" data-action="close-modal">Cancel</button>' +
      '<button type="submit" class="btn btn-primary">Apply filter</button></div></form>', 'sm');
    $('#cohort-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(e.target);
      S.cohort = { from: fd.get('from') || '', to: fd.get('to') || '' };
      closeModal(); refresh();
    });
  }

  function confirmModal(title, message, action, payload, danger) {
    openModal(modalHead(title, '') + '<div class="modal-body"><div class="callout" style="font-size:13px;line-height:1.7">' + esc(message) + '</div></div>' +
      '<div class="modal-foot"><button class="btn" data-action="close-modal">Cancel</button>' +
      '<button class="btn ' + (danger ? 'btn-danger' : 'btn-primary') + '" data-action="' + action + '"' +
      (payload ? ' data-id="' + esc(payload) + '"' : '') + '>Confirm</button></div>', 'sm');
  }

  /* ------------------------------------------------------------ settings IO */
  function collectSettings() {
    var cfg = JSON.parse(JSON.stringify(S.data.settings));
    $$('[data-target]').forEach(function (el) {
      var k = el.dataset.target;
      cfg.targets[k] = (el.type === 'number') ? Number(el.value || 0) : el.value;
    });
    cfg.categories = $$('#cat-editor [data-cat-row]').map(function (row) {
      return { name: $('[data-cat-name]', row).value.trim(), tier: $('[data-cat-tier]', row).value };
    }).filter(function (c) { return c.name; });
    cfg.statuses = $$('#status-editor [data-status-row]').map(function (row) {
      return {
        label: $('[data-st-label]', row).value.trim(),
        stage: Math.max(1, Math.min(5, Number($('[data-st-stage]', row).value || 1))),
        outcome: $('[data-st-outcome]', row).value,
        rejection: $('[data-st-rejection]', row).value,
        response: $('[data-st-outcome]', row).value !== 'Pending'
      };
    }).filter(function (s) { return s.label; });
    $$('[data-list]').forEach(function (el) {
      cfg[el.dataset.list] = el.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    });
    return cfg;
  }

  async function saveSettings() {
    try {
      var cfg = collectSettings();
      await api('/api/settings', { method: 'PUT', body: JSON.stringify({ settings: cfg }) });
      toast('Settings saved'); await refresh();
    } catch (err) { toast(err.message, true); }
  }

  /* -------------------------------------------------------------- events */
  function bindEvents() {
    document.addEventListener('click', async function (e) {
      var el = e.target.closest('[data-action]');
      if (!el) return;
      var act = el.dataset.action;
      if (act === 'backdrop') { if (e.target === el) closeModal(); return; }
      switch (act) {
        case 'nav':
          S.view = el.dataset.view; $('#sidebar').classList.remove('open'); render(); break;
        case 'menu': $('#sidebar').classList.toggle('open'); break;
        case 'theme':
          S.theme = S.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', S.theme);
          localStorage.setItem('hirepath-theme', S.theme);
          updateThemeBtn(); if (S.data) render(); break;
        case 'refresh': toast('Refreshing…'); refresh(); break;
        case 'add-application': appModal(null); break;
        case 'edit-application': {
          var rec = S.data.applications.filter(function (a) { return a.id === el.dataset.id; })[0];
          appModal(el.dataset.id);
          if (rec) $('#app-form').dataset.editId = rec.id;
          break;
        }
        case 'delete-application':
          confirmModal('Delete application?', 'This permanently removes the application and all its stage dates. This cannot be undone.',
            'confirm-delete-application', el.dataset.id, true); break;
        case 'confirm-delete-application':
          try { await api('/api/applications/' + encodeURIComponent(el.dataset.id), { method: 'DELETE' }); closeModal(); toast('Application deleted'); await refresh(); }
          catch (err) { toast(err.message, true); } break;
        case 'add-day': dayModal(S.data.analytics.meta.today); break;
        case 'edit-day': dayModal(el.dataset.date); break;
        case 'more-days': S.ui.daysPage += 30; render(); break;
        case 'cohort': cohortModal(); break;
        case 'cohort-clear': S.cohort = { from: '', to: '' }; closeModal(); refresh(); break;
        case 'close-modal': closeModal(); break;
        case 'clear-sample':
          confirmModal('Remove sample data?', 'This deletes only the fictional demo applications and daily-log rows. Any real data you have entered is kept.', 'confirm-clear-sample', null, false); break;
        case 'confirm-clear-sample':
          try { await api('/api/sample/clear', { method: 'POST', body: '{}' }); closeModal(); toast('Sample data removed'); await refresh(); }
          catch (err) { toast(err.message, true); } break;
        case 'load-sample':
          try { await api('/api/sample/load', { method: 'POST', body: '{}' }); toast('Sample data loaded'); await refresh(); }
          catch (err) { toast(err.message, true); } break;
        case 'reset':
          confirmModal('Reset everything?', 'This wipes ALL applications, daily logs and settings, then restores the original demo state. Export a backup first if you have real data.', 'confirm-reset', null, true); break;
        case 'confirm-reset':
          try { await api('/api/reset', { method: 'POST', body: '{}' }); closeModal(); toast('Everything reset'); S.cohort = { from: '', to: '' }; await refresh(); }
          catch (err) { toast(err.message, true); } break;
        case 'import': $('#import-file').click(); break;
        case 'save-settings': saveSettings(); break;
        case 'add-cat': {
          var editor = $('#cat-editor');
          var div = document.createElement('div'); div.className = 'list-row'; div.dataset.catRow = '';
          div.innerHTML = '<input class="input" data-cat-name placeholder="Category name">' +
            '<select class="select" data-cat-tier>' + opts(['Primary', 'Secondary'], 'Primary') + '</select>' +
            '<button class="btn btn-icon btn-ghost" data-action="remove-row" title="Remove">' + ico('trash') + '</button>';
          editor.appendChild(div); break;
        }
        case 'add-status': {
          var sed = $('#status-editor');
          var sd = document.createElement('div'); sd.className = 'status-row'; sd.dataset.statusRow = '';
          sd.innerHTML = '<input class="input" data-st-label placeholder="Status label">' +
            '<input class="input" type="number" min="1" max="5" data-st-stage value="1">' +
            '<select class="select" data-st-outcome>' + opts(['Pending', 'Rejected', 'Offer', 'Withdrawn', 'Closed'], 'Pending') + '</select>' +
            '<select class="select" data-st-rejection>' + opts(['Resume screening', 'HR', 'Technical', 'Final'], '', '—') + '</select>' +
            '<button class="btn btn-icon btn-ghost" data-action="remove-row" title="Remove">' + ico('trash') + '</button>';
          sed.appendChild(sd); break;
        }
        case 'remove-row': case 'remove-cat': case 'remove-status':
          el.closest('[data-cat-row],[data-status-row]').remove(); break;
        case 'apps-page': S.ui.apps.page += Number(el.dataset.delta); renderAppsTable(); break;
        case 'clear-filters':
          S.ui.apps = { q: '', status: '', category: '', resume: '', outcome: '', page: 1, sort: 'applied', dir: -1, per: 20 };
          render(); break;
      }
    });

    document.addEventListener('change', function (e) {
      var el = e.target;
      if (el.id === 'import-file' && el.files && el.files[0]) {
        var reader = new FileReader();
        reader.onload = async function (ev) {
          try {
            var payload = JSON.parse(ev.target.result);
            await api('/api/import', { method: 'POST', body: JSON.stringify({ payload: payload }) });
            toast('Backup imported'); await refresh();
          } catch (err) { toast('Import failed: ' + err.message, true); }
        };
        reader.readAsText(el.files[0]);
        el.value = '';
        return;
      }
      if (el.dataset && el.dataset.filter) {
        S.ui.apps[el.dataset.filter] = el.value; S.ui.apps.page = 1; renderOnlyView();
      }
    });

    var searchTimer;
    document.addEventListener('input', function (e) {
      if (e.target.id === 'apps-q') {
        clearTimeout(searchTimer);
        var v = e.target.value;
        searchTimer = setTimeout(function () {
          S.ui.apps.q = v; S.ui.apps.page = 1;
          var pos = e.target.selectionStart;
          renderAppsTable();
          var n = $('#apps-q'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) {} }
        }, 200);
      }
    });

    document.addEventListener('click', function (e) {
      var th = e.target.closest('th[data-sort]');
      if (!th) return;
      var k = th.dataset.sort;
      if (S.ui.apps.sort === k) S.ui.apps.dir *= -1;
      else { S.ui.apps.sort = k; S.ui.apps.dir = -1; }
      renderAppsTable();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && $('#modal-root').innerHTML) closeModal();
      if (e.key === 'n' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); appModal(null); }
    });
  }

  boot();
})();
