document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const reporte = document.getElementById('reporte').value;
    const webhookURL = 'https://discord.com/api/webhooks/1218809171844272158/GZ6gG_69DR0BWF6rEDxqa2A-VRhqebLK4HYi8I0re8bwPxR0v9_oWxwxaiLxaHv2Z31v';

    function mostrarError(elemento, mensaje) {
        const mensajeElemento = document.getElementById(elemento);
        mensajeElemento.innerText = mensaje;

        mensajeElemento.classList.add('error-mensaje');
    }

    function ocultarError(elemento, mensaje) {
        const mensajeElemento = document.getElementById(elemento);
        mensajeElemento.innerText = '';

        mensajeElemento.classList.remove('error-mensaje');
    }

    if (nombre.trim() === '') {
        mostrarError('mensaje-nombre', 'Proporciona tu nombre.*');
        return;
    } else {
        ocultarError('mensaje-nombre');
    }

    if (correo.trim() === '') {
        mostrarError('mensaje-correo', 'Proporciona tu correo.*');
        return;
    } else {
        ocultarError('mensaje-correo');
    }

    if (reporte.trim() === '') {
        mostrarError('mensaje-reporte', 'Proporciona tu reporte.*');
        return;
    } else {
        ocultarError('mensaje-reporte');
    }

    const data = {
        embeds: [{
           title: `**Reporte Tickets Draking**`,
           fields: [
            { name: `🪪 • Nombre:`, value: `${nombre}` },
            { name: `📧 • Correo:`, value: `${correo}` },
            { name: `📰 • Reporte:`, value: `${reporte}` },
           ],
           thumbnail: {
            url: `https://cdn.discordapp.com/icons/1175511103971799100/f893fe0e5d36ba6fe2548919598067d2.webp?size=2048`,
           },
           footer: {
            text: `🔎 • Reporte ${nombre}`,
            icon_url: `https://cdn.discordapp.com/icons/1175511103971799100/f893fe0e5d36ba6fe2548919598067d2.webp?size=2048`,
           },
           timestamp: new Date().toISOString()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar mensaje a Discord');
        }
        document.getElementById('reporte-enviado').style.display = 'block';
        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('reporte').value = '';

        document.body.classList.add('enviado-activo');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje a Discord');
    });
});
