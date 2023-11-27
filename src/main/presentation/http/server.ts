import http from 'node:http';

export const createHTTPServer = async (): Promise<http.Server> => {

    const httpServer: http.Server = http.createServer(
        function(request, response) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<html><body><p>Hello World!</p></body></html>');
            response.end();
        }
    );

    return httpServer;
};