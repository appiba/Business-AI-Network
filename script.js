const API_URL = 'https://script.google.com/macros/s/AKfycbzDOFOcxo_7a0zbqVwgrLr23t7hTuamu0FcPWuuIPl6XP3SUkL7Hyjk1GmtKoQToddEgw/exec';

document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegistro = document.getElementById('tabRegistro');
  const loginForm = document.getElementById('loginForm');
  const registroForm = document.getElementById('registroForm');
  const btnSalir = document.getElementById('btnSalir');
  const toast = document.getElementById('toast');

  function toastMsg(msg) {
    if (!toast) {
      alert(msg);
      return;
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function limpiarCelular(numero) {
    numero = String(numero || '').replace(/\D/g, '');
    if (numero.startsWith('0')) numero = numero.substring(1);
    return numero;
  }

  async function apiPost(payload) {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegistro.classList.remove('active');
    loginForm.style.display = 'grid';
    registroForm.style.display = 'none';
  });

  tabRegistro.addEventListener('click', () => {
    tabRegistro.classList.add('active');
    tabLogin.classList.remove('active');
    registroForm.style.display = 'grid';
    loginForm.style.display = 'none';
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cedula = document.getElementById('loginCedula').value.trim();
    const celular = limpiarCelular(document.getElementById('loginCelular').value);

    const result = await apiPost({
      action: 'loginParticipante',
      cedula,
      celular
    });

    if (!result.ok) {
      toastMsg(result.message);
      return;
    }

    localStorage.setItem('participante', JSON.stringify(result.participante));
    toastMsg('Ingreso correcto');
    setTimeout(() => location.reload(), 700);
  });

  registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const celular = limpiarCelular(document.getElementById('celular').value);

    const result = await apiPost({
      action: 'registrarParticipante',
      nombres,
      apellidos,
      cedula,
      celular
    });

    if (!result.ok) {
      toastMsg(result.message);
      return;
    }

    localStorage.setItem('participante', JSON.stringify(result.participante));
    toastMsg('Registro exitoso');
    setTimeout(() => location.reload(), 700);
  });

  if (btnSalir) {
    btnSalir.addEventListener('click', () => {
      localStorage.removeItem('participante');
      location.reload();
    });
  }
});
