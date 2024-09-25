document.addEventListener('DOMContentLoaded', async () => {
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json();
      
      const usersTableBody = document.querySelector('#usersTable tbody');
      usersTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
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
  };

  // Fetch users initially
  await fetchUsers();

  // Poll every 5 seconds (10000 milliseconds)
  setInterval(fetchUsers, 10000);
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (result.success) {
      // Redirigir a login.html tras cerrar sesión
      window.location.href = '/';
    } else {
      console.error('Error al cerrar sesión:', result.message);
    }
  } catch (error) {
    console.error('Error en la solicitud de cierre de sesión:', error);
  }
});

