import axios from "axios";

export default async function handler(req, res) {
    const { reqBody, config } = req.body;

    if (req.method != 'POST') {
        res.status(405).json({ msg: `${req.method} method not allowed` });
    }

    try {
        const { data } = await axios.request({
            url: `${process.env.SERVER_URI}/users/edit`,
            method: "POST",
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: reqBody
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.response.data.msg || 'There was an error' });
    }
}