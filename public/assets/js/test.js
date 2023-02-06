function updateInviteInput() {
    const updateInviteInput = document.querySelector('#attending');
    const updateInviteInput = document.querySelector('input[name="#attending"').value;


    console.log(updateInviteInput);

    fetch('http://localhost:3001/update/', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateInviteInput.dataset.id,
            attending: updateInviteInput.value
        })
    })
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
    .then(data => {
        if (data.success) {
            location.preventDefault();
        }
    })
// 
///GetElementById
if(document.getElementById('yes').checked == true) {   
    document.write("Yes radio button is selected");   
} else {  
    document.write("Yes radio button is not selected");   
}

//QuerySelector

document.querySelector('input[name="attending"]:checked')
 

function updateInviteInput(id) {

    var attending = document.querySelector('input        [name="attending"]:checked').value;
    document.writeln("You selected" + attending + "as your choice<br>");
    const updateInviteInput = document.querySelector('input[name="attending"').value;
    // document.querySelector('#true').dataset.id = id;

    console.log(updateInviteInput);
    
    fetch('http://localhost:3001/update/', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateInviteInput.id,
            attending: updateInviteInput.id
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
            console.log(hello);
        }
    });

function checkButton() {    
    
    var getSelectedValue = document.querySelector(   
        'input[name="attending"]:checked');   
        
    if(getSelectedValue != null) {   
        document.getElementById("disp").innerHTML   
            = getSelectedValue.value   
            + " season is selected";   
    }   
    else {   
        document.getElementById("error").innerHTML   
            = "*You have not selected any season";   
    }  
     
}
}
}

ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  }