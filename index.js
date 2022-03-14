const uri = 'api/bookings';

let bookings = [];

function getBookings() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get bookings.', error));
}

function addBooking() {
  const addIdTextbox = document.getElementById('add-booking');

  const item = {
    Id: addIdTextbox.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getBookings();
      addIdTextbox.value = '';
    })
    .catch(error => console.error('Unable to add booking.', error));
}

function deleteBooking(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getBookings())
  .catch(error => console.error('Unable to delete booking.', error));
}

function displayEditForm(id) {
  const item = bookings.find(item => item.id === id);
  
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-date').value = item.date;
  document.getElementById('edit-time').value = item.time;
  document.getElementById('edit-pickupPoint').value = item.pickupPoint;
  document.getElementById('edit-destination').value = item.destination;
  document.getElementById('edit-currentLatitude').value = item.currentLocation_Latitude;
  document.getElementById('edit-currentLongitude').value = item.currentLocation_Longitude;

  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    date: document.getElementById('edit-date').trim(),
    time: document.getElementById('edit-time').value.trim(),
    pickupPoint: document.getElementById('edit-pickupPoint').value.trim(),
    destination: document.getElementById('edit-destination').value.trim(),
    currentLocation_Latitude: document.getElementById('edit-currentLatitude').value,
    currentLocation_Longitude: document.getElementById('edit-currentLongitude').value,
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update booking.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'booking' : 'bookings';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('bookings');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    console.log('DEBUG getBookings', item);
    // let isCompleteCheckbox = document.createElement('input');
    // isCompleteCheckbox.type = 'checkbox';
    // isCompleteCheckbox.disabled = true;
    // isCompleteCheckbox.checked = item.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteBooking(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    let textNode1 = document.createTextNode(item.id);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    let textNode2 = document.createTextNode(item.date);
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(2);
    let textNode3 = document.createTextNode(item.time);
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(3);
    let textNode4 = document.createTextNode(item.pickupPoint);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(4);
    let textNode5 = document.createTextNode(item.destination);
    td5.appendChild(textNode5);

    let td6 = tr.insertCell(5);
    let textNode6 = document.createTextNode(item.currentLocation_Latitude);
    td6.appendChild(textNode6);

    let td7 = tr.insertCell(6);
    let textNode7 = document.createTextNode(item.currentLocation_Longitude);
    td7.appendChild(textNode7);

    let td8 = tr.insertCell();
    td8.appendChild(editButton);

    let td9 = tr.insertCell();
    td9.appendChild(deleteButton);
  });

  bookings = data;
}