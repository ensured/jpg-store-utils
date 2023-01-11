

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


let spansPerPage = 24;
let spansLength = 24;
let lastSpanLength = 24;
setInterval( async () => {
    if (document.URL.includes("/marketplace")) {
        let loadedSpans = document.querySelectorAll("#marketplace > div.infinite-scroll-component__outerdiv > div > div.grid.styles_cardsContainer__5WYMt > span")
        spansLength = loadedSpans.length
        if (spansLength > spansPerPage) {
            // console.log("new page")
            let i = spansPerPage
            for (i; i < spansLength; i++) {
                try {
                    if (loadedSpans[i-1].querySelector(".floor")) continue;
                    const policy = document.querySelector(`#marketplace > div.infinite-scroll-component__outerdiv > div > div.grid.styles_cardsContainer__5WYMt > span:nth-child(${i}) > div > a`).href.split("/")[4].slice(0,56)
                    const floor = await getFloor(policy) / 1000000
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
                    if (loadedSpans[i-1].querySelector(".floor")) continue;
                    const policy = document.querySelector(`#marketplace > div.infinite-scroll-component__outerdiv > div > div.grid.styles_cardsContainer__5WYMt > span:nth-child(${i}) > div > a`).href.split("/")[4].slice(0,56)
                    const floor = await getFloor(policy) / 1000000
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
            lastSpanLength = spansLength
        }
    }
}, 800);
