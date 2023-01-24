"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map