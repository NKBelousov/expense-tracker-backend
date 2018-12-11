"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValid = (token) => {
    return token === "secret";
};
const handler = function (req, res, next) {
    const token = req.get("Authorization");
    if (isValid(token)) {
        next();
    }
    else {
        res.status(401).json({
            error: "invalid_access_token",
        });
    }
};
exports.default = handler;
//# sourceMappingURL=AccessTokenMiddleware.js.map