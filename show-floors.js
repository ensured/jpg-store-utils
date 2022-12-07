// Select the entire DOM for observing
const target = document.querySelector('body');

// Create a new observer instance
const observer = new MutationObserver(function() {
    if (document.querySelector("#marketplace > div.infinite-scroll-component__outerdiv > div > div.grid.styles_cardsContainer__5WYMt")) {
        // Do something with new div element
    }
});

// Set configuration object
const config = { childList: true };

// Start the observer
observer.observe(target, config);

const getFloor = async (policyId) => {
    const response = await fetch(`https://server.jpgstoreapis.com/collection/${policyId}/floor`)
    const data = await response.json()
    return data.floor
}

// Create the mutation we are listening out for
setInterval( async () => { 
    if (document.URL.includes("/marketplace")) {
        const spans = document.querySelectorAll("#marketplace > div.infinite-scroll-component__outerdiv > div > div.grid.styles_cardsContainer__5WYMt > span")
        for (let i = 1; i < spans.length; i++) {
            const policy = document.querySelector(`#marketplace > div.infinite-scroll-component__outerdiv > div > div.grid.styles_cardsContainer__5WYMt > span:nth-child(${i}) > div > a`).href.split("/")[4].slice(0,56)
            const floor = await getFloor(policy)
            const footer = document.querySelectorAll(".NFTMarketplaceCard_nftMarketplaceCardFooter__tEife")[i-1]
            const floorDiv = document.querySelectorAll(".NFTMarketplaceCard_nftMarketplaceCardFooter__tEife > div#floor")
            if (floorDiv[i-1]) {
                floorDiv[i-1].remove()
            }
            const div = document.createElement("div")
            div.id = 'floor'
            footer.appendChild(div)
            div.innerHTML = floor ? `Floor: ${floor/1000000} ADA` : "Floor: 0 ADA"
        }
    }    
},3000);



// Deprecated

// let fetchUrl = 'https://server.jpgstoreapis.com/search/tokens?policyIds=[]&saleType=default&sortBy=recently-listed&traits=%7B%7D&nameQuery=&verified=should-be-verified&pagination=%7B%7D&size=24'

// function loadDate() {
//     fetch(fetchUrl, {
//         "headers": {
//             "accept": "application/json, text/plain, */*",
//             "accept-language": "en-US,en;q=0.9",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "cross-site",
//             "sec-gpc": "1"
//         },
//         "referrer": "https://www.jpg.store/",
//         "referrerPolicy": "strict-origin-when-cross-origin",
//         "body": null,
//         "method": "GET",
//         "mode": "cors",
//         "credentials": "omit"
//     }).then(function(response) {
//         return response.json().then(function(res) {
//             const items = res.tokens
//             for (let i = 0; i < items.length; i++) {
//                 const banners = document.getElementsByClassName("NFTMarketplaceCard_nftMarketplaceCardFooter__tEife")
//                 for (let j = 0; j < banners.length; j++) {
//                     const banner = banners[i]
//                     listed_at = items[i].listed_at
//                     var localDate = new Date(listed_at);
//                     var utcDate = new Date(localDate.toUTCString());
//                     var localDate = new Date(utcDate.toLocaleString());
//                     //  select only the time from the datetime object above
//                     var time = localDate.toLocaleTimeString();
//                     banner.innerHTML = time

//                 }
//             }
//         });
//     });
// }

// if (document.URL.includes("/marketplace")) {
//     loadDate()
// }

// let sliderValueElem = document.createElement("div");
// let inputRange = document.createElement("input");
// let stopBtn = document.createElement("button");


// // remove useless element space
// const marketplaceP = document.querySelector("#marketplace > p")
// marketplaceP.style.marginBottom = "0px";
// document.querySelector("#filter-bar").style.display = "none";


// document.querySelector("#marketplace > h1").remove();
// document.querySelector("#marketplace > p > b").remove();
// marketplaceP.textContent = "";
// marketplaceP.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
// marketplaceP.style.border = "1px solid rgba(255, 255, 255, 0.15)";
// marketplaceP.style.color = "white";
// marketplaceP.style.padding = "10px";
// marketplaceP.style.marginBottom = "10px";
// marketplaceP.style.borderRadius = "8px";
// marketplaceP.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.75)";

// stopBtn.type = "submit";
// stopBtn.textContent = "STOP";
// stopBtn.style.border = "1px solid rgba(255, 255, 255, 0.55)";
// stopBtn.style.color = "#e5bc27";
// stopBtn.style.borderRadius = "4px";
// stopBtn.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.75)";
// stopBtn.style.padding = "5px 15px;";
// stopBtn.style.cursor = "pointer";
// stopBtn.style.backgroundColor = "#382e00";
// stopBtn.style.fontWeight = "600";

// let spacer = document.createElement("div");
// inputRange.type = "range";
// inputRange.display = "block";
// inputRange.textContent = "Refresh";

// inputRange.className = "range";

// inputRange.min = "2";
// inputRange.max = "10";
// inputRange.value = "4";
// inputRange.step = ".1";
// marketplaceP.appendChild(spacer);
// marketplaceP.appendChild(spacer);
// marketplaceP.appendChild(inputRange);
// marketplaceP.appendChild(sliderValueElem);
// marketplaceP.appendChild(stopBtn);
// sliderValueElem.innerHTML = `${inputRange.value} seconds`;
// sliderValueElem.style.marginBottom = '6px';
// sliderValueElem.style.marginTop = '-6px';
// sliderValueElem.style.fontSize = "14px";


// let sleepValue = 5000;
// var intervalId;


// function startInterval(value) {
//     intervalId = setInterval(function() {
//         if (location.href.includes("/marketplace")) {
//             if (document.querySelector("#filter-bar > div > div:nth-child(4) > div.properties-modal.border.border-radius-4 > div > div:nth-child(3)")) {
//                 document.querySelector("#filter-bar > div > div:nth-child(4) > div.properties-modal.border.border-radius-4 > div > div:nth-child(3)").click()
//                 loadDate()
//             } else {
//                 console.log("no element to refresh items");
//                 clearInterval(intervalId);
//             }
//         }
//     }, value);
// }

// stopBtn.addEventListener("click", function() {
//     if (stopBtn.innerText == "STOP") {
//         document.querySelector("#filter-bar").style.display = "block";
//         clearInterval(intervalId);
//         stopBtn.innerText = "START";
//         stopBtn.style.backgroundColor = "green";
//     } else if (stopBtn.innerText == "START") {
//         document.querySelector("#filter-bar").style.display = "none";
//         stopBtn.style.backgroundColor = "#382e00";
//         startInterval(sleepValue);
//         stopBtn.innerText = "STOP";
//     }
// });

// inputRange.addEventListener("input", function() {
//     sliderValueElem.innerHTML = `${inputRange.value} seconds`;
//     if (document.querySelector("#marketplace > p > button").innerText == "START") {
//         clearInterval(intervalId);
//     } else {
//         sleepValue = inputRange.value * 1000;
//         clearInterval(intervalId);
//         startInterval(sleepValue);
//     }
// });

// startInterval(sleepValue);