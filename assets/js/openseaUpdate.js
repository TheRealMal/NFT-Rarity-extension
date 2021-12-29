var itemsOS = document.querySelectorAll("div[role='gridcell']")
for (itemOS of itemsOS){
    let itemOSid = itemOS.querySelector("article > a").getAttribute("href").split('/').at(-1);
    if (itemOS.querySelector(".trmRarity") !== null){
        let newEl = document.createElement("div");
        newEl.classList.add('trmRarity')
        newEl.textContent = `TRM Rank: ${itemsData[itemOSid]}`;
        newEl.style.width = "100%";
        newEl.style.borderBottom = "2px solid rgb(0, 0, 0)";
        itemOS.querySelector("article > a > div > div > div").appendChild(newEl);
    }
}