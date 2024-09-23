document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      
      const usersTableBody = document.querySelector('#usersTable tbody');
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
        `;
        usersTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  });
  