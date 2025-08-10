import axios from 'axios';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

export async function uploadBase64ToCloudinary(base64Image: string) {
  // Запрашиваем подпись с нашего API
  const { data } = await axios.get('/api/cloudinary-signature');

  const formData = new FormData();
  formData.append('file', base64Image);
  formData.append('api_key', API_KEY!);
  formData.append('timestamp', data.timestamp.toString());
  formData.append('signature', data.signature);
  formData.append('folder', data.folder);

  const response = await axios.post(CLOUDINARY_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.secure_url;
}
