const sheet = document.styleSheets[0];

chrome.storage.local.get(['wom_buttons']).then((result) => {
    if(result.wom_buttons){
        var buttons = result.wom_buttons;
        var t = "";
        buttons.forEach(b => {
            id = buttons.indexOf(b);
            t+=`
            <div id="row${id}" class="row">
                <input type="text" class="hbuttont" placeholder="button text" value="${b[0]}" id="t${id}">
                <input type="text" class="hbuttonl" placeholder="button link" value="${b[1]}" id="l${id}">
                <button class="hbuttonr" toremove=${id} id="r${id}">Remove</button>
            </div>
            `;
            document.getElementById("containrows").innerHTML = t;
            console.log(document.getElementById("r"+id))
            document.getElementById("r"+id).addEventListener("click", function(){r(this.getAttribute("toremove"))})
        });
        
    }else{
        chrome.storage.local.set({'wom_buttons': [["Home","/"],["Explore","/explore"]]})
        chrome.storage.local.get(['wom_buttons']).then((result) => {
            if(result.wom_buttons){
                var buttons = result.wom_buttons;
                var t = "";
                buttons.forEach(b => {
                    id = buttons.indexOf(b);
                    t+=`
                    <div id="row${id}" class="row">
                        <input type="text" class="hbuttont" placeholder="button text" value="${b[0]}" id="t${id}">
                        <input type="text" class="hbuttonl" placeholder="button link" value="${b[1]}" id="l${id}">
                        <button class="hbuttonr" toremove=${id} id="r${id}">Remove</button>
                    </div>
                    `;
                    document.getElementById("containrows").innerHTML = t;
                    console.log(id);
                    document.getElementById("r"+id).addEventListener("click", function(){r(this.getAttribute("toremove"))})
                });
            }
        })
    }
});

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
        //document.querySelector(".content h2").style.color = "#9192e9";
        document.querySelectorAll(".content h3").forEach(element => element.style.color = "#9192e9");
    }else{
        document.querySelector(".content h2").style.color = "#c5c5c5";
    }
}

/*document.querySelectorAll(".hbuttonr").forEach(element => {
    console.log()
    element.addEventListener("click", r(element.getAttribute("toremove")))
})*/

function r(tr){
    
    console.log(tr);
    chrome.storage.local.get(['wom_buttons']).then((result) => {
        var buttons = result.wom_buttons;
        buttons.splice(tr, 1);
        chrome.storage.local.set({'wom_buttons': buttons});
        document.getElementById("row"+tr).remove();
    })
    
    //a();
}

/*
document.querySelector(".content").addEventListener("change", a)


function a(){
    var links = {};
    links.enabled = document.querySelector("#switch").checked;
    chrome.storage.local.set({'wom_white_links': links});
    localStorage.setItem("wom_white_links", JSON.stringify(links));
}

*/

    

