import axios from 'axios';

const API_BASE_URL = 'https://apis.quran.foundation/content/api/v4'
// const API_BASE_URL = 'https://apis-prelive.quran.foundation/content/api/v4'



// Get OAuth2 access token from Quran Foundation
async function getAccessToken() {
  try {
    const authUrl = 'https://oauth2.quran.foundation/oauth2/token';
    const credentials = Buffer.from(`${process.env.QURAN_CLIENT_ID}:${process.env.QURAN_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post(authUrl, 
      'grant_type=client_credentials&scope=content', 
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error.message);
    throw error;
  }
}



// Get chapters from Quran API
async function getChapters(token) {
  try {
    const apiUrl = 'https://apis.quran.foundation/content/api/v4/chapters';

    
    const response = await axios.get(apiUrl, {
      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID,
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get chapters:', error.message);
    throw error;
  }
}


// Get chapter details by ID
async function getChapterById(token, chapterId) {
  try {

     const apiUrl = `${API_BASE_URL}/chapters/${chapterId}`;

     const response = await axios.get(apiUrl, {
       headers: {
          'x-auth-token': token,
          'x-client-id': process.env.QURAN_CLIENT_ID,
          'Accept': 'application/json'
       }
     });

     return response.data;
    
  } catch (error) {
    console.log('Failed to get chapter by ID:', error.message);
    throw error;
  }
}



// get verses by chapter ID
async function getVerses(token, chapterId) {
  try {
    const apiUrl = `https://apis.quran.foundation/content/api/v4/verses/by_chapter/${chapterId}`;
    

    const response = await axios.get(apiUrl, {
      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID,
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get verses:', error.message);
    throw error;
  }
}


// uthmani arabic text
async function getUthmani(token) {
  
  try {

    const apiUrl = `${API_BASE_URL}/quran/verses/uthmani`;

    const response = await axios.get(apiUrl, {
      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID
      }
    })

    return response.data;
    
  } catch (error) {
    console.log(error.message);
    throw error
    
  }
}



async function getUthmaniById(token, surahId) {
  
  try {

    const apiUrl = `${API_BASE_URL}/quran/verses/uthmani`;

    const response = await axios.get(apiUrl, {

      params: {
        chapter_number: surahId
      },

      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID
      }
    })

    return response.data;
    
  } catch (error) {
    console.log(error.message);
    throw error
    
  }
}


async function getUthmaniTajweed(token, surahId){
  try {

    const apiUrl = `${API_BASE_URL}/quran/verses/uthmani_tajweed${surahId}`;

    const response = await axios.get(apiUrl, {
      params: {
        chapter_number: surahId
      },

      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID
      }
    })

    return response.data;
    
  } catch (error) {
    console.log(error.message);
    throw error
  }
}


// translations
async function getTranslations(token, surahId){
  try {
    
    const TRANSLATION_ID = 20; // English - Saheeh International
    const apiUrl = `${API_BASE_URL}/quran/translations/${TRANSLATION_ID}`;

    const response = await axios.get(apiUrl, {
      params: {
        chapter_number: surahId
      },
      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID
      }
    })

    return response.data;
    
  } catch (error) {
    console.log(error.message);
    throw error
    
  }
}


async function getRecitations(token){
  try {

    const reciter_id = 7; // Mishary Alafasy
    const apiUrl = `${API_BASE_URL}/chapter_recitations/${reciter_id}`;

    const response = await axios.get(apiUrl, {
       headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID
       }
    })

    return response.data;
    
  } catch (error) {
    console.log(error.message);
    throw error
    
  }
}

async function getRecitationById(token, recitation_id){
  try {
     
    const reciter_id = 7; // Alafasy
    const apiUrl = `${API_BASE_URL}/chapter_recitations/${reciter_id}/${recitation_id}`

    const response = await axios.get(apiUrl,{
      headers: {
        'x-auth-token': token,
        'x-client-id': process.env.QURAN_CLIENT_ID
      }
    })

    return response.data;
    
  } catch (error) {
    console.log(error.message);
    throw error
    
  }
}

export { getAccessToken, 
  getChapters, 
  getChapterById, 
  getVerses, 
  getUthmani, 
  getUthmaniById, 
  getUthmaniTajweed,
  getTranslations,
  getRecitations,
  getRecitationById
};