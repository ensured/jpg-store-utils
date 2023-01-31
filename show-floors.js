

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

let spansPerPage = 25;
let spansLength = 25;
let lastSpanLength = 25;
setInterval( async () => {
    if (document.URL.includes("/marketplace")) {
        let spans = document.querySelectorAll("#asset-card")
        spansLength = spans.length
        if (spansLength > spansPerPage) {
            // console.log("new page")
            let i = spansPerPage
            for (i; i < spansLength; i++) {
                try {
                    if (spans[i-1].querySelector(".floor")) continue;
                    const assetId = spans[i-1].getAttribute('asset_id');
                    const first56Chars = assetId.substring(0, 56);
                    const floor = await getFloor(first56Chars) / 1000000
                    let test = new Number(floor)
                    test = test.toLocaleString("en-US")
                    console.log(test);

                    const footer = document.querySelectorAll(".NFTMarketplaceCard_nftMarketplaceCardFooter__tEife")[i-1]
                    if (footer.querySelector(".floor")) continue;
                    const div = document.createElement("div")
                    div.className = "floor"
                    footer.appendChild(div)
                    div.innerHTML = test ? `Floor: ${test} ADA` : "Floor: 0 ADA"
                } catch (e) {
                    console.log(e)
                }
            }
            spansPerPage = spansLength
        } else {
            // console.log("same page")
            let i = spansPerPage - lastSpanLength
            for (i; i < spansLength; i++) {
                try {
                    if (spans[i-1].querySelector(".floor")) continue;
                    const assetId = spans[i-1].getAttribute('asset_id');
                    const first56Chars = assetId.substring(0, 56);
                    console.log(first56Chars);
                    const floor = await getFloor(first56Chars) / 1000000
                    let test = new Number(floor)
                    test = test.toLocaleString("en-US")
                    
                    const footer = document.querySelectorAll(".NFTMarketplaceCard_nftMarketplaceCardFooter__tEife")[i-1]
                    if (footer.querySelector(".floor")) continue;
                    const div = document.createElement("div")
                    div.className = "floor"
                    footer.appendChild(div)
                    div.innerHTML = test ? `Floor: ${test} ADA` : "Floor: 0 ADA"
                } catch (e) {
                    console.log(e)
                }
            }
            lastSpanLength = spansLength
        }
    }
}, 800);

// setInterval(() => {
//     try {
//         document.querySelector("#app > div.navbar_navContainer__TK0O8 > div.navbar_navWideWrapper__CzLb_ > nav > div:nth-child(4) > div > div.navbar-profile-menu_profileWrapper__AugHX > div > a > div > div > p").innerHTML = "69.420 ADA";
//     } catch (e) {
//         console.log(e)
//     }
// }, 3000);
