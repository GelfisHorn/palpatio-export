import PERMISSIONS from "../config/permissions.js";
import locales from "../locales/permissions.js";

const checkAdmin = async (req, res, next) => {
    try {
        const { user } = req;
        if (user.permissions != PERMISSIONS.admin) {
            const error = new Error(locales.EN.error.permissions);
            return res.status(401).json({ msg: error.message });
        }

        next()
    } catch (error) {
        return res.status(500);
    }
}

export default checkAdmin