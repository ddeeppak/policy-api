const rolecheck = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(401);
        }

        const rolesArray = Object.values(req.roles);
        
        const result = rolesArray.some(role => allowedRoles.includes(role));
        
        if (!result) {
            return res.sendStatus(403);
        }

        next();
    };
};

module.exports = rolecheck;
