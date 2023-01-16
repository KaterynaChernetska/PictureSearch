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
            const response = await axios.get(`${PixabayAPI.BASE_URL}`,
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
            return response.data;
            // console.log(data)
          } catch (error) {
            console.error(error);
          }
        }
  }


  // async function getPhotos(name) {

//   const searchParams = new URLSearchParams({
//     image_type: 'photo',
//     safesearch: 'true',
//     page : 1,
//     per_page: 40,
//     key: API_KEY,
//   });
//     try {
//       const response = await axios.get(`${BASE_URL}/?${name}${searchParams}`);
//       // const data = await response.json();
//      return response;
//      console.error(response);
//       // const photos = await response.json();
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   console.log(getPhotos('cat'));
// https://pixabay.com/api/key=32848509-cba45cf412629684caa169d48
