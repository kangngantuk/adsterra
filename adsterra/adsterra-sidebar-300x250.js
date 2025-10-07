/*! adsterra-sidebar-300x250.js (v3.1) */
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

  function cssImp(el, css){
    for (var k in css){
      try{ el.style.setProperty(k, css[k], "important"); }catch(_){}
    }
  }

  function insertPlaceholders(){
    try{
      for (var i=0;i<targets.length;i++){
        var t = targets[i];
        if (!t || t.querySelector('[data-adph]')) continue;

        // 1) <ins> minimal, jarang ditarget tanpa class
        var phIns = document.createElement('ins');
        phIns.setAttribute('data-adph','1');
        cssImp(phIns, {
          display: 'block',
          width: '1px',
          height: '1px',
          visibility: 'visible',
          position: 'absolute',
          opacity: '0',
          'pointer-events': 'none',
          'z-index': '-1'
        });

        // 2) <object> (fallback saat img difilter)
        var phObj = document.createElement('object');
        phObj.setAttribute('type','image/gif');
        phObj.setAttribute('data','data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
        phObj.setAttribute('data-adph','1');
        cssImp(phObj, {
          display: 'block',
          width: '1px',
          height: '1px',
          visibility: 'visible',
          position: 'absolute',
          opacity: '0',
          'pointer-events': 'none',
          'z-index': '-1'
        });

        // 3) <img> fallback
        var phImg = document.createElement('img');
        phImg.setAttribute('alt','');
        phImg.setAttribute('aria-hidden','true');
        phImg.setAttribute('data-adph','1');
        phImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        cssImp(phImg, {
          display: 'block',
          width: '1px',
          height: '1px',
          visibility: 'visible',
          position: 'absolute',
          opacity: '0',
          'pointer-events': 'none',
          'z-index': '-1'
        });

        // Masukkan placeholder sebelum script (agar cepat "terlihat")
        if (scr.parentNode && t===box){
          scr.parentNode.insertBefore(phIns, scr);
          scr.parentNode.insertBefore(phObj, scr);
          scr.parentNode.insertBefore(phImg, scr);
        }else{
          t.appendChild(phIns);
          t.appendChild(phObj);
          t.appendChild(phImg);
        }
      }
    }catch(e){}
  }
  insertPlaceholders();

  // Scope atOptions untuk slot ini saja
  var prev = window.atOptions;
  window.atOptions = { key:key, format:"iframe", height:height, width:width, params:{} };

  // Muat loader resmi Adsterra
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
  function waitAndCleanup(msLeft){
    if (msLeft <= 0) return;
    setTimeout(function(){
      for (var i=0;i<targets.length;i++){
        var t = targets[i];
        if (hasRealCreative(t)){ cleanupPlaceholders(); return; }
      }
      waitAndCleanup(msLeft - 500);
    }, 500);
  }

  s.onload = function(){
    // Observe munculnya iframe kreatif
    var observed=false;
    for (var i=0;i<targets.length;i++){
      var t = targets[i];
      if (!t) continue;
      if ('MutationObserver' in window){
        var mo = new MutationObserver(function(muts, obs){
          for (var j=0;j<targets.length;j++){
            if (hasRealCreative(targets[j])){ try{ obs.disconnect(); }catch(_){ } cleanupPlaceholders(); return; }
          }
        });
        try{ mo.observe(t, { childList:true, subtree:true }); observed=true; }catch(_){}
      }
    }
    // fallback polling beberapa detik
    waitAndCleanup(5000);

    // Kembalikan atOptions
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
