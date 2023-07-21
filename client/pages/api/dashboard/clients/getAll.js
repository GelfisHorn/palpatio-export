import axios from "axios";

export default async function handler(req, res) {
    const { page, config } = req.body;

    if (req.method != 'POST') {
        res.status(405).json({ msg: `${req.method} method not allowed` });
    }

    try {
        const { data } = await axios.request({
            url: `${process.env.SERVER_URI}/dashboard/clients?page=${page}`,
            method: "GET",
            headers: {
                'Authorization': config.headers.Authorization
            }
        });

        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: error.response.data.msg || 'There was an error' });
    }
}