function socket(io) {
    let historialChat = [];

    io.on("connection", (socket) => {
        io.emit("saludo", "Hola soy el servidor");
        let nombreUsuario;

        socket.on("mensaje", (mensaje) => {
            historialChat.push({ usuario: nombreUsuario || 'Cliente', mensaje });

            var respuesta;
            switch (mensaje.toLowerCase()) {
                case "hola":
                    respuesta = "¡Hola! ¿En qué puedo ayudarte? (1) Chiste, (2) noticias, (3) elogio, (4) cancion, (5) acertijo, (6) insulto";
                    break;
                case "1":
                    respuesta = "¿Cuál es el colmo de un electricista? Tener corriente alterna.";
                    break;
                case "2":
                    respuesta = "¡Última hora! Las ovejas se han escapado del zoológico. Se reporta un gran caos en la ciudad.";
                    break;
                case "3":
                    respuesta = "¡Wow! Eres increíblemente inteligente. ¡Sigue así!";
                    break;
                case "4":
                    respuesta = "♪ ♫ Feliz, feliz en tu día, amiguito que Dios te bendiga, que reine la paz en tu vida, y que cumplas muchos más ♫ ♪";
                    break;
                case "5":
                    respuesta = "¿Qué cosa es, que cuanto más grande, menos se ve? La oscuridad.";
                    break;
                case "6":
                    respuesta = "Lo siento, no puedo responder a eso. Por favor, mantengamos la conversación respetuosa.";
                    break;
                default:
                    respuesta = "Lo siento, no entendí eso. ¿Puedes repetirlo o necesitas ayuda con algo más?";
                    break;
            }

            historialChat.push({ usuario: 'ChatBot', mensaje: respuesta });
            socket.emit("respuesta", { respuesta });
            io.emit("historial", historialChat);
        });
    });
}

module.exports = socket;
