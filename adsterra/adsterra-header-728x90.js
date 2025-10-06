(function(){
  /* Adsterra slot via jsDelivr-controlled snippet.
     Update this file in GitHub; pages that include it will reflect changes after CDN refresh. */
  var key = "3e357ca97289a9dc2cbf04c97e13a8fe";
  var host = "windowsvow.com";
  var width = 728, height = 90;
  var params = {};

  // Ensure Adsterra config is set right before loading their script
  window.atOptions = {
    key: key,
    format: "iframe",
    height: height,
    width: width,
    params: params
  };

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://" + host + "/" + key + "/invoke.js";
  var ref = document.currentScript || document.getElementsByTagName("script")[0];
  ref.parentNode.insertBefore(s, ref);
})();