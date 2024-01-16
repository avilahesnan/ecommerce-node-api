import http from "node:http";

export const createHTTPServer = async (app: object): Promise<http.Server> => {
    const httpServer: http.Server = http.createServer(app);
    return httpServer;
}
