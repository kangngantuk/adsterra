/*! adsterra-sidebar-300x250.js (v3) */
(function(){
  var key="b4bee8addb665c42530e6a5f19526431";
  var host="windowsvow.com";
  var width=300, height=250;

  var scr = document.currentScript || (function(){var s=document.getElementsByTagName('script');return s[s.length-1];})();

  // Find wrappers used by your router
  function closest(el, sel){
    while(el && el.nodeType===1){
      if (el.matches && el.matches(sel)) return el;
      el = el.parentElement;
    }
    return null;
  }
  var box = closest(scr, ".ad-sidebar-box") || scr.parentElement || null;
  var container = closest(scr, ".ad-slot-container");

  // Insert dual placeholders early (before the script tag) so the router's reveal() sees them immediately.
  function insertPlaceholders(){
    try{
      var target = box || container || scr.parentElement;
      if(!target) return;

      // avoid duplicate
      if (target.querySelector('[data-adph]')) return;

      // 1) <object> tends to bypass cosmetic img filters
      var phObj = document.createElement('object');
      phObj.setAttribute('type','image/gif');
      phObj.setAttribute('data','data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
      phObj.setAttribute('data-adph','1');
      phObj.style.cssText = 'width:1px;height:1px;position:absolute;opacity:0;pointer-events:none;z-index:-1;';

      // 2) backup <img> (some filters block object, so we provide both)
      var phImg = document.createElement('img');
      phImg.setAttribute('alt','');
      phImg.setAttribute('aria-hidden','true');
      phImg.setAttribute('data-adph','1');
      phImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
      phImg.style.cssText = 'width:1px;height:1px;position:absolute;opacity:0;pointer-events:none;z-index:-1;';

      // Insert BEFORE the script tag for maximum chance of being "seen" by reveal()
      if (scr.parentNode){
        scr.parentNode.insertBefore(phObj, scr);
        scr.parentNode.insertBefore(phImg, scr);
      } else {
        target.appendChild(phObj);
        target.appendChild(phImg);
      }
    }catch(e){}
  }
  insertPlaceholders();

  // Scope atOptions so multiple slots don't clobber each other
  var prev = window.atOptions;
  window.atOptions = { key:key, format:"iframe", height:height, width:width, params:{} };

  // Load official Adsterra loader
  var s = document.createElement("script");
  s.src = "https://" + host + "/" + key + "/invoke.js";
  s.async = true;
  s.referrerPolicy = "no-referrer-when-downgrade";

  function cleanupPlaceholdersSoon(){
    var tgt = box || container || (scr && scr.parentElement);
    if(!tgt) return;
    // Remove placeholders only when a real creative exists
    if (tgt.querySelector('iframe,ins,object[data-adph="0"],embed[data-adph="0"]')) return;
    if (tgt.querySelector('iframe,ins,object:not([data-adph]),embed:not([data-adph])')){
      // Found real ad node (not our placeholders) → remove our ph
      tgt.querySelectorAll('[data-adph]').forEach(function(n){ try{ n.remove(); }catch(_){}});
      return;
    }
    // try again a bit later
    setTimeout(cleanupPlaceholdersSoon, 800);
  }

  s.onload = function(){
    // After loader executes, observe for the injected iframe, then cleanup ph
    var tgt = box || container || (scr && scr.parentElement);
    if (tgt && 'MutationObserver' in window){
      var mo = new MutationObserver(function(){
        if (tgt.querySelector('iframe,ins,object:not([data-adph]),embed:not([data-adph])')){
          try{ mo.disconnect(); }catch(_){}
          cleanupPlaceholdersSoon();
        }
      });
      try{ mo.observe(tgt, { childList:true, subtree:true }); }catch(_){}
    }
    setTimeout(cleanupPlaceholdersSoon, 1200);

    // Restore atOptions
    if (typeof prev === "undefined") { try { delete window.atOptions; } catch(e){ window.atOptions = void 0; } }
    else { window.atOptions = prev; }
  };
  s.onerror = function(){
    if (typeof prev === "undefined") { try { delete window.atOptions; } catch(e){ window.atOptions = void 0; } }
    else { window.atOptions = prev; }
    // keep placeholders so container stays revealed even if blocked
  };

  // Insert Adsterra loader right after our script node
  if (scr && scr.parentNode){ scr.after(s); } else { (document.head||document.body||document.documentElement).appendChild(s); }
})();
