import factoryFuncs from "./factory.js"

const render = {
    renderInterests(interests) {
        const italyContainer = document.querySelector("#italyContainer")
        const switzerlandContainer = document.querySelector("#switzerlandContainer")
        const franceContainer = document.querySelector("#franceContainer")

        italyContainer.innerHTML = ""
        switzerlandContainer.innerHTML = ""
        franceContainer.innerHTML = ""
        interests.forEach(interest => {
            if(interest.place.name === "Italy") {
                if (interest.review !== "") {
                    const italyInterestHTML = factoryFuncs.createInterest(interest)
                    italyContainer.innerHTML += italyInterestHTML
                } else {
                    const italyInterestHTML = factoryFuncs.createInterestWithoutReview(interest)
                    italyContainer.innerHTML += italyInterestHTML
                }
            } else if (interest.place.name === "Switzerland") {
                if (interest.review !== "") {
                    const switzerlandInterestHTML = factoryFuncs.createInterest(interest)
                    switzerlandContainer.innerHTML += switzerlandInterestHTML
                } else {
                    const switzerlandInterestHTML = factoryFuncs.createInterestWithoutReview(interest)
                    switzerlandContainer.innerHTML += switzerlandInterestHTML
                }
            } else if (interest.place.name === "France") {
                if (interest.review !== "") {
                    const franceInterestHTML = factoryFuncs.createInterest(interest)
                    franceContainer.innerHTML += franceInterestHTML
                } else {
                    const franceInterestHTML = factoryFuncs.createInterestWithoutReview(interest)
                    franceContainer.innerHTML += franceInterestHTML
                }
            }
        });
    }
}

export default render