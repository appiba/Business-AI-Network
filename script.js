const API_URL = 'https://script.google.com/macros/s/AKfycbyvYZa5VUVgydteQgC0HmzjtRbgCZxIlwnrI3awmggOB_FE9Wl2_ES1zPvVyu6TF2MicQ/exec';

async function registrarParticipante() {

  const data = {
    action: 'registrarParticipante',
    nombres: 'Patricio',
    apellidos: 'Nieto',
    cedula: '1000000001',
    celular: '0999999999',
    instagram: '@patonieto33'
  };

  try {

    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log(result);

    alert(result.message);

  } catch (error) {

    console.error(error);

    alert('Error de conexión');

  }

}

registrarParticipante();
