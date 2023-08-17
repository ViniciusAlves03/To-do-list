const getToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(422).json({ message: "Autorização inexistente!" });
    }

    const token = authHeader.split(" ")[1];

    return token;
}

module.exports = getToken
