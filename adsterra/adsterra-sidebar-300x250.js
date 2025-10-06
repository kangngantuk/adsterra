(function(){
  /* Adsterra slot via jsDelivr-controlled snippet.
     Update this file in GitHub; pages that include it will reflect changes after CDN refresh. */
  var key = "b4bee8addb665c42530e6a5f19526431";
  var host = "windowsvow.com";
  var width = 300, height = 250;
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