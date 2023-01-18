import axios from 'axios';

export class PixabayAPI {
    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY =  '32848509-cba45cf412629684caa169d48';

    constructor () {
      this.page = 1;
      this.query = null;
      this.elementsPerPage = 40;
    }
  
    async getPhotos() {
          try {
            return await axios.get(`${PixabayAPI.BASE_URL}`,
            {
                params: {
                    image_type: 'photo',
                    safesearch: 'true',
                    orientation: 'horizontal',
                    page : this.page,
                    q: this.query,
                    per_page: this.elementsPerPage,
                    key: PixabayAPI.API_KEY,
                }
            });
           
            // console.log(data)
          } catch (error) {
            console.error(error);
          }
        }
  }
