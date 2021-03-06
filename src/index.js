import auditor from "./auditor.js";
import Logger from "./logger";

(function() {
  var logger = new Logger();

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      auditor(mutation.target, logger);
    });
  });

  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };

  var load = function() {
    window.removeEventListener("load", load, false);
    auditor(document, logger);
    observer.observe(document, config);
  };

  window.addEventListener("load", load);
})();
