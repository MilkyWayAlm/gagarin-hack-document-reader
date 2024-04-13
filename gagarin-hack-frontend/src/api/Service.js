import axios from 'axios';

export default class SendServer {
    static async sendDataToServer(image) {
        try {
            const response = await axios.post(
                '/api/detect',
                { image: image },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
