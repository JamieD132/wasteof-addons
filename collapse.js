const sheet = document.styleSheets[0];

chrome.storage.local.get(['wom_collapse']).then((result) => {
    

    if(result.wom_collapse){
        console.log(result)
        var collapse = result.wom_collapse;
        console.log(collapse);
        if(collapse.enabled){
            document.getElementById("click").click();
        }
        document.getElementById("limit").value = collapse.limit;
        document.getElementById("collapse").checked = collapse.all ? "checked" : "";
        document.getElementById("some").checked = collapse.some ? "checked" : "";
        document.querySelector("#export_a").setAttribute("href", "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(collapse)))
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
    var collapse = {};
    collapse.enabled = document.querySelector("#switch").checked;
    collapse.limit = document.querySelector("#limit").value;
    collapse.all = document.querySelector("#collapse").checked;
    collapse.some = document.querySelector("#some").checked;
    chrome.storage.local.set({'wom_collapse': collapse});
    localStorage.setItem("wom_collapse", JSON.stringify(collapse));
    document.querySelector("#export_a").setAttribute("href", "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(collapse)))
}


const importa = document.getElementById("import_i");
importa.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files;
  const reader = new FileReader();
  reader.onload = function() {
    const contents = reader.result;
    var collapse = JSON.parse(contents);
    //console.log(collapse);
    if(!(scrollbar.enabled && scrollbar.limit && scrollbar.all && scrollbar.some)){
        alert("Invalid JSON! Missing keys 'enabled', 'limit', 'all', or 'some'.");
    }else{
        if(collapse.enabled){
            document.getElementById("click").click();
        }
        document.getElementById("limit").value = collapse.limit;
        document.getElementById("collapse").checked = collapse.all ? "checked" : "";
        document.getElementById("some").checked = collapse.some ? "checked" : "";
    }
    a();
  };
  reader.readAsText(fileList[0]);
}
    

