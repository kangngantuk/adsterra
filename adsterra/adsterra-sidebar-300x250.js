(function(){
  var key="b4bee8addb665c42530e6a5f19526431";
  var host="windowsvow.com";
  var width=300, height=250;

  var scr = document.currentScript || (function(){var s=document.getElementsByTagName('script');return s[s.length-1];})();
  var box = scr && scr.parentElement ? scr.parentElement : null;

  try{
    if (box && !box.querySelector('[data-adph]')) {
      var ph = document.createElement('img');
      ph.setAttribute('alt','');
      ph.setAttribute('aria-hidden','true');
      ph.setAttribute('data-adph','1');
      ph.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
      ph.style.cssText = 'width:1px;height:1px;position:absolute;opacity:0;pointer-events:none;';
      box.appendChild(ph);
    }
  }catch(e){}

  var prev = window.atOptions;
  window.atOptions = { key:key, format:"iframe", height:height, width:width, params:{} };

  var s = document.createElement("script");
  s.src = "https://" + host + "/" + key + "/invoke.js";
  s.async = true;
  s.referrerPolicy = "no-referrer-when-downgrade";

  function removePh(){
    try{ var ph = box && box.querySelector('[data-adph]'); if(ph) ph.remove(); }catch(_){}
  }
  s.onload = function(){
    if (box && 'MutationObserver' in window){
      var mo = new MutationObserver(function(){
        if (box.querySelector('iframe,ins,object,embed')){ removePh(); mo.disconnect(); }
      });
      try{ mo.observe(box, {childList:true, subtree:true}); }catch(_){}
      setTimeout(function(){ if (box.querySelector('iframe,ins,object,embed')) removePh(); }, 1200);
    } else {
      setTimeout(removePh, 1500);
    }
    if (typeof prev === "undefined") { try { delete window.atOptions; } catch(e){ window.atOptions = void 0; } }
    else { window.atOptions = prev; }
  };
  s.onerror = function(){
    if (typeof prev === "undefined") { try { delete window.atOptions; } catch(e){ window.atOptions = void 0; } }
    else { window.atOptions = prev; }
  };

  if (scr && scr.parentNode){ scr.after(s); } else { (document.head||document.body||document.documentElement).appendChild(s); }
})();
