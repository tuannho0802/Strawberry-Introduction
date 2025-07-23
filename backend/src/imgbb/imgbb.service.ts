import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

export interface ImgbbUploadResponse {
  imageUrl: string;
  deleteUrl: string;
}

@Injectable()
export class ImgbbService {
  private readonly apiKey = process.env.IMGBB_API_KEY;
  private readonly apiUrl = 'https://api.imgbb.com/1/upload';

  async upload(image: Express.Multer.File): Promise<ImgbbUploadResponse> {
    const formData = new FormData();
    formData.append('image', image.buffer.toString('base64'));

    const response = await axios.post(this.apiUrl, formData, {
      params: {
        key: this.apiKey,
      },
    });

    return {
      imageUrl: response.data.data.url,
      deleteUrl: response.data.data.delete_url,
    };
  }

  async delete(deleteUrl: string): Promise<void> {
    await axios.get(deleteUrl);
  }
}
