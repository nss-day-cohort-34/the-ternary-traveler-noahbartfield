

const factoryFuncs = {


    createInterest(interestObj) {
        return `
        <section class="interestContainer completed">
            <h2 class="interestNameOnCard">${interestObj.name}</h2>
            <p>${interestObj.description}</p>
            <p>$${interestObj.cost}</p>
            <p class="reviewContent">${interestObj.review}</p>
            <p>${interestObj.place.name}</p>
            <button class="editInterestButton" id="editInterest--${interestObj.id}">Edit</button>
            <button class="editInterestDeleteButton" id="deleteInterest--${interestObj.id}">Delete</button>
        </section>
        `
    },
    createInterestWithoutReview(interestObj) {
        return `
        <section class="interestContainer inProgress">
            <h2 class="interestNameOnCard">${interestObj.name}</h2>
            <p>${interestObj.description}</p>
            <p class="costWithoutReview">$${interestObj.cost}</p>
            <p>${interestObj.place.name}</p>
            <button class="addReviewButton" id="editInterest--${interestObj.id}">Add Review</button>
            <button class="addReviewDeleteButton" id="deleteInterest--${interestObj.id}">Delete</button>
        </section>
        `
    }
}

export default factoryFuncs