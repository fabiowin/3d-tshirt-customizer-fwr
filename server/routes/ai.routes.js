import express from 'express';
import * as dotenv from 'dotenv';

import api from 'api';

const sdk = api('@eden-ai/v2.0#25ay92wlsj6g2cl');

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // stabilityai,amazon,deepai,replicate,openai
    // const provider = 'stabilityai';
    const provider = 'replicate' //cheapest

    sdk.auth(process.env.EDENAI_API_KEY);
    sdk.image_generation_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: false,
      resolution: '1024x1024',
      num_images: 1,
      providers: 'replicate',
      text: prompt,
      // settings: {
      //   stabilityai: "stable-diffusion-v1-6"
      // }
    })
      .then(({ data }) => {
        res.status(200).json({ photo: data[provider].items[0].image });
      })
      .catch(err => console.error(err)); 

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;