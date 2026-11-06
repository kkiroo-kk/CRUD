let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let tmp;


function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.color = 'green'
        total.style.backgroundColor = '#f4f0f0'
    } else {
        total.style.backgroundColor = 'red'
        total.innerHTML = '';

    }
}

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else { dataPro = [] }

submit.onclick = function () {

    // create product 

    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newPro.count >= 0 &&
        newPro.count < 101) {  clearData();
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push({ ...newPro });


                }
            } else {
                dataPro.push(newPro);


            }

        } else {
            newPro.count = dataPro[tmp].count;
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';

        }
    } else{alert('Enter a title, price, and category. Count must be between 0 and 100.');
        if (title.value == '') title.focus();
        else if (price.value == '') price.focus();
        else if (category.value == '') category.focus();
        else count.focus();
     }


  

    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read

function showData() {
    getTotal()
    let table = ''

    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" >UPDATE</button></td>
                    <td> <button onclick="deleteData(  ${i} )">DELETE</button></td>
                </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    // تعريف الحذف الكلي
    let butDelete = document.getElementById('deleteAll')
    if (dataPro.length != 0) {
        butDelete.innerHTML = `<button onclick="deleteAll()" >Delete All  ( ${dataPro.length}) </button>`

    } else { butDelete.innerHTML = '' }
}
showData()

// delete

function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()

}


function deleteAll() {
    dataPro.splice(0)
    localStorage.clear()
    showData()

}

// updataData
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();

    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;

    scroll({ top: 0, behavior: 'smooth' });
}
// search
let searchMood = 'title';
let search = document.getElementById("search");


function getSearchMood(id) {
    if (id == 'searchTitle') { searchMood = 'title'; search.placeholder = 'Search By Title' }
    else { searchMood = 'category'; search.placeholder = 'Search By category' }
    search.focus()
    search.value = ''
    showData()
}

function SearchData(value) {

    let table = ''
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" >UPDATE</button></td>
                    <td> <button onclick="deleteData(  ${i} )">DELETE</button></td>
                </tr>
        ` }
        }
    }
    else {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" >UPDATE</button></td>
                    <td> <button onclick="deleteData(  ${i} )">DELETE</button></td>
                </tr>
        `

            }
        }
    }

    document.getElementById('tbody').innerHTML = table

}