function handleSocket(io) {
    const opcionesMenu = [
        'Adivinanza del día',
        'Frase inspiradora',
        'Noticia interesante',
        'Salir'
    ];

    const generarMenu = () => {
        return `${opcionesMenu.map((opcion, index) => `${index + 1}. ${opcion}`).join('<br>')}`;
    };

    io.on('connection', (socket) => {
        socket.emit('respuesta-bot', [`🤖 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? <br> ${generarMenu()}`]);
        
        socket.on('respuesta', async (opcion) => {
            await realizarProceso(opcion.toLowerCase(), socket);
        });
    });

    const realizarProceso = async (proceso, socket) => {
        switch (proceso) {
            case opcionesMenu[0].toLowerCase():
                await adivinanza(socket);
                break;
            case opcionesMenu[1].toLowerCase():
                await fraseInspiradora(socket);
                break;
            case opcionesMenu[2].toLowerCase():
                await noticiaInteresante(socket);
                break;
            case opcionesMenu[3].toLowerCase():
                socket.emit('respuesta-bot', ['🤖 ¡Hasta luego!']);
                break;
            default:
                socket.emit('respuesta-bot', ['🤖 Lo siento, no entendí la opción. Por favor, elige una opción válida del menú.']);
        }
    };

    const adivinanza = async (socket) => {
        await socket.emit('respuesta-bot', ['🔍 ¡Aquí tienes una adivinanza del día!', '¿Qué cosa siempre se rompe al ser nombrada?', 'Piensa bien...', 'La respuesta es... ¡el silencio!']);
        await socket.emit('respuesta-bot', [`🤖 ¿En qué más puedo ayudarte? <br> ${generarMenu()}`]);
    };

    const fraseInspiradora = async (socket) => {
        await socket.emit('respuesta-bot', ['💡 Aquí tienes una frase inspiradora:', 'El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar. - Winston Churchill', '¡Que tengas un gran día!']);
        await socket.emit('respuesta-bot', [`🤖 ¿En qué más puedo ayudarte? <br> ${generarMenu()}`]);
    };

    const noticiaInteresante = async (socket) => {
        await socket.emit('respuesta-bot', ['📰 Te contaré una noticia interesante:', 'Una nueva investigación sugiere que los perros pueden entender algunas palabras humanas más de lo que pensábamos.', '¿Qué te parece eso?']);
        await socket.emit('respuesta-bot', [`🤖 ¿En qué más puedo ayudarte? <br> ${generarMenu()}`]);
    };
}

module.exports = handleSocket;
