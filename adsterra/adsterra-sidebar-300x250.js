/*! adsterra-sidebar-300x250.js (v3.2) */
(function(){
  var key="b4bee8addb665c42530e6a5f19526431";
  var host="windowsvow.com";
  var width=300, height=250;

  var scr = document.currentScript || (function(){var s=document.getElementsByTagName('script');return s[s.length-1];})();

  function closest(el, sel){
    while(el && el.nodeType===1){
      if (el.matches && el.matches(sel)) return el;
      el = el.parentElement;
    }
    return null;
  }
  var box = closest(scr, ".ad-sidebar-box") || scr.parentElement || null;
  var container = closest(scr, ".ad-slot-container");
  var targets = [];
  if (box) targets.push(box);
  if (container && container!==box) targets.push(container);

  // === 0) Force reveal: buka display container sedini mungkin ===
  try{ if (container) container.style.setProperty('display','', 'important'); }catch(_){}

  function cssImp(el, css){
    for (var k in css){
      try{ el.style.setProperty(k, css[k], "important"); }catch(_){}
    }
  }

  // === 1) Insert resilient placeholders (ins+object+img) ===
  (function insertPH(){
    try{
      for (var i=0;i<targets.length;i++){
        var t = targets[i];
        if (!t || t.querySelector('[data-adph]')) continue;
        var phTags = [
          (function(){ var n=document.createElement('ins'); n.setAttribute('data-adph','1'); return n; })(),
          (function(){ var n=document.createElement('object'); n.setAttribute('type','image/gif'); n.setAttribute('data','data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='); n.setAttribute('data-adph','1'); return n; })(),
          (function(){ var n=document.createElement('img'); n.setAttribute('alt',''); n.setAttribute('aria-hidden','true'); n.setAttribute('data-adph','1'); n.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; return n; })()
        ];
        for (var j=0;j<phTags.length;j++){
          var n = phTags[j];
          cssImp(n, {
            display: 'block',
            width: '1px',
            height: '1px',
            visibility: 'visible',
            position: 'absolute',
            opacity: '0',
            'pointer-events': 'none',
            'z-index': '-1'
          });
          if (scr.parentNode && t===box){
            scr.parentNode.insertBefore(n, scr);
          }else{
            t.appendChild(n);
          }
        }
      }
    }catch(e){}
  })();

  // === 2) Scope atOptions untuk slot ini saja ===
  var prev = window.atOptions;
  window.atOptions = { key:key, format:"iframe", height:height, width:width, params:{} };

  // === 3) Muat loader resmi Adsterra ===
  var s = document.createElement("script");
  s.src = "https://" + host + "/" + key + "/invoke.js";
  s.async = true;
  s.referrerPolicy = "no-referrer-when-downgrade";

  function hasRealCreative(root){
    return !!root && !!root.querySelector('iframe,ins:not([data-adph]),object:not([data-adph]),embed:not([data-adph])');
  }
  function cleanupPlaceholders(){
    for (var i=0;i<targets.length;i++){
      var t = targets[i];
      if(!t) continue;
      t.querySelectorAll('[data-adph]').forEach(function(n){ try{ n.remove(); }catch(_){}});
    }
  }
  function pollCleanup(msLeft){
    if (msLeft <= 0) return;
    setTimeout(function(){
      for (var i=0;i<targets.length;i++){
        var t = targets[i];
        if (hasRealCreative(t)){ cleanupPlaceholders(); return; }
      }
      pollCleanup(msLeft - 500);
    }, 500);
  }

  s.onload = function(){
    // Observe munculnya iframe kreatif
    for (var i=0;i<targets.length;i++){
      var t = targets[i];
      if (!t) continue;
      if ('MutationObserver' in window){
        (function(root){
          var mo = new MutationObserver(function(){
            if (hasRealCreative(root)){ try{ mo.disconnect(); }catch(_){ } cleanupPlaceholders(); }
          });
          try{ mo.observe(root, { childList:true, subtree:true }); }catch(_){}
        })(t);
      }
    }
    pollCleanup(6000);

    // Restore atOptions
    if (typeof prev === "undefined") { try { delete window.atOptions; } catch(e){ window.atOptions = void 0; } }
    else { window.atOptions = prev; }
  };
  s.onerror = function(){
    // Restore walau gagal
    if (typeof prev === "undefined") { try { delete window.atOptions; } catch(e){ window.atOptions = void 0; } }
    else { window.atOptions = prev; }
    // Biarkan placeholder tetap agar container tetap revealed
  };

  // Sisip loader setelah script ini
  if (scr && scr.parentNode){ scr.after(s); } else { (document.head||document.body||document.documentElement).appendChild(s); }
})();
