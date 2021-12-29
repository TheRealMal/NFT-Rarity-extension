document.addEventListener("DOMContentLoaded", function(){
    let storageOptions = {};
    chrome.storage.local.get('nftSettings', function(storage){
        document.querySelector('input#top10').checked = storage.nftSettings.top10;
        document.querySelector('input#top20').checked = storage.nftSettings.top20;
        document.querySelector('input#top40').checked = storage.nftSettings.top40;
        document.querySelector('input#top60').checked = storage.nftSettings.top60;
        document.querySelector('input#top80').checked = storage.nftSettings.top80;
        document.querySelector('input#top100').checked = storage.nftSettings.top100;
        storageOptions = storage.nftSettings;
    });
    document.querySelector("input#top10").addEventListener('change', function(){
        storageOptions.top10 = this.checked;
        chrome.storage.local.set({'nftSettings': storageOptions}, function(){});
        chrome.runtime.sendMessage({message: "changeDisplay", class: "top10", show: this.checked}, function(response){});
    });
    document.querySelector("input#top20").addEventListener('change', function(){
        storageOptions.top20 = this.checked;
        chrome.storage.local.set({'nftSettings': storageOptions}, function(){});
        chrome.runtime.sendMessage({message: "changeDisplay", class: "top20", show: this.checked}, function(response){});
    });
    document.querySelector("input#top40").addEventListener('change', function(){
        storageOptions.top40 = this.checked;
        chrome.storage.local.set({'nftSettings': storageOptions}, function(){});
        chrome.runtime.sendMessage({message: "changeDisplay", class: "top40", show: this.checked}, function(response){});
    });
    document.querySelector("input#top60").addEventListener('change', function(){
        storageOptions.top60 = this.checked;
        chrome.storage.local.set({'nftSettings': storageOptions}, function(){});
        chrome.runtime.sendMessage({message: "changeDisplay", class: "top60", show: this.checked}, function(response){});
    });
    document.querySelector("input#top80").addEventListener('change', function(){
        storageOptions.top80 = this.checked;
        chrome.storage.local.set({'nftSettings': storageOptions}, function(){});
        chrome.runtime.sendMessage({message: "changeDisplay", class: "top80", show: this.checked}, function(response){});
    });
    document.querySelector("input#top100").addEventListener('change', function(){
        storageOptions.top100 = this.checked;
        chrome.storage.local.set({'nftSettings': storageOptions}, function(){});
        chrome.runtime.sendMessage({message: "changeDisplay", class: "top100", show: this.checked}, function(response){});
    });
})