var conn = new WebSocket('localhost:3500');
conn.onopen = function(e) {
    console.log("Connection established!");
    conn.send('Hello World');
};

conn.onmessage = function(e) {
    console.log(e.data);
};
