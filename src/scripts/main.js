import API from "./data.js"
import render from "./dom.js"
import factoryFuncs from "./factory.js"

const italyContainer = document.querySelector("#italyContainer")
const switzerlandContainer = document.querySelector("#switzerlandContainer")
const franceContainer = document.querySelector("#franceContainer")
const placesContainer = document.querySelector("#placesContainer")

const addInterest = document.querySelector("#addInterest")

const dialogBox = document.querySelector("#dialogBox")
const addReviewDialog = document.querySelector("#addReviewDialog")
const deleteDialogBox = document.querySelector("#deleteDialogBox")
const confirmDeleteButton = document.querySelector("#confirmDeleteButton")
const cancelDelete = document.querySelector("#cancelDelete")
const saveInterest = document.querySelector("#saveInterest")
const cancelInterest = document.querySelector("#cancelInterest")
const saveReview = document.querySelector("#saveReview")
const cancelReview = document.querySelector("#cancelReview")

const nameInput = document.querySelector("#nameInput")
const descriptionInput = document.querySelector("#descriptionInput")
const costInput = document.querySelector("#costInput")
const reviewInput = document.querySelector("#reviewInput")
const countryInput = document.querySelector("#countryInput")
const hiddenField = document.querySelector("#hiddenInterestID")
const reviewName = document.querySelector("#reviewName")

const nameName = document.querySelector("#nameName")
const descritpionName = document.querySelector("#descritpionName")
const costName = document.querySelector("#costName")
const countryName = document.querySelector("#countryName")




API.getInterests().then(interests => {
    render.renderInterests(interests)
})

addInterest.addEventListener("click", () => {
    reviewInput.style.display = "none"
    reviewName.style.display = "none"
    nameName.style.display = "inline-block"
    nameInput.style.display = "inline-block"
    descritpionName.style.display = "inline-block"
    descriptionInput.style.display = "inline-block"
    countryName.style.display = "inline-block"
    countryInput.style.display = "inline-block"
    dialogBox.show()
})

cancelInterest.addEventListener("click", () => {
    dialogBox.close()
    hiddenField.value = ""
    nameInput.value = ""
    descriptionInput.value = ""
    costInput.value = ""
    reviewInput.value = ""
    countryInput.value = ""
    saveInterest.innerHTML = "Save"

})

saveInterest.addEventListener("click", () => {
    const whichCountryNumber = (place) => {
        if (countryInput.value === "Italy") {
            return 1
        } else if (countryInput.value === "Switzerland") {
            return 2
        } else if (countryInput.value === "France") {
            return 3
        }
    }
    const newInterest = {
        name: nameInput.value,
        description: descriptionInput.value,
        cost: costInput.value,
        review: reviewInput.value,
        placeId: whichCountryNumber(countryInput.value)
    }
    // const hiddenField = document.querySelector("#hiddenInterestID")
    if (hiddenField.value !== "" && countryInput.value !== "") {
        API.editInterest(hiddenField.value, newInterest)
            .then(() => {
                API.getInterests().then(interests => {
                    render.renderInterests(interests)
                })
                hiddenField.value = ""
                nameInput.value = ""
                descriptionInput.value = ""
                costInput.value = ""
                reviewInput.value = ""
                dialogBox.close()
                saveInterest.innerHTML = "Save"
            }
            )
    } else if (countryInput.value !== ""){
        API.postInterest(newInterest).then(() => {
            API.getInterests().then(interests => {
                render.renderInterests(interests)
            })
            nameInput.value = ""
            descriptionInput.value = ""
            costInput.value = ""
            // reviewInput.value = ""
            dialogBox.close()
            saveInterest.innerHTML = "Save"
            reviewInput.style.display = "inline-block"
            reviewName.style.display = "inline-block"
        })
    } else {
        alert("Must Choose Country")
    }
})


placesContainer.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteInterest")) {
        const interestId = event.target.id.split("--")[1]
        console.log(interestId)
        deleteDialogBox.show()
        confirmDeleteButton.addEventListener("click", () => {
            API.deleteInterest(interestId)
                .then(() => {
                    API.getInterests().then(interests => {
                        render.renderInterests(interests)
                    })
                })
                deleteDialogBox.close()
        })
        cancelDelete.addEventListener("click", () => {
            deleteDialogBox.close()
        })
    }
})

// populate form with previously written event for editing
const populateDialogToEdit = (interestId) => {
    const whichCountry = (placeId) => {
        if (placeId === 1) {
            return "Italy"
        } else if (placeId === 2) {
            return "Switzerland"
        } else if (placeId === 3) {
            return "France"
        }
    }
    fetch(`http://localhost:8088/interests/${interestId}`)
        .then(data => data.json())
        .then(interest => {
            if (interest.review === "") {
                hiddenField.value = interest.id
                nameInput.value = interest.name
                descriptionInput.value = interest.description
                costInput.value = interest.cost
                reviewInput.value = interest.review
                countryInput.value = whichCountry(interest.placeId)
                reviewInput.style.display = "inline-block"
                reviewName.style.display = "inline-block"
                nameName.style.display = "none"
                nameInput.style.display = "none"
                descritpionName.style.display = "none"
                descriptionInput.style.display = "none"
                countryName.style.display = "none"
                countryInput.style.display = "none"
                dialogBox.show()
                saveInterest.innerHTML = "Edit"
            } else {
                hiddenField.value = interest.id
                nameInput.value = interest.name
                descriptionInput.value = interest.description
                costInput.value = interest.cost
                reviewInput.value = interest.review
                countryInput.value = whichCountry(interest.placeId)
                reviewInput.style.display = "inline-block"
                reviewName.style.display = "inline-block"
                nameName.style.display = "inline-block"
                nameInput.style.display = "inline-block"
                descritpionName.style.display = "inline-block"
                descriptionInput.style.display = "inline-block"
                countryName.style.display = "inline-block"
                countryInput.style.display = "inline-block"
                dialogBox.show()
                saveInterest.innerHTML = "Edit"
            }
        })
}


// edit
placesContainer.addEventListener("click", event => {
    if (event.target.id.startsWith("editInterest")) {
        const interestId = event.target.id.split("--")[1]
        populateDialogToEdit(interestId)
    }
})
