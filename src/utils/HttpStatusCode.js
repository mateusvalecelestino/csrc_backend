// Classe de status code Http
class HttpStatusCodes {
    constructor() {
        this.OK = 200;
        this.CREATED = 201;
        this.BAD_REQUEST = 400;
        this.UNAUTHORIZED = 401;
        this.NOT_FOUND = 404;
        this.SERVER_ERROR = 500;
    }
}

export default new HttpStatusCodes(); // Exporta por default um object da classe