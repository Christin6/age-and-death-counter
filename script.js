// get date at the moment
let yearNow = new Date().getFullYear();
let monthNow = new Date().getMonth() + 1;
let dateNow = new Date().getDate();

// create "happy birthday" in the console if today is user's birthday
function createCake(age) {
    console.log("-------- , , , , -------- ");
    console.log("------- |-|-|-| -------" );
    console.log("-------| happy |-------- ");
    console.log("------| birthday |------");
    console.log("---- |************|----- ");
    console.log("--- |**************|-----");

    let gifts = ["🎁🎁"];
    do {
        gifts.push("🎁");
    } while (gifts.length <= age);
    gifts.shift();
    gifts.pop();
    console.log(...gifts);

    let partyPoppers = [];
    while (partyPoppers.length < age) {
        partyPoppers.push("🎉");
    }
    console.log(...partyPoppers)
}

// calculate the user's age
function calculateAge(yearInput, monthInput, dateInput) { // all inputs are in number
    let age = [];
    let yearAge, monthAge, weekAge, dateAge, hourAge;

    yearAge = yearNow - yearInput;
    
    if (monthNow > monthInput) {
        yearAge = yearAge;
    } else if (monthNow == monthInput) {
        if (dateNow > dateInput) {
            yearAge = yearAge;
        } else if (dateNow == dateInput) {
            yearAge = yearAge;
            createCake(yearAge);
        } else {
            yearAge--;
        }
    } else if (monthNow < monthInput) {
        yearAge--;
    }

    monthAge = yearAge * 12 + (monthNow - monthInput);
    dateAge = monthAge * 30 + (dateNow - dateInput);
    weekAge = Math.round(dateAge / 7);
    hourAge = dateAge * 24;

    age.push(yearAge, monthAge, weekAge, dateAge, hourAge);

    return age;
}

// calculate when the user die
function calculateDeath(ageInput, monthInput, dateInput, gender) {
    let death = [];
    let yearToDeath, yearDeath, monthDeath, dateDeath, dayDeath;

    switch (gender) {
        case "female":
            yearToDeath = 76 - ageInput;
            break;
        case "male":
            yearToDeath = 71 - ageInput;
            break;
    }

    yearDeath = yearNow + yearToDeath;
    monthDeath = monthInput;
    dateDeath = dateInput;
    dayDeath = new Date(yearDeath, monthDeath-1, dateDeath).getDay();

    death.push(yearToDeath, yearDeath, monthDeath, dateDeath, dayDeath)

    return death;
}

// ask user of their birth date and gender
function getData() {
    let data = [];

    alert("Hi! Now we will give you several questions. Please read them carefully and answer according the instruction. Thanks :)");
    let yearInput = prompt("What year were you born? (example: 1985) ");
    let monthInput = prompt("What month were you born? (please answer in the number of month, for example, If you were born in february, you will write: 2) ");
    let dateInput = prompt("What date were you born? (example: 31) ");
    let genderInput = prompt("Are you a female or a male? (example: male) ")

    data.push(yearInput, monthInput, dateInput, genderInput);

    return data;
}

function start() {
    let data = getData(); // return [yearInput, monthInput, dateInput, genderInput]
    // convert year, month, and date into numbers
    for (let i=0; i < 3; i++) {
        data[i] = Number(data[i]);
    }

    let age = calculateAge(data[0], data[1], data[2]); // return [yearAge, monthAge, weekAge, dateAge, hourAge]
    let death = calculateDeath(age[0], data[1], data[2], data[3]); // return [yearToDeath, yearDeath, monthDeath, dateDeath, dayDeath]

    let daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

    // change day from 1-7 (originally 0-6, but changed to match user input) to actual names
    death[4] = daysName[death[4]];

    // change month from 1-12 (originally 0-11, but changed to match user input) to actual names
    death[2] = monthsName[(death[2]-1)]

    let textAge = `You've lived for:
    ${age[0]} years,
    ${age[1]} months,
    ${age[2]} weeks,
    ${age[3]} days,
    ${age[4]} hours`;

    let textDeath = `You will die ${death[0]} years from now, on ${death[4]}, ${death[3]} ${death[2]} ${death[1]}`;

    const mainOut = document.getElementById("textOut");
    let textForAge = document.createElement("p");
    textForAge.textContent = textAge;
    let textForDeath = document.createElement("p");
    textForDeath.textContent = textDeath;
    let textForClean = document.createElement("p");
    textForClean.textContent = "P.S.: refresh page to remove the text above"
    mainOut.append(textForAge, textForDeath, textForClean);
}


