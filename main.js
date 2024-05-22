function setMinDate() {

    let todayDate = new Date().toISOString().split("T")[0]

    let theDate = document.getElementById("date")

    theDate.setAttribute("placeholder", `Minimum date is Today!`)

    theDate.onclick = () => {if (theDate.value < todayDate) theDate.value = todayDate}

}
setMinDate()

function addEvent() {

    let theName = document.getElementById("name").value
    let theOrganiser = document.getElementById("organiser").value
    let theDate = document.getElementById("date").value

    // Get time in millisecond from Epoch Time for theDate
    let eventTimeStamp = new Date(theDate).getTime()
    // Start of time --------- today --------- event date = event date - today
    // Start of time --------- Ex: 20000 --------- 30000 = 30000 - 20000 = 10000

    if (theName && theOrganiser && theDate) {
        
        // Create event object
        const theEventIs = {
    
            eventName: theName,
            eventOrganiser: theOrganiser,
            eventDate: theDate,
            eventTime: eventTimeStamp,
    
        }
    
        let myEvent = JSON.parse(localStorage.getItem("events")) || []
    
        myEvent.push(theEventIs)
    
        localStorage.setItem("events", JSON.stringify(myEvent))
    
        let inputs = document.querySelectorAll("input:not([type='button'])")
    
        inputs.forEach(input => {input.value = ""})
    
        displayEvents()

    } else {
        
        swal.fire({

            title: "Opsss!",
            text: "Please, fill up the fields",
            icon: "info",
            iconColor: "#FF3366",
            timer: 3000,
            confirmButtonColor: "#FF3366",
            color: "#2Ec4b6",

        })

    }

}

function displayEvents() {

    let events = JSON.parse(localStorage.getItem("events")) || []

    let eventsBox = document.querySelector(".events-box")
    eventsBox.innerHTML = ""

    events.forEach((event, i) => {

        let now = new Date().getTime()
        let leftTime = event.eventTime - now

        let days = Math.floor(leftTime / (1000 * 60 * 60 * 24)) // Get the days
        let hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) // Get the hours
        let minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60)) // Get the minutes
        let seconds = Math.floor((leftTime % (1000 * 60)) / 1000) // Get the seconds

        let countDown

        if (days >= 0) {
            countDown = `${days}d ${hours}h ${minutes}m ${seconds}s`
        } else if (days === -1) {
            countDown = `Today`
        } else {
            countDown = `This is too late!`
        }
        
        eventsBox.innerHTML += `
            <div class="event">
                <h3>${event.eventName}</h3>
                <div><b>By</b> ${event.eventOrganiser}</div>
                <div><b>On</b> ${event.eventDate}</div>
                <div><b>Left time</b> ${countDown}</div>
                <button onclick="deleteEvent(${i})">Delete</button>
            </div>
        `
    })

}
displayEvents()

function deleteEvent(number) {

    let events = JSON.parse(localStorage.getItem("events"))

    events.splice(number, 1)

    localStorage.setItem("events", JSON.stringify(events))

    displayEvents()
    
}

setInterval(displayEvents, 1000)

function myInformation(myInfo) {

    myInfo = document.createElement("div")
    myInfo.className = `my-info`

    let xLink = document.createElement("a")
    xLink.href = "https://twitter.com/AhmadAlhadidi95"
    xLink.target = "_blank"
    xLink.rel = "noopener noreferrer"
    xLink.title = "Visit my Twitter (X)"

    let xIcon = document.createElement("i")
    xIcon.className = `fa-brands fa-x-twitter`

    xLink.appendChild(xIcon)

    let myLogo = document.createElement("img")
    myLogo.src = `My-sign.png`
    myLogo.alt = `My-sign`
    myLogo.title = `Ahmad Alhadidi`
    myLogo.style.width = `50px`

    let githubLink = document.createElement("a")
    githubLink.href = "https://github.com/AhmadAlhadidi95"
    githubLink.target = "_blank"
    githubLink.rel = "noopener noreferrer"
    githubLink.title = "Visit my Github"

    let githubIcon = document.createElement("i")
    githubIcon.className = `fa-brands fa-github`

    githubLink.appendChild(githubIcon)

    myInfo.append(xLink, myLogo, githubLink)

    return myInfo

}

document.body.appendChild(myInformation())