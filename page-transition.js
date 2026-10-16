/* Page transition: a thick, jagged marker scribble sweeps across and paints the screen, the next page
   loads underneath, then a second scribble wipes the paint away to reveal it.
   Loaded right after <body> opens on every page, so a page arriving mid-transition starts covered
   before anything paints. Links within a page, new-tab links and the PDF behave as normal, and
   reduced motion turns the whole thing off. */
(function () {
  'use strict';
  var KEY = 'page-transition';
  var COVER_MS = 520, REVEAL_MS = 720;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ok = !reduce && typeof document.documentElement.animate === 'function';
  var NS = 'http://www.w3.org/2000/svg';
  var root, svg, cover, eraser, busy = false;

  // The flag holds the paint colour, so the arriving page wipes away the same colour the leaving page laid down.
  function arriving() { try { return sessionStorage.getItem(KEY); } catch (e) { return null; } }
  function mark(color) { try { color ? sessionStorage.setItem(KEY, color) : sessionStorage.removeItem(KEY); } catch (e) {} }

  // Paint in the opposite of the page: near-black over a light page, near-white over a dark one.
  function paint() {
    var m = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g) || [255, 255, 255];
    var light = (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255 > 0.5;
    return light ? '#0F1012' : '#F7F8F8';
  }

  // A zigzag that runs left to right between points well past the top and bottom edges. With a stroke
  // this wide the legs overlap and fill the screen, and the miter joins give the sharp shard tips.
  function scribble(w, h, flip) {
    var xs = [-0.25, 0.1, 0.27, 0.46, 0.63, 0.82, 1.0, 1.25];
    var d = xs.map(function (x, i) {
      var top = (i % 2 === 1) !== flip;
      return (i ? 'L' : 'M') + (x * w).toFixed(1) + ' ' + ((top ? -0.25 : 1.25) * h).toFixed(1);
    });
    return d.join(' ');
  }

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function build(covered, color) {
    var w = innerWidth, h = innerHeight, sw = Math.max(w * 0.34, h * 0.3);
    var stroke = { fill: 'none', 'stroke-width': sw.toFixed(1), 'stroke-linejoin': 'miter', 'stroke-miterlimit': '12', pathLength: '1', 'stroke-dasharray': '1 1' };

    root = document.createElement('div');
    root.setAttribute('aria-hidden', 'true');
    root.style.cssText = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden';
    svg = el('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h });
    svg.style.cssText = 'display:block;width:100%;height:100%';

    // The eraser is drawn in black into a mask over a solid sheet, so wherever it has passed the sheet is gone.
    var mask = el('mask', { id: 'pt-mask', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: w, height: h });
    mask.appendChild(el('rect', { x: 0, y: 0, width: w, height: h, fill: '#fff' }));
    eraser = el('path', Object.assign({ d: scribble(w, h, true), stroke: '#000', 'stroke-dashoffset': '1' }, stroke));
    mask.appendChild(eraser);
    var defs = el('defs', {});
    defs.appendChild(mask);
    svg.appendChild(defs);

    var g = el('g', { mask: 'url(#pt-mask)' });
    cover = el('path', Object.assign({ d: scribble(w, h, false), stroke: color, 'stroke-dashoffset': covered ? '0' : '1' }, stroke));
    g.appendChild(cover);
    // A solid backing under the stroke once it has finished, so no sliver of the old page can show.
    var fill = el('rect', { x: 0, y: 0, width: w, height: h, fill: color, opacity: covered ? '1' : '0' });
    g.insertBefore(fill, cover);
    svg.appendChild(g);
    root.appendChild(svg);
    root._fill = fill;
    (document.body || document.documentElement).appendChild(root);
  }

  // Pass the overlay being finished with, so a late timer from an earlier transition can't remove a newer one.
  function teardown(which) {
    if (which && which !== root) return;
    if (root) root.remove();
    root = null;
    busy = false;
  }

  function reveal() {
    root.style.pointerEvents = 'none';
    var a = eraser.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: REVEAL_MS, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
    var mine = root;
    a.onfinish = function () { teardown(mine); };
    setTimeout(function () { teardown(mine); }, REVEAL_MS + 400);
  }

  function leave(href) {
    if (busy) return;
    busy = true;
    if (root) root.remove();
    root = null;
    // Open dialogs sit in the top layer, above any z-index, so they would show through the cover.
    Array.prototype.forEach.call(document.querySelectorAll('dialog[open]'), function (d) { d.close(); });
    var color = paint();
    build(false, color);
    root.style.pointerEvents = 'auto';
    cover.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: COVER_MS, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' });
    mark(color);
    // Navigate on a timer rather than on the animation's finish, which a background tab may never fire.
    var mine = root;
    setTimeout(function () { mine._fill.setAttribute('opacity', '1'); location.href = href; }, COVER_MS);
  }

  if (!ok) { mark(null); return; }

  // Arriving from another page of the site: start fully painted, then wipe it away once the page is ready.
  var arrivingColor = arriving();
  if (arrivingColor) {
    mark(null);
    build(true, arrivingColor);
    var go = function () { setTimeout(function () { if (root) reveal(); }, 90); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go, { once: true });
    else go();
  }

  // Back and forward can restore a page from cache with the cover still up; take it down.
  addEventListener('pageshow', function (e) { if (e.persisted) { mark(null); teardown(); } });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target && a.target !== '_self' || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // a jump within this page
    if (!/(\/|\.html)$/.test(url.pathname)) return; // the PDF and any other file open as normal
    e.preventDefault();
    leave(url.href);
  });
})();
