import axios from "axios";
import sha1 from 'sha1';

/**
 * Upload images to Cloudinary
 * @images formlist of images
 */
export default async function uploadImages(images, folder) {
    let imagesUrl = [];
    try {
        for (const image of images) {
            const public_id = Math.random().toString(4).substring(2);
            const timestamp = Math.floor(Date.now() / 1000);
            const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
            const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
            const signature = sha1(`${folder ? `folder=${folder}&` : ""}public_id=${public_id}&timestamp=${timestamp}` + api_secret)
            let formData = new FormData();
            formData.append('file', image);
            formData.append('public_id', public_id);
            formData.append('signature', signature);
            formData.append('api_key', api_key);
            formData.append('timestamp', timestamp);
            formData.append('folder', folder || "");
            const { data } = await axios.request({
                url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
            imagesUrl.push(data.url);
        }
        return imagesUrl;
    } catch (error) {
        console.log("error uploading images");
    }

}