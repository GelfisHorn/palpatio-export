import axios from "axios";

export default async function handler(req, res) {
    const { userId, orderId, config } = req.body;

    if (req.method != 'POST') {
        return res.status(405).json({ msg: `${req.method} method not allowed` });
    }

    try {
        const { data } = await axios.request({
            url: `${process.env.SERVER_URI}/dashboard/clients/assignOrder`,
            method: "POST",
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { userId, orderId }
        });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: error?.response?.data?.msg || 'There was an error' });
    }
}