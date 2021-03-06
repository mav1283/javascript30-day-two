const secondHand = document.querySelector('.sec-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hr-hand');
const hourt = document.querySelector('.hr-t');
const mint = document.querySelector('.min-t');
const clockTimeTop = document.querySelector('.top-text');
const clockTimeBottom = document.querySelector('.bottom-text');

const leftPad = (val) =>{
    if(val<10) return `0${val}`
    return `${val}`
}

const militaryToStandard = (val) =>{
    if(val >= 0 && val <= 12) {
        return val;
    } else{
        return val - 12;
    }
}

function setDate(){
    
    /* Get the system date */
    const now = new Date();
    
    /* Handle Seconds */
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; /* get the percentage and convert it to based 100 to get the degrees then add 90 to set it straight */
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    /* Handle Minutes */
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    /* Handle Hour */
    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    /* Handle Clock Time */
    const hrTime = leftPad(militaryToStandard(hours));
    const minTime = leftPad(minutes);
    const secTime = leftPad(seconds);


    hourt.textContent = hrTime;
    mint.textContent = minTime;
    clockTimeBottom.textContent = `${secTime} sec`;
}

setInterval(setDate,1000);