const sheet = document.styleSheets[0];
const order=["width", "track", "thumb", "radius"];

chrome.storage.local.get(['wom_custom_scrollbar']).then((result) => {
    

    if(result.wom_custom_scrollbar){
        console.log(result)
        document.querySelectorAll("#customise .row input").forEach(element => {
            var eid = Array.from(document.querySelectorAll("#customise .row input")).indexOf(element);
            var scrollbar = result.wom_custom_scrollbar;
            element.value = scrollbar[order[eid]];
        });
        document.querySelector("#export_a").setAttribute("href", "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(result.wom_custom_scrollbar)))
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
        //.querySelector(".content h2").style.color = "#9192e9";
        document.querySelectorAll(".content h3").forEach(element => element.style.color = "#9192e9");
    }else{
        document.querySelector(".content h2").style.color = "#c5c5c5";
    }
}


document.querySelector("#customise").addEventListener("change", a)



function a(){
    var scrollbar = {};
    document.querySelectorAll("#customise .row input").forEach(element => {
        var eid=Array.from(document.querySelectorAll("#customise .row input")).indexOf(element);
        scrollbar[order[eid]] = element.value;
    });
    document.querySelector("#export_a").setAttribute("href", "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(scrollbar)))
    chrome.storage.local.set({'wom_custom_scrollbar': scrollbar});
    localStorage.setItem("wom_custom_scrollbar", JSON.stringify(scrollbar));
}


const importa = document.getElementById("import_i");
importa.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files;
  const reader = new FileReader();
  reader.onload = function() {
    const contents = reader.result;
    var scrollbar = JSON.parse(contents);
    console.log(scrollbar);
    if(!(scrollbar[order[0]] && scrollbar[order[1]] && scrollbar[order[2]] && scrollbar[order[3]])){
        alert("Invalid JSON! Missing keys 'width', 'track', 'thumb', or 'radius'.");
    }else{
        document.querySelectorAll("#customise .row input").forEach(element => {
            var eid = Array.from(document.querySelectorAll("#customise .row input")).indexOf(element);
            element.value = scrollbar[order[eid]];
        });
    }
    a();
  };
  reader.readAsText(fileList[0]);
}
    

