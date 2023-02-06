document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
        handleEditRow(event.target.dataset.id);
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');


searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:3001/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}



function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
    console.log("That's me!");
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');

    console.log(updateNameInput);

    fetch('http://localhost:3001/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            attending: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>Try Again</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, full_name, attending}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${full_name}</td>`;
        tableHtml += `<td>${attending}</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>That's me!</td>`;
        tableHtml += "</tr>"; 
    });

    table.innerHTML = tableHtml;
   
}