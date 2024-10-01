document.addEventListener('DOMContentLoaded', async () => {
  // Función para obtener usuarios
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

  // Función para obtener los datos del bastón inteligente
  const fetchDatosBaston = async () => {
    try {
      const response = await fetch('/api/datos_baston');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const datosBaston = await response.json();
      
      // Datos GPS
      const gpsContainer = document.querySelector('#gpsData');
      gpsContainer.innerHTML = ''; // Limpiar contenido anterior
      datosBaston.forEach(dato => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${dato.id}</td>
          <td>${dato.latitud}</td>
          <td>${dato.longitud}</td>
          <td>${new Date(dato.Fecha).toLocaleString()}</td>
        `;
        gpsContainer.appendChild(row);
      });

      // Datos Giroscopio
      const giroscopioContainer = document.querySelector('#giroscopioData');
      giroscopioContainer.innerHTML = ''; // Limpiar contenido anterior
      datosBaston.forEach(dato => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${dato.id}</td>
          <td>${dato.posicion}</td>
          <td>${new Date(dato.Fecha).toLocaleString()}</td>
        `;
        giroscopioContainer.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching datos_baston:', error);
    }
  };

  // Obtener datos al cargar la página
  await fetchUsers();
  await fetchDatosBaston();

  // Actualizar cada 10 segundos
  setInterval(fetchUsers, 10000);
  setInterval(fetchDatosBaston, 10000);
});

// Cerrar sesión
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
      // Redirigir a la página de login tras cerrar sesión
      window.location.href = '/';
    } else {
      console.error('Error al cerrar sesión:', result.message);
    }
  } catch (error) {
    console.error('Error en la solicitud de cierre de sesión:', error);
  }
});
