/* Lightweight, dependency-free SVG charts for Hirepath. */
(function (global) {
  'use strict';
  var uid = 0;
  function nid() { return 'c' + (++uid); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function niceMax(v) {
    if (!v || v <= 0) return 1;
    var exp = Math.pow(10, Math.floor(Math.log10(v)));
    var f = v / exp;
    var step = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
    return step * exp;
  }
  function fmtY(v, percent) {
    if (percent) return Math.round(v * 100) + '%';
    if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    if (Math.abs(v) % 1 !== 0) return v.toFixed(1);
    return String(v);
  }
  function grid(y0, y1, x0, x1, yMax, percent) {
    var s = '';
    for (var i = 0; i <= 4; i++) {
      var y = y0 + (y1 - y0) * i / 4;
      var val = yMax * (1 - i / 4);
      s += '<line x1="' + x0 + '" y1="' + y.toFixed(1) + '" x2="' + x1 + '" y2="' + y.toFixed(1) +
        '" stroke="var(--line)" stroke-width="1" stroke-dasharray="' + (i === 4 ? '0' : '3 4') + '"/>';
      s += '<text x="' + (x0 - 9) + '" y="' + (y + 3.5).toFixed(1) + '" text-anchor="end" ' +
        'font-size="10" fill="var(--muted)" font-family="var(--font)">' + fmtY(val, percent) + '</text>';
    }
    return s;
  }
  function xLabels(labels, x0, x1, n, every) {
    if (!n) return '';
    var s = '', step = Math.max(1, Math.ceil(n / (every || 7)));
    for (var i = 0; i < n; i += step) {
      var x = n === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * i / (n - 1);
      s += '<text x="' + x.toFixed(1) + '" y="' + (arguments[6] || 0) + '" text-anchor="middle" ' +
        'font-size="9.5" fill="var(--muted)" font-family="var(--font)">' + esc(labels[i]) + '</text>';
    }
    return s;
  }
  function roundTop(x, y, w, h, r) {
    r = Math.min(r, w / 2, Math.max(0, h));
    if (h <= 0) return '';
    return 'M' + x + ',' + (y + h) + ' L' + x + ',' + (y + r) +
      ' Q' + x + ',' + y + ' ' + (x + r) + ',' + y +
      ' L' + (x + w - r) + ',' + y +
      ' Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) +
      ' L' + (x + w) + ',' + (y + h) + ' Z';
  }
  function legend(series) {
    if (!series || series.length < 2) return '';
    return '<div class="chart-legend">' + series.map(function (s) {
      return '<span class="legend-item"><i class="legend-dot" style="background:' + s.color + '"></i>' + esc(s.name) + '</span>';
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------------ line */
  function line(el, cfg) {
    var node = typeof el === 'string' ? document.querySelector(el) : el;
    if (!node) return;
    var series = (cfg.series || []).filter(Boolean);
    var labels = cfg.labels || [];
    var n = labels.length;
    if (!n) { node.innerHTML = '<div class="chart-empty">No data yet</div>'; return; }
    var W = 620, H = cfg.height || 230;
    var p = { l: 46, r: 14, t: 14, b: 28 };
    var x0 = p.l, x1 = W - p.r, y0 = p.t, y1 = H - p.b;
    var all = series.reduce(function (acc, s) { return acc.concat(s.data.filter(function (v) { return v != null; })); }, []);
    var yMax = cfg.percent ? 1 : niceMax(Math.max.apply(Math, all.concat([0])) * 1.12);
    var px = function (i) { return n === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * i / (n - 1); };
    var py = function (v) { return y1 - (Math.max(0, Math.min(v, yMax)) / yMax) * (y1 - y0); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">';
    // assign stable gradient ids
    var gid = nid();
    var defs = '<defs>' + series.map(function (se, k) {
      return '<linearGradient id="' + gid + '_' + k + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + se.color + '" stop-opacity="0.26"/>' +
        '<stop offset="100%" stop-color="' + se.color + '" stop-opacity="0.01"/></linearGradient>';
    }).join('') + '</defs>';
    s += defs;
    s += grid(y0, y1, x0, x1, yMax, !!cfg.percent);
    // x labels
    var step = Math.max(1, Math.ceil(n / 7));
    for (var i = 0; i < n; i += step) {
      s += '<text x="' + px(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="9.5" fill="var(--muted)">' + esc(labels[i]) + '</text>';
    }
    series.forEach(function (se, k) {
      var pts = [];
      se.data.forEach(function (v, i) { if (v != null) pts.push({ x: px(i), y: py(v), v: v, i: i }); });
      if (!pts.length) return;
      var d = pts.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' ');
      if (se.fill !== false) {
        s += '<path d="' + d + ' L' + pts[pts.length - 1].x.toFixed(1) + ',' + y1 + ' L' + pts[0].x.toFixed(1) + ',' + y1 + ' Z" fill="url(#' + gid + '_' + k + ')"/>';
      }
      s += '<path d="' + d + '" fill="none" stroke="' + se.color + '" stroke-width="' + (se.width || 2.4) +
        '" stroke-linecap="round" stroke-linejoin="round" ' + (se.dash ? 'stroke-dasharray="5 5" opacity=".7"' : '') + '/>';
      pts.forEach(function (q) {
        s += '<circle cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="3" fill="var(--surface)" stroke="' + se.color + '" stroke-width="1.8">' +
          '<title>' + esc(labels[q.i]) + ' · ' + esc(se.name) + ': ' + (cfg.percent ? Math.round(q.v * 100) + '%' : q.v) + '</title></circle>';
      });
    });
    s += '</svg>';
    node.innerHTML = '<div class="chart">' + s + '</div>' + legend(series);
  }

  /* ------------------------------------------------------------------- bar */
  function bar(el, cfg) {
    var node = typeof el === 'string' ? document.querySelector(el) : el;
    if (!node) return;
    var series = (cfg.series || []).filter(Boolean);
    var labels = cfg.labels || [], n = labels.length;
    if (!n) { node.innerHTML = '<div class="chart-empty">No data yet</div>'; return; }
    var W = 620, H = cfg.height || 230;
    var p = { l: 46, r: 14, t: 14, b: 30 };
    var x0 = p.l, x1 = W - p.r, y0 = p.t, y1 = H - p.b;
    var stacked = !!cfg.stacked;
    var totals = [];
    for (var i = 0; i < n; i++) {
      totals[i] = stacked ? series.reduce(function (a, s) { return a + (Number(s.data[i]) || 0); }, 0)
        : Math.max.apply(Math, series.map(function (s) { return Number(s.data[i]) || 0; }).concat([0]));
    }
    var maxV = cfg.percent ? 1 : niceMax(Math.max.apply(Math, totals.concat([0])) * 1.12);
    var groupW = (x1 - x0) / n;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">';
    s += grid(y0, y1, x0, x1, maxV, !!cfg.percent);
    var step = Math.max(1, Math.ceil(n / 8));
    for (var j = 0; j < n; j += step) {
      var cx = x0 + groupW * (j + .5);
      s += '<text x="' + cx.toFixed(1) + '" y="' + (H - 9) + '" text-anchor="middle" font-size="9.5" fill="var(--muted)">' + esc(labels[j]) + '</text>';
    }
    for (var i2 = 0; i2 < n; i2++) {
      if (stacked) {
        var acc = 0;
        series.forEach(function (se) {
          var v = Number(se.data[i2]) || 0;
          if (v <= 0) return;
          var h = (v / maxV) * (y1 - y0);
          var yA = y1 - ((acc + v) / maxV) * (y1 - y0);
          var bw = Math.max(4, Math.min(38, groupW * .6));
          var bx = x0 + groupW * (i2 + .5) - bw / 2;
          s += '<path d="' + roundTop(bx, yA, bw, h, 3) + '" fill="' + se.color + '">' +
            '<title>' + esc(labels[i2]) + ' · ' + esc(se.name) + ': ' + v + '</title></path>';
          acc += v;
        });
      } else {
        var m = series.length;
        var bw2 = Math.max(3, Math.min(26, (groupW * .68) / m));
        var startX = x0 + groupW * (i2 + .5) - (bw2 * m + (m - 1) * 3) / 2;
        series.forEach(function (se, k) {
          var v2 = Number(se.data[i2]) || 0;
          var h2 = (Math.max(0, v2) / maxV) * (y1 - y0);
          var bx2 = startX + k * (bw2 + 3);
          s += '<path d="' + roundTop(bx2, y1 - h2, bw2, h2, 3) + '" fill="' + se.color + '" opacity="' + (se.opacity || 1) + '">' +
            '<title>' + esc(labels[i2]) + ' · ' + esc(se.name) + ': ' + (cfg.percent ? Math.round(v2 * 100) + '%' : v2) + '</title></path>';
        });
      }
    }
    // optional target line
    if (cfg.target != null) {
      var ty = y1 - (cfg.target / maxV) * (y1 - y0);
      s += '<line x1="' + x0 + '" y1="' + ty.toFixed(1) + '" x2="' + x1 + '" y2="' + ty.toFixed(1) +
        '" stroke="var(--amber)" stroke-width="1.6" stroke-dasharray="6 4"/>';
    }
    s += '</svg>';
    node.innerHTML = '<div class="chart">' + s + '</div>' + legend(series);
  }

  /* ---------------------------------------------------------------- donut */
  function donut(el, cfg) {
    var node = typeof el === 'string' ? document.querySelector(el) : el;
    if (!node) return;
    var items = cfg.items || [];
    var total = items.reduce(function (a, b) { return a + (b.value || 0); }, 0);
    var size = cfg.size || 176, r = size / 2 - 15, cx = size / 2, cy = size / 2;
    var circ = 2 * Math.PI * r;
    var s = '<svg viewBox="0 0 ' + size + ' ' + size + '" style="max-width:' + size + 'px;margin:auto" role="img">';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--surface-3)" stroke-width="17"/>';
    var offset = 0;
    items.forEach(function (it) {
      if (!it.value || !total) return;
      var len = circ * it.value / total;
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + it.color +
        '" stroke-width="17" stroke-dasharray="' + (len - 2) + ' ' + (circ - len + 2) +
        '" stroke-dashoffset="' + (-offset) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')" stroke-linecap="round">' +
        '<title>' + esc(it.label) + ': ' + it.value + '</title></circle>';
      offset += len;
    });
    s += '<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" font-size="27" font-weight="750" fill="var(--ink)">' + total + '</text>';
    s += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="10" fill="var(--muted)">' + esc(cfg.centerLabel || 'total') + '</text>';
    s += '</svg>';
    var lg = '<div class="chart-legend" style="justify-content:center">' + items.map(function (it) {
      return '<span class="legend-item"><i class="legend-dot" style="background:' + it.color + '"></i>' +
        esc(it.label) + ' <b style="margin-left:2px">' + it.value + '</b></span>';
    }).join('') + '</div>';
    node.innerHTML = '<div class="chart">' + s + '</div>' + lg;
  }

  /* -------------------------------------------------------------- sparkline */
  function spark(values, color, w, h) {
    w = w || 160; h = h || 36;
    var vals = (values || []).filter(function (v) { return v != null; });
    if (vals.length < 2) return '';
    var mx = Math.max.apply(Math, vals), mn = Math.min.apply(Math, vals);
    var rng = (mx - mn) || 1;
    var pts = vals.map(function (v, i) {
      return [2 + (w - 4) * i / (vals.length - 1), h - 4 - ((v - mn) / rng) * (h - 10)];
    });
    var d = pts.map(function (q, i) { return (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ');
    return '<svg width="100%" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
      '<path d="' + d + ' L' + w + ',' + h + ' L0,' + h + ' Z" fill="' + color + '" opacity=".08"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  global.Charts = { line: line, bar: bar, donut: donut, spark: spark, esc: esc };
})(window);
