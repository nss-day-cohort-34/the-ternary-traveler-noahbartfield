const API = {
    getPlaces() {
        return fetch("http://localhost:8088/places")
        .then(data => data.json())
    },
    getInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
        .then(data => data.json())
    },
    postInterest(newInterest) {
        return fetch("http://localhost:8088/interests?_expand=place", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInterest)
        })
            .then(data => data.json())
    },
    deleteInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`,
            {
                "method": "DELETE"
            }
        )
            .then(data => data.json())
    },
    editInterest(interestId, updatedInterest) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInterest)
        })
            .then(data => data.json())
    }
}

export default API