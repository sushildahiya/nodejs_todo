let deleteBtn = document.querySelectorAll("#delete-task-btn")
let markComplete = document.querySelectorAll("#mark-complete")

let date = document.getElementById('date-txt')
let month = document.getElementById('month-txt')

/**
 * Function converts the integer month to alphabetical month
 * @param {*} x 
 * @returns 
 */
function monthConversion(x) {
    switch (x) {
        case 0:
            return 'January'
        case 1:
            return 'Feburary'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
        default:
            return ""
    }
}

/**
 * Event handler to handle click on delete buttons
 */
deleteBtn.forEach((item) => {
    item.addEventListener('click', async (e) => {
        await fetch('/todo/delete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: e.target.getAttribute('data-id')
            })
        })
        location.reload()
    })

})
/**
 * Event handler to handle click on mark complete button
 */
markComplete.forEach((item)=>{
    item.addEventListener('click',async(e)=>{
        console.log("indsie")
        await fetch('/todo/complete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: e.target.getAttribute('data-id')
            })
        })
        location.reload()
    })
})

/**
 * Fethcing the current date and month and setting it
 */
date.innerHTML = new Date().getDate()
month.innerHTML = monthConversion(new Date().getMonth())
/**
 * Fetching date and time every hour for updation
 */
function dateClock() {
    date.innerHTML = new Date().getDate()
    month.innerHTML = monthConversion(new Date().getMonth())
}
setInterval(dateClock, 3600000)
