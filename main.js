// ==UserScript==
// @name         下载DOI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       gkqha
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
    var doiRegex = '(10[.][0-9]{2,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)'
    
    var doi = function (opts) {
        opts = opts || {}
        return opts.exact ? new RegExp('(?:^' + doiRegex + '$)') :
            new RegExp('(?:' + doiRegex + ')', 'g')
    }
    
    var doi_Regex = doi
    var isHas = false
    
    const res = document.querySelector('*').innerText.split('\n');
    res.forEach(e => {
        if (doi_Regex().test(e)) {
            console.log(e);
            const regex = /(\s|>|Citations)(.*)/;
            window.open(`https://sci-hub.live/${e.match(doi_Regex())[0].replace(regex, "")}`);
            isHas = true
        }
    });
    if (isHas == false) {
        window.alert("暂未找到DOI号，也可能该功能存在问题");
    }
    })();