(function(){
    var t = document.createElement("script");
    t.type="text/javascript";
    t.async=!0;
    t.src="https://vk.com/js/api/openapi.js?167";
    t.onload=function(){
        VK.Retargeting.Init("VK-RTRG-245296-ebffg");
        VK.Retargeting.Hit()
    };
    document.head.appendChild(t);
})();
