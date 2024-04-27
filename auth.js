// Handles authentication-related logic
const verifyToken = (token) => {
    return token === process.env.AUTH_TOKEN;
};

const verifyRole = (role, requiredRole) => {
    return role === requiredRole;
};

module.exports = { verifyToken, verifyRole };
