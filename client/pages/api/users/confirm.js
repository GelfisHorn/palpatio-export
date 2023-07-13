import axios from "axios";

export default async function handler(req, res) {
    const { token } = req.body || {};

    if (req.method != 'POST') {
        res.status(405).json({ msg: `${req.method} method not allowed` });
    }

    if(!token) {
        res.status(403).json({ msg: `You must send a token` });
    }

    try {
        const { data } = await axios.request({
            url: `${process.env.SERVER_URI}/users/confirm/${token}`,
            method: "GET"
        });

        return res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.response.data.msg || 'There was an error' });
    }
}