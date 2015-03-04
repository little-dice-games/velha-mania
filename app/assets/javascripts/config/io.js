window.socket = io.connect();

socket.on('reconnect', function() {
    VelhaMania.vent.trigger('socket:reconnect');
});