// Classe de status code Http
class HttpStatusCodes {
    constructor() {
        this.HTTP_STATUS_OK = 200;
        this.HTTP_STATUS_CREATED = 201;
        this.HTTP_STATUS_BAD_REQUEST = 400;
        this.HTTP_STATUS_UNAUTHORIZED = 401;
        this.HTTP_STATUS_NOT_FOUND = 404;
        this.HTTP_STATUS_SERVER_ERROR = 500;
    }
}

export default new HttpStatusCodes(); // Exporta por default um object da classe