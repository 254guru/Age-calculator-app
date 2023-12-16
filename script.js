
window.onload = function() {
    const day = document.getElementById('date');
    const month = document.getElementById('month');
    const year = document.getElementById('year');

    const labels = document.getElementsByTagName('label');
    const error = document.getElementsByClassName('error'); 
    const submitButton = document.getElementById('btn');

    
    const spans = document.getElementsByTagName('span');

    const date = new Date();

    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    const typeOfError = [
        "",
        'This field is required',
        'Must be a valid month',
        'Must be a valid year',
        'Must be a valid day',
        'Must be a valid date',
    ];

    const errorState = (numberOfError, typeOfDate, typeOfError, color) => {
        error[numberOfError].innerHTML = typeOfError;
        labels[numberOfError].style.color = color;
        typeOfDate.style.borderColor = color;
    }

    const isLeapYear = (day, month, year) => {
        month = month - 1;
        fullDate = new Date(year, month, day);
        if(day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear()){
            return true;
        }
        else {
            return false;
        }
        
    }

    const subtractAge = () => {
        let newYear = Math.abs(currentYear - year.value);

        let newMonth = 0;
        if(currentMonth >= month.value){
            newMonth = currentMonth - month.value;
        }
        else {
            newYear--;
            newMonth = 12 + currentMonth - month.value;
        }

        let newDay = 0;
        if(currentDay >= day.value){
            newDay = currentDay - day.value;
        }
        else {
            if(isLeapYear(day.value, month.value, year.value)){
                newDay = 30 + currentDay - day.value;
            }
            else {
                newDay = currentDay - day.value;
            }

            if(newMonth < 0) {
                newMonth = 11;
                newYear--;
            }

            if(newMonth < currentMonth){
                newDay++;
            }
        }

        spans[0].innerHTML = newYear;
        spans[1].innerHTML = newMonth;
        spans[2].innerHTML = newDay;
    }

    const isDayCorrect = () => {
        if(day.value == "") {
            errorState(0, day, typeOfError[1], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(day.value <= 0 || day.value > 31) {
            errorState(0, day, typeOfError[2], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(isLeapYear(day.value, month.value, year.value) == false){
            errorState(0, day, typeOfError[5], 'hsl(0, 100%, 67%)');
            return false;
        }
        else {
            errorState(0, day, typeOfError[0], '');
            return true;
        }
    }

    const isMonthCorrect = () => {
        if(month.value == "") {
            errorState(1, month, typeOfError[1], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(month.value <= 0 || day.value > 12) {
            errorState(1, day, typeOfError[3], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(isLeapYear(day.value, month.value, year.value) == false){
            errorState(1, month, typeOfError[0], 'hsl(0, 100%, 67%)');
            return false;
        }
        else{
            errorState(1, month, typeOfError[0], '');
            return true;
        }
    }

    const isYearCorrect = () => {
        if(year.value == "") {
            errorState(2, year, typeOfError[1], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(year.value > currentYear) {
            errorState(3, year, typeOfError[4], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(isLeapYear(day.value, month.value, year.value) == false){
            errorState(2, year, typeOfError[0], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(year.value == currentYear && month.value > currentMonth){
            errorState(1, month, typeOfError[3], 'hsl(0, 100%, 67%)');
            return false;
        }
        else if(year.value == currentYear && month.value == currentMonth && day.value > currentDay){
            errorState(0, day, typeOfError[2], 'hsl(0, 100%, 67%)');
            return false;
        }
        else {
            errorState(2, year, typeOfError[0], '');
            return true;
        }
    }

    submitButton.addEventListener('click', () => {
        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();
        if(isDayCorrect() && isMonthCorrect() && isYearCorrect()){
            subtractAge();
        }
    })

}