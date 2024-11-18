document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([39.4699, -0.3763], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    function manejarErroresDeUbicacion() {
        alert('No se pudo obtener tu ubicación. Asegúrate de tener el GPS habilitado.');
    }
     // Centrar en la ubicacion del usuario
     function centrarMapaEnUbicacion() {
        map.locate({ setView: true, maxZoom: 16 });

        // Evento al encontrar la ubicación
        map.once('locationfound', function (e) {
            const radius = e.accuracy / 2;
            L.marker(e.latlng)
                .addTo(map)
                .bindPopup(`Estás a aproximadamente ${Math.round(radius)} metros de aquí.`)
                .openPopup();
            // círculo alrededor de la ubicación
            L.circle(e.latlng, radius).addTo(map);
        });
        map.once('locationerror', manejarErroresDeUbicacion);
    }

    document.getElementById('mi-ubicacion').addEventListener('click', centrarMapaEnUbicacion);

    // Lugares de interés
    const lugares = [
        {
            nombre: "🔆 Ciudad de las Artes y las Ciencias",
            coordenadas: [39.4541, -0.3564],
            descripcion: "Un impresionante complejo arquitectónico con museo, acuario y más.",
            direccion: "Av. del Professor López Piñero, 7",
            imagen: "img/places/arts.jpg"
        },
        {
            nombre: "🏺 Plaza de la Virgen",
            coordenadas: [39.4769, -0.3752],
            descripcion: "Uno de los lugares más icónicos del casco antiguo.",
            direccion: "Plaza de la Virgen, s/n",
            imagen: "img/places/virgen.jpg"
        },
        {
            nombre: "🏖️ Malvarrosa",
            coordenadas: [39.4738, -0.3314],
            descripcion: "Una de las playas más famosas de Valencia.",
            direccion: "Playa de la Malvarrosa",
            imagen: "img/places/malva.jpg"
        },
        {
            nombre: "🏛️ Plaza del Ayuntamiento",
            coordenadas: [39.4698, -0.3762],
            descripcion: "Un lugar céntrico rodeado de edificios históricos y ornamentales.",
            direccion: "Plaza del Ayuntamiento, s/n",
            imagen: "img/places/ayun.jpg"
        },
        {
            nombre: "🕍 Lonja de la Seda",
            coordenadas: [39.4745, -0.3783],
            descripcion: "Un ejemplo destacado de arquitectura gótica, declarado Patrimonio de la Humanidad.",
            direccion: "C/ de la Llotja, 2, 46001",
            imagen: "img/places/lonja.jpg"
        },
        {
            nombre: "🍊 Mercado Central",
            coordenadas: [39.4735, -0.3790],
            descripcion: "Un mercado histórico con una amplia oferta de productos frescos y locales.",
            direccion: "Plaza Ciudad de Brujas, s/n, 46001",
            imagen: "img/places/central.jpg"
        },
        {
            nombre: "🐟 Oceanogràfic",
            coordenadas: [39.4542, -0.3490],
            descripcion: "El mayor acuario de Europa, con hábitats de todo el mundo.",
            direccion: "Carrer d'Eduardo Primo Yúfera, 1B",
            imagen: "img/places/oceano.jpg"
        },
        {
            nombre: "🔔 Miguelete",
            coordenadas: [39.4751, -0.3753],
            descripcion: "El campanario de la Catedral de Valencia, con vistas espectaculares de la ciudad.",
            direccion: "Plaza de la Reina, s/n",
            imagen: "img/places/miquelet.jpg"
        },
        {
            nombre: "🌳 Jardín del Turia",
            coordenadas: [39.477239890854655, -0.3694770000319716],
            descripcion: "Un extenso jardín que cruza la ciudad, ideal para paseos y actividades al aire libre.",
            direccion: "Av. de Manuel de Falla, s/n",
            imagen: "img/places/turia.jpg"
        },
        {
            nombre: "🎨 Museo de Bellas Artes",
            coordenadas: [39.4791, -0.3711],
            descripcion: "Uno de los museos más importantes de España, con una extensa colección de arte.",
            direccion: "C/ de Sant Pius V, 9, 46010",
            imagen: "img/places/barts.jpg"
        },
        {
            nombre: "🚢 Puerto de Valencia",
            coordenadas: [39.4597, -0.3255],
            descripcion: "El puerto principal de la ciudad, con vistas impresionantes y actividades recreativas.",
            direccion: "Av. del Puerto, s/n",
            imagen: "img/places/puerto.jpg"
        },
        {
            nombre: "🎭 Teatro Rialto",
            coordenadas: [39.4715, -0.3763],
            descripcion: "Un teatro histórico en el centro de Valencia, conocido por su arquitectura y sus representaciones.",
            direccion: "Carrer de las Barcas, 15",
            imagen: "img/places/rialto.jpg"
        }
    ];

    lugares.forEach(lugar => {
        const popupContent = `
            <h3>${lugar.nombre}</h3>
            ${lugar.imagen ? `<img src="${lugar.imagen}" alt="${lugar.nombre}" style="width: 100%; height: auto; border-radius: 5px;">` : ''}
            <p>${lugar.descripcion}</p>
            <p><strong>Dirección:</strong><br> ${lugar.direccion}</p>
        `;

        const marker = L.marker(lugar.coordenadas).addTo(map);
        marker.bindPopup(popupContent);

        const placeList = document.querySelector('#place-list ul');
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = lugar.nombre;

         
        listItem.addEventListener('click', () => {
            marker.openPopup();

            setTimeout(() => {
                const popup = marker.getPopup();
                const popupHeight = popup.getElement().offsetHeight; 
                const markerPosition = map.latLngToContainerPoint(marker.getLatLng());

                if (markerPosition.y - popupHeight < 0) {
                    map.panBy([0, -(popupHeight / 2)]);
                }
            }, 300);
            map.setView(lugar.coordenadas, 15); 
        });

        placeList.appendChild(listItem);
    });
});

