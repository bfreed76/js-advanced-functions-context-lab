/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = (array) => {
    let testEmployee = {
        firstName: array[0], 
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return testEmployee;
}

const createEmployeeRecords = (arrays) => {
    // console.log("1st----", arrays);
    return arrays.map((array) => {
        return createEmployeeRecord(array);
    });
}

let createTimeInEvent = function (dateStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(dateStamp.slice(10)),
        date: dateStamp.slice(0,10),
    });
    // console.log("3rd---------------------------", this.timeInEvent, this);
    return this
}

let createTimeOutEvent = function (dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(dateStamp.slice(10)),
        date: dateStamp.slice(0,10),
    });
    return this;
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}