const callback = function(mutationsList, observer) {
    var itemsOS = document.querySelectorAll("div[role='gridcell']")
    for (let itemOS of itemsOS){
        if (itemOS.querySelector(".trmRarity") === null){
            try{
                var itemOSid = itemOS.querySelector("article > a").getAttribute("href").split('/').at(-1);
            } catch {
                break;
            }
            let newEl = document.createElement("div");
            newEl.textContent = `Rarity Score: ${itemsData[itemOSid]}`;
            newEl.classList.add("trmRarity")
            itemOS.querySelector("article > a > div > div > div").appendChild(newEl);
        }
    }
};

const observer = new MutationObserver(callback);

document.addEventListener("DOMContentLoaded", async () => {
    const collectionSlug = window.location.pathname.split('/').at(-1);
    const collectionData = await fetch(`https://projects.rarity.tools/static/staticdata/${collectionSlug}.json`, {method: 'GET', mode: 'cors'}).then(r => r.json())
    totalItems = collectionData.items.length;
    itemsData = {};
    for (item of collectionData.items){
        itemsData[item[0]] = 0
        for (let i = 1; i < item.length; i++){
            if (typeof item[i] === 'object'){
                for (let j = 0; j < item[i].length; j++)
                    itemsData[item[0]] += 1 / (collectionData.basePropDefs[i]["pvs"][item[i][j]][1] / totalItems);
            } else 
                itemsData[item[0]] += 1 / (collectionData.basePropDefs[i]["pvs"][item[i]][1] / totalItems);
        }
        itemsData[item[0]] = Math.round(itemsData[item[0]] * 100) / 100
    }
    observer.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: false
    });
});
