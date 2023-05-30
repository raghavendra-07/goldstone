// frontend.js

document.addEventListener('DOMContentLoaded', fetchUsers);

function fetchUsers() {
  fetch('http://localhost:3002/users')
    .then((response) => response.json())
    .then((data) => displayUsers(data))
    .catch((error) => console.error(error));
}

function displayUsers(users) {
  const table = document.getElementById('user-table');
  users.forEach((user) => {
    const row = table.insertRow();
    row.insertCell().textContent = user.Id;
    row.insertCell().textContent = user.name;
    row.insertCell().textContent = user.email;
    row.insertCell().textContent = user.gender;
    row.insertCell().textContent = user.status;
    row.insertCell().textContent = user.Created_at;
    row.insertCell().textContent = user.Updated_at;
    const actionCell = row.insertCell();
    const activateButton = document.createElement('button');
    activateButton.textContent = 'Activate User';
    activateButton.addEventListener('click', () => activateUser(user.Id));
    actionCell.appendChild(activateButton);
  });
}

function activateUser(id) {
  const updatedData = {
    status: 'Active',
    Updated_at: new Date().toISOString()
  };

  fetch(`http://localhost:3002/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
      fetchUsers();
    })
    .catch((error) => console.error(error));
}
