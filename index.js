var country = document.form.country;
var state = document.form.state;
var city = document.form.city;

addEventListener('load', async () => {



    var ref = await fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json");
    let data = await ref.json();



    for (let x = 0; x <= 200; x++) {
        country.options[country.options.length] = new Option(data[x].name);

    }
    country.onchange = function () {
        state.length = 1;
        let val = document.form.country.value;
        console.log(val);
        for (let y = 0; y <= 200; y++) {
            if (val == data[y].name) {
                for (let z = 0; z <= 200; z++) {
                    console.log(data[y].states[z].name);
                    state.options[state.options.length] = new Option(data[y].states[z].name);

                }
            }
        }
    }

    state.onchange = function () {
        city.length = 1;
        let valofcountry = document.form.country.value;
        let valofstate = document.form.state.value;
        console.log(valofstate);
        for (let i = 0; i <= 200; i++) {
            if (valofcountry == data[i].name) {
                console.log(data[i].name);
                for (let j = 0; j <= 200; j++) {
                    if (valofstate == data[i].states[j].name) {
                        console.log(data[i].states[j].name);
                        for (let k = 0; k <= 200; k++) {
                            console.log(data[i].states[j].cities[k].name);
                            city.options[city.options.length] = new Option(data[i].states[j].cities[k].name);
                        }
                    }
                }

            }

        }

    }



    showDataFunction();

    console.log(showAllData);

})


const showAllData = [
    {
        "name": "amish",
        "email": "amish.taglin@gmail.com",
        "gender": "male",
        "age": "2002-01-21",
        "hobbies": "Reading",
        "country": "India",
        "state": "Gujarat",
        "city": "Bardoli",
        "date": new Date()
    },

];







let demo = document.getElementById("demo");
let tbody = document.createElement("tbody");
document.getElementById("table").appendChild(tbody);


const showDataFunction = (len = 1) => {
    var dddd = new Date();
    for (let i = len - 1; i < showAllData.length; i++) {
        let final = dddd.getFullYear() - new Date(showAllData[i].age).getFullYear();
        const monthNames = ["1", "2", "3", "4", "5", "6",
            "7", "8", "9", "10", "11", "12"];
        const dateObj = new Date();
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = day + "/" + month + "/" + year + " " + dateObj.getHours() + ":" + dateObj.getMinutes();

        console.log(showAllData[0].age);
        console.log(i);
        tbody.innerHTML +=
            "<tr>" +
            "<td>" + showAllData[i].name + "</td>" +
            "<td>" + showAllData[i].email + "</td>" +
            "<td>" + showAllData[i].gender + "</td>" +
            "<td>" + final + "</td>" +
            "<td>" + showAllData[i].hobbies + "</td>" +
            "<td>" + showAllData[i].country + "</td>" +
            "<td>" + showAllData[i].state + "</td>" +
            "<td>" + showAllData[i].city + "</td>" +
            "<td>" + output + "</td>" +
            "<td>" + `<input type="button" onClick="edit(this)" value="edit">` + " " + `<input type="button" value="delete" onClick="delete1(this)">` + "</td>" +
            "</tr>"
    }
}

function cleanForm() {

    document.form.reset();

}

var seleteRow = null;
function saveData() {
    var data = getData();
    insetData(data);
}

function getData() {
    obj2 = {};
    obj2["name"] = document.form.name.value;
    obj2["email"] = document.form.email.value;

    let genders = document.form.gender;
    if (genders[0].checked == true) {
        obj2["gender"] = genders.value;
    } else if (genders[1].checked == true) {
        obj2["gender"] = genders.value;
    }
    else {
        console.log("error");
    }
    console.log(obj2["gender"]);
    obj2["age"] = document.form.age.value;
    console.log(obj2["age"].value);
    let marked = document.form.hobbies;
    let hobbiArry = [];
    for (let checkbox of marked) {
        if (checkbox.checked) {
            console.log(checkbox.value);
            hobbiArry.push(checkbox.value);
        }
    }
    obj2["hobbies"] = hobbiArry;
    obj2["country"] = document.form.country.value;
    obj2["state"] = document.form.state.value;
    obj2["city"] = document.form.city.value;

    let getdate = new Date();
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let mouth = months[getdate.getMonth()];

    const monthNames = ["1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + "/" + month + "/" + year + " " + dateObj.getHours() + ":" + dateObj.getMinutes();;
    obj2["date"] = output;
    return obj2;

}

function insetData(data) {
    showAllData.push(data);
    cleanForm();
    let len = showAllData.length;
    showDataFunction(len);
    seleteRow = null

}

function edit(data) {
    document.form.add.style.visibility = "hidden";
    var update1 = document.createElement("BUTTON");
    let btnname1 = document.createTextNode("Update");
    update1.appendChild(btnname1);
    document.getElementById("form").after(update1);
    var cancel1 = document.createElement("BUTTON");
    let btnname2 = document.createTextNode("Cancel");
    cancel1.appendChild(btnname2);
    document.getElementById("form").after(cancel1);
    cleanForm();
    var seleteRow = data.parentElement.parentElement;
    document.form.name.value = seleteRow.cells[0].innerHTML;
    document.form.email.value = seleteRow.cells[1].innerHTML;
    document.form.gender.value = seleteRow.cells[2].innerHTML;
    document.form.age.value = seleteRow.cells[3].innerHTML;
    document.form.hobbies.value = seleteRow.cells[4].innerHTML;
    document.form.country.value = seleteRow.cells[5].innerHTML;
    document.form.state.value = seleteRow.cells[6].innerHTML;
    document.form.city.value = seleteRow.cells[7].innerHTML;


    if (vaditionForm()) {

        console.log("error");



    } else {
        vaditionForm();
        update1.onclick = function () {
            console.log(update1);
            let ind = seleteRow.rowIndex - 1;
            let n = document.form.name.value;
            let e = document.form.email.value;
            let g = document.form.gender.value;
            let a = document.form.age.value;
            let marked = document.form.hobbies;
            let hobbiArry = [];
            for (let checkbox of marked) {
                if (checkbox.checked) {
                    hobbiArry.push(checkbox.value);
                }
            }
            let h = hobbiArry;
            let c = document.form.country.value;
            let s = document.form.state.value;
            let ci = document.form.city.value;
            let d = new Date();
            console.log(showAllData[ind].name);
            showAllData[ind].name = n;
            showAllData[ind].email = e;
            showAllData[ind].gender = g;
            showAllData[ind].age = a;
            showAllData[ind].hobbies = h;
            showAllData[ind].country = c;
            showAllData[ind].state = s;
            showAllData[ind].city = ci;
            console.log(showAllData);
            cleanForm();
            deleleTableData();
            showDataFunction();
            console.log(table);
            document.form.add.style.visibility = "visible";
            update1.style.visibility = "hidden";
            cancel1.style.visibility = "hidden";

        }
    }


    function deleleTableData() {
        let table = document.getElementById("table");
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }

    cancel1.onclick = function () {
        document.form.reset();

    }

}





function delete1(da) {
    console.log(da.parentElement.parentElement);
    let d = da.parentElement.parentElement;
    console.log(d);
    let index = d.rowIndex - 1;
    console.log(index);
    let solve = showAllData.splice(index, 1);
    if (solve) {
        var table = document.getElementById("table");
        console.log(table);
        table.deleteRow(index + 1);
    }
    console.log(showAllData);
    console.log();
}

function vaditionForm() {
    let massName = document.form.name.nextSibling;
    console.log(massName);
    let massEmail = document.form.email.nextSibling;
    let massGender = document.form.gender[1].nextSibling;
    console.log(massGender);
    let massAge = document.form.age.nextSibling;
    let massHobbies = document.form.hobbies[2].nextSibling;
    console.log(massHobbies);
    let massCountry = document.form.country.nextSibling;
    let massState = document.form.state.nextSibling;
    let massCity = document.form.city.nextSibling;
    let name = document.form.name;
    let email = document.form.email;
    let gender = document.form.gender;
    console.log(gender);
    let age = document.form.age;
    let hobbies = document.form.hobbies;
    let country = document.form.country;
    let state = document.form.state;
    let city = document.form.city;

    if (name.value.length <= 0 || name.value == 0) {
        massName.innerHTML = "*Please fill name";
        return false;
    } else {
        massName.innerHTML = "";
    }

    if (email.value.length == 0) {
        massEmail.innerHTML = "*Please fill email data";
        return false;
    } else {
        massEmail.innerHTML = "";
    }

    let emailvalistring = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!(email.value.match(emailvalistring))) {
        massEmail.innerHTML = "*Please Enter valid Email Address";
        return false;
    } else {
        massEmail.innerHTML = "";
    }

    console.log(gender[0]);
    if (gender[0].checked == false && gender[1].checked == false) {
        massGender.innerHTML = "*Please Select Checkbox";
        return false;
    } else {
        massGender.innerHTML = "";
    }


    if (age.value.length == 0) {
        massAge.innerHTML = "*Please fill DoB ";
        return false;
    } else {
        massAge.innerHTML = "";
    }
    let v = age.value;
    console.log(v);
    let valueinstring = v.toString();
    let cuttingvalue = valueinstring.slice(0, 4);
    let date = new Date;
    let todayYear = date.getFullYear();
    console.log(todayYear);
    let a = parseInt(todayYear);
    let b = parseInt(cuttingvalue);
    if (b > a) {
        massAge.innerHTML = "*you choose wrong year";
        return false;
    } else {
        massAge.innerHTML = "";
    }

    if (hobbies[0].checked == false || hobbies[1].checked == false && hobbies[2] == false) {
        massHobbies.innerHTML = "*Please select box";
        return false;
    }
    else {
        massHobbies.innerHTML = "";
    }


    if (country.value == "--Select Country--") {
        massCountry.innerHTML = "*Please select country on list";
        return false;
    } else {
        massCountry.innerHTML = "";
    }

    if (state.value == "--Select State--") {
        massState.innerHTML = "*Please select state on list";
        return false;
    } else {
        massState.innerHTML = "";
    }

    if (city.value == "--Select City--") {
        massCity.innerHTML = "*Please fill name";
        return false;
    }
    else {
        massCity.innerHTML = "";
    }

}

function deleleTableData() {
    let table = document.getElementById("table");
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function search() {

    let val = document.querySelector("input[type='search']").value;
    console.log(val);

    const arr = [];
    var index = 0;

    const final = () =>{
        let value = val.toLowerCase();
        console.log(value);
        let data1 = value.toLowerCase();
        console.log(data1);
        showAllData.findIndex((v,i) => {
            console.log("data" + v);
            console.log("index of array" +  i);
            let data2 = v.name.toLowerCase();
            let com =  data2.indexOf(data1);

            if(com > -1){

                arr.push(showAllData[i]);
                console.log(arr[index]);

                index++;



            }

            console.log("index" + com);


        })
        showAllData.splice(0,showAllData.length, ...arr);
        deleleTableData();
        showDataFunction();
        console.log(showAllData);
    }




    final();

}



function arrsorting() {

    let choose = document.getElementsByName("forsorting");

    if (choose[0].value == "ascending") {

        function ascendingOrder(arr, sor) {
            var swapped;
            do {
                swapped = false;
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i][sor] > arr[i + 1][sor]) {
                        var temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        swapped = true;
                        deleleTableData();
                        showDataFunction();
                    }
                }
            } while (swapped);
        }


        ascendingOrder(showAllData, 'name');

        for (i = 0; i < showAllData.length; i++) {
            console.log(showAllData[i]);
        }

    }

    console.log(choose[0].value);
    if (choose[0].value == "descending") {

        function descendingOrder(arr, sor) {
            var swapped;
            do {
                swapped = false;
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i][sor] < arr[i + 1][sor]) {
                        var temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        swapped = true;
                        deleleTableData();
                        showDataFunction();
                    }
                }
            } while (swapped);
        }


        descendingOrder(showAllData, 'name');

        for (i = 0; i < showAllData.length; i++) {
            console.log(showAllData[i]);
        }
        console.log(choose[1].value);

    }


}

