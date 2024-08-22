const sheet = document.styleSheets[0];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const text = 'Wasteof Addons';

// Find the existing rule targeting ::-webkit-scrollbar-track
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
    var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / 400; 
    document.querySelector(".header h1").style.left=`calc(100% - ${200-scrollpercent*400}px)`;
    document.querySelector(".header h2").style.left=`${170-scrollpercent*400}px`;
    var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    scrollbarRule.style.backgroundPositionY = scrollpercent * 100 + '%'; 
    var capped = clamp(window.scrollY, 0, 400)/400;
    document.querySelector(".newheader").style.opacity=clamp(1-capped, 0.9, 1);
    document.querySelector(".header").style.opacity=clamp(1-capped, 0.9, 1);
    document.querySelector(".header h2").style.opacity=1-capped;
    document.querySelector(".newheader").style.margin=`${capped*2.5}%`;
    document.querySelector(".newheader").style.width=`${90-capped*5}%`;
    document.querySelector(".newheader").style.webkitBackdropFilter=`blur(${capped*5}px)`;
    document.querySelector(".newheader").style.backdropFilter=`blur(${capped*5}px)`;
    document.querySelector(".newheader").style.height=`${clamp(1-capped, 0.5, 1)*75}px`;
    document.querySelector(".newheader").style.borderRadius=`${capped*10}px`;
    document.querySelector(".header img").style.rotate=`${clamp(capped, 0, 0.5)*(-720)}deg`;
    document.querySelector(".header img").style.width=`${clamp(1-capped, 0.5, 1)*100}px`;
    document.querySelector(".header img").style.left=`${clamp(1-capped, 0.36, 1)*62.5}px`;
    document.querySelector(".header img").style.top=`${clamp(1-capped, 0.36, 1)*62.5}px`;
    document.querySelector(".newheader").innerHTML=text.substring(0, Math.floor(capped*text.length))
});
document.querySelector(".header img").addEventListener("click", function(){
    document.querySelector(".divider").scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
})




//                var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
