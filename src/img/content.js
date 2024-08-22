
var r = document.querySelector(':root');

/*
//DEFAULT//
r.style.setProperty('--primary-50', '#eef2ff');
r.style.setProperty('--primary-100', '#e0e7ff');
r.style.setProperty('--primary-200', '#c7d2fe');
r.style.setProperty('--primary-300', '#a5b4fc');
r.style.setProperty('--primary-400', '#818cf8');
r.style.setProperty('--primary-500', '#6366f1');
r.style.setProperty('--primary-600', '#4f46e5');
r.style.setProperty('--primary-700', '#4338ca');
r.style.setProperty('--primary-800', '#3730a3');
r.style.setProperty('--primary-900', '#312e81');
r.style.setProperty('--primary-950', '#1e1b4b');
*/
chrome.storage.local.get(['wom_theme_palette']).then((a) => {
    if(a.wom_theme_palette){
        var p = (a.wom_theme_palette);
        r.style.setProperty('--primary-50', p[0]);
        r.style.setProperty('--primary-100', p[1]);
        r.style.setProperty('--primary-200', p[2]);
        r.style.setProperty('--primary-300', p[3]);
        r.style.setProperty('--primary-400', p[4]);
        r.style.setProperty('--primary-500', p[5]);
        r.style.setProperty('--primary-600', p[6]); 
        r.style.setProperty('--primary-700', p[7]);
        r.style.setProperty('--primary-800', p[8]);
        r.style.setProperty('--primary-900', p[9]);
        r.style.setProperty('--primary-950', p[10]);
    }
});

chrome.storage.local.get(['wom_custom_scrollbar']).then((a) => {
    if(a.wom_custom_scrollbar){
        var p = (a.wom_custom_scrollbar);
        const sheet = document.styleSheets[0];
        let scrollbarThumb;
        for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            //console.log(rule)
            if (rule.selectorText === '::-webkit-scrollbar-thumb') {
                scrollbarThumb = rule;
                break;
            };
        }
        let scrollbarTrack;
        for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            //console.log(rule)
            if (rule.selectorText === '::-webkit-scrollbar-track') {
                scrollbarTrack = rule;
                break;
            };
        }
        let scrollbar;
        for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            //console.log(rule)
            if (rule.selectorText === '::-webkit-scrollbar') {
                scrollbar = rule;
                break;
            };
        }
        scrollbar.style.width=p.width+'px';
        scrollbarTrack.style.width=p.width+'px';
        scrollbarThumb.style.width=p.width+'px';
        scrollbarTrack.style.backgroundColor=p.track;
        scrollbarThumb.style.backgroundColor=p.thumb;
        scrollbarThumb.style.borderRadius=p.radius+'px';
        scrollbarTrack.style.borderRadius=p.radius+'px';
        scrollbar.style.borderRadius=p.radius+'px';

    
    }
});
if(location.href=="https://wasteof.money" || location.href=="https://wasteof.money/"){
    chrome.storage.local.get(['wom_collapse']).then((z) => {
        if(z.wom_collapse){
            if(z.wom_collapse.enabled){
                document.querySelector(".max-w-2xl").querySelectorAll(".bg-gray-100").forEach((elem) => {
                    //console.log(elem)
                    var c= elem.querySelector("a");
                    var m = elem.querySelector("a .w-full");
                    var g = elem.querySelector("a .mt-3");
                    var a= elem.querySelector(".prose");
                    var ch=(a.textContent.length);
                    //c.setAttribute("href", "");
                    var d= c.innerHTML;
                    //console.log(c.querySelectorAll("div"))
                    if(c.querySelectorAll("div")[2].className=="select-none"){
                        c.innerHTML= String(m.outerHTML)+`<button id="easteregg">Expand</button>`+String(a.outerHTML)+String(g.outerHTML);
                        var a= elem.querySelector(".prose");
                        a.style.display=`none`;
                        var u= elem.querySelector("a #easteregg")
                        u.addEventListener("click", function(e){
                            e.preventDefault();
                               tog_ex(this);
                        });
                        u.setAttribute("class", "bg-primary-500");
                        u.style.fontWeight="bold";
                        u.style.color="white";
                        u.style.padding="5px";
                        u.style.borderRadius="5px";
                        if(!z.wom_collapse.all){
                            if(!z.wom_collapse.some){
                                u.click();
                            }else{
                                if(!(ch > z.wom_collapse.limit)){
                                    
                                    u.click();
                                }
                            }
                        }
                    }else{
                        //repost
                        c.innerHTML = "<b>Err: cannot collapse reposts</b>"+c.innerHTML;
                    }
                });
                
                function tog_ex(elem){
                var q = elem.parentElement.querySelector(".prose");
                var l = q.style.display;
                var t = elem;
                if(l=="block"){q.style.display="none";t.innerHTML="Expand"}
                if(l=="none"){q.style.display="block";t.innerHTML="Collapse"}
                }
            }
           
        }
    })
}

chrome.storage.local.get(['wom_white_links']).then((result) => {

    if(result.wom_white_links){
        console.log("white links")
        document.querySelectorAll("pre code a").forEach(element => {
            element.style.color="white";
        })
    }
});

