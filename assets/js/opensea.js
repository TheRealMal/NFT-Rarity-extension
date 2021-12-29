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
            newEl.textContent = `Rarity Score: ${itemsData[itemOSid].score} | Rank #${itemsData[itemOSid].rank}`;
            newEl.classList.add("trmRarity")
            itemOS.querySelector("article > a > div > div > div").appendChild(newEl);
            let colorAndClass = calcucateColor(itemsData[itemOSid].rank, Object.keys(itemsData).length);
            itemOS.querySelector("article > a > div:nth-child(2)").style.backgroundColor = `${colorAndClass[0]}`;
            itemOS.classList.add(colorAndClass[1]);
            chrome.storage.local.get('nftSettings', function(storage){
                document.documentElement.style.setProperty('--top10-disp', storage.nftSettings.top10 ? "block" : "none");
                document.documentElement.style.setProperty('--top20-disp', storage.nftSettings.top20 ? "block" : "none");
                document.documentElement.style.setProperty('--top40-disp', storage.nftSettings.top40 ? "block" : "none");
                document.documentElement.style.setProperty('--top60-disp', storage.nftSettings.top60 ? "block" : "none");
                document.documentElement.style.setProperty('--top80-disp', storage.nftSettings.top80 ? "block" : "none");
                document.documentElement.style.setProperty('--top100-disp', storage.nftSettings.top100 ? "block" : "none");
            });
        }
    }
};

function calcucateColor(rank, total){
    let x = (rank / total) * 100;
    if (x <= 10){
        return ["#ff54f2d1", "top10"];
    } else if (x <= 20){
        return ["#95ff54d1", "top20"];
    } else if (x <= 40){
        return ["#54dfffd1", "top40"];
    } else if (x <= 60){
        return ["#ffda54d1", "top60"];
    } else if (x <= 80){
        return ["#ff5454d1", "top80"];
    } else {
        return ["", "top100"];
    }
}


const observer = new MutationObserver(callback);

document.addEventListener("DOMContentLoaded", async () => {
    const collectionSlug = window.location.pathname.split('/').at(-1);
    const collectionData = await fetch(`https://projects.rarity.tools/static/staticdata/${collectionSlug}.json`, {method: 'GET', mode: 'cors'}).then(r => r.json())
    totalItems = collectionData.items.length;
    itemsData = {};
    for (item of collectionData.items){
        itemsData[item[0]] = 0;
        for (let i = 1; i < item.length; i++){
            if (typeof item[i] === 'object'){
                for (let j = 0; j < item[i].length; j++)
                    itemsData[item[0]] += 1 / (collectionData.basePropDefs[i]["pvs"][item[i][j]][1] / totalItems);
            } else 
                itemsData[item[0]] += 1 / (collectionData.basePropDefs[i]["pvs"][item[i]][1] / totalItems);
        }
    }
    var items = Object.keys(itemsData).map(function(key) {
        return [key, itemsData[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    for (let i = 1; i < items.length; i++){
        itemsData[items[i][0]] = {score: Math.round(items[i][1] * 100) / 100, rank: i}
    }

    observer.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: false
    });
});
