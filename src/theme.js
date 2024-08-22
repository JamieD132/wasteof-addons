const sheet = document.styleSheets[0];
const names = ["default", "pink", "red", "green"];
const presets = {
    "default": [
                 '#eef2ff',
                 '#e0e7ff',
                 '#c7d2fe',
                 '#a5b4fc',
                 '#818cf8',
                 '#6366f1',
                 '#4f46e5',
                 '#4338ca',
                 '#3730a3',
                 '#312e81',
                 '#1e1b4b'   
               ],
    "pink": [
              '#fff4ff',
              '#ffd8ff',
              '#ffc0ff',
              '#fba6fb',
              '#f688f6',
              '#f86cf8',
              '#fc47fc',
              '#d927d9',
              '#950695',
              '#560056',
              '#2a012a'
    ],
    "red": [
              '#fff4f4',
              '#ffd8d8',
              '#ffc0c0',
              '#fba6a6',
              '#f68888',
              '#f86c6c',
              '#fc4747',
              '#d92727',
              '#950000',
              '#560000',
              '#2a0000'
    ],
    "green": [
              '#f4fff4',
              '#d8ffd8',
              '#c0ffc0',
              '#a6fba6',
              '#88f688',
              '#6cf86c',
              '#47fc47',
              '#27d927',
              '#006950',
              '#005600',
              '#002a00'
    ],

}
 // Save it using the Chrome extension storage API.
 

  // Read it using the storage API
chrome.storage.local.get(['wom_theme_palette']).then((result) => {
    

    if(result.wom_theme_palette){
        document.querySelectorAll(".content .disabled .palette input").forEach(element => {
            var eid = Array.from(document.querySelectorAll(".content .disabled .palette input")).indexOf(element);
            var palette = result.wom_theme_palette;
            element.value = palette[eid];
        });
        document.querySelector("#export_a").setAttribute("href", "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(result.wom_theme_palette)))
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
        document.querySelector(".content .disabled .palette").style.backgroundColor = "#9192e9";
        document.querySelectorAll(".content .disabled .palette input[type='color']").forEach(element => element.style.cursor = "pointer");
        document.querySelectorAll(".content .disabled .palette input[type='color']").forEach(element => element.removeAttribute("disabled"));
        document.querySelector(".content .disabled .presets").style.backgroundColor = "#9192e9";
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.style.borderColor = "#9192e9");
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.style.color = "#9192e9");
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.style.cursor = "pointer");
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.addEventListener("click", function(){
            var pre = element.innerHTML;
            document.querySelectorAll(".content .disabled .palette input").forEach(elem => {
                var eid = Array.from(document.querySelectorAll(".content .disabled .palette input")).indexOf(elem);
                elem.value = presets[pre.toLowerCase()][eid];
            });
            a();
        }));
    }else{
        document.querySelector(".content h2").style.color = "#c5c5c5";
        document.querySelectorAll(".content h3").forEach(element => element.style.color = "#c5c5c5");
        document.querySelector(".content .disabled .palette").style.backgroundColor = "#c5c5c5";
        document.querySelectorAll(".content .disabled .palette input[type='color']").forEach(element => element.style.cursor = "not-allowed");
        document.querySelectorAll(".content .disabled .palette input[type='color']").forEach(element => element.setAttribute("disabled", ""));
        document.querySelector(".content .disabled .presets").style.backgroundColor = "#c5c5c5";
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.style.borderColor = "#c5c5c5");
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.style.color = "#c5c5c5");
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.style.cursor = "not-allowed");
        document.querySelectorAll(".content .disabled .presets .preset").forEach(element => element.removeEventListener("click", function(){
            a();
            var pre = element.innerHTML;
            document.querySelectorAll(".content .disabled .palette input").forEach(elem => {
                var eid = Array.from(document.querySelectorAll(".content .disabled .palette input")).indexOf(elem);
                elem.value = presets[pre.toLowerCase()][eid];
            });
        }));
    }
}
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

document.querySelector(".content .disabled .palette").addEventListener("change", a)



function a(){
    var palette = [];
    document.querySelectorAll(".content .disabled .palette input").forEach(element => {
        palette.push(element.value);
    });
    document.querySelector("#export_a").setAttribute("href", "data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(palette)))
    chrome.storage.local.set({'wom_theme_palette': palette});
    localStorage.setItem("wom_theme_palette", JSON.stringify(palette));
}


const importa = document.getElementById("import_i");
importa.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files;
  const reader = new FileReader();
  reader.onload = function() {
    const contents = reader.result;
    var palette = JSON.parse(contents);
    console.log(palette);
    if(palette.length != 11){
        alert("Invalid JSON! Please upload a file downloaded from here or a list of 10 colors.");
    }else{
        document.querySelectorAll(".content .disabled .palette input").forEach(element => {
            var eid = Array.from(document.querySelectorAll(".content .disabled .palette input")).indexOf(element);
            element.value = palette[eid];
        });
    }
    a();
  };
  reader.readAsText(fileList[0]);
}
    

