const sheet = document.styleSheets[0];

chrome.storage.local.get(['wom_white_links']).then((result) => {
    

    if(result.wom_white_links){
        console.log(result)
        var links = result.wom_white_links;
        console.log(links);
        if(links.enabled){
            document.getElementById("click").click();
        }
    }

})

let scrollbarRule;
for (let i = 0; i < sheet.cssRules.length; i++) {
  const rule = sheet.cssRules[i];
  console.log(rule)
  if (rule.selectorText === '::-webkit-scrollbar-thumb') {
    scrollbarRule = rule;
    break;
  }
}

document.addEventListener("scroll", function(){
    var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    scrollbarRule.style.backgroundPositionY = scrollpercent * 100 + '%'; 
})


setcolforall(true);
function setcolforall(checked){
    localStorage.setItem("wom_theme_enabled", checked);
    if(checked){
        document.querySelector(".content h2").style.color = "#9192e9";
        document.querySelectorAll(".content h3").forEach(element => element.style.color = "#9192e9");
    }else{
        document.querySelector(".content h2").style.color = "#c5c5c5";
    }
}


document.querySelector(".content").addEventListener("change", a)



function a(){
    var links = {};
    links.enabled = document.querySelector("#switch").checked;
    chrome.storage.local.set({'wom_white_links': links});
    localStorage.setItem("wom_white_links", JSON.stringify(links));
}



    

