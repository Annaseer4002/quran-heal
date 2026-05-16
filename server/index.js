import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
import { getAccessToken,
   getChapterById,
    getChapters,
     getRecitationById,
     getRecitations,
      getTranslations,
       getUthmani, getUthmaniById,
        getUthmaniTajweed,
         getVerses } from './utils/quranClient.js'

dotenv.config()





const app = express()
app.use(cors())
app.use(express.json())


app.get('/api/chapters', async (req, res) => {
  try {
    const token = await getAccessToken();
    const chapters = await getChapters(token);
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/chapter/:chapterId', async (req, res) => {
  try {
    const token = await getAccessToken()
    const chapterId = req.params.chapterId

     if(!chapterId){
      return res.status(400).json({error: 'Chapter ID is required'})
    }


    const chapter = await getChapterById(token, chapterId)
    res.status(200).json(chapter)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});


app.get('/api/verses/:chapterId', async (req, res) => {
  try {
    const token = await getAccessToken()
    const chapterId = req.params.chapterId

    if(!chapterId){
      return res.status(400).json({error: 'Chapter ID is required'})
    }


    const verses = await getVerses(token, chapterId)
    res.status(200).json(verses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});


// arabic text uthmaani
app.get('/api/uthmani', async (req, res) => {
  try {
    const token = await getAccessToken()
    const uthmani = await getUthmani(token)

    res.status(200).json(uthmani)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// arabic text uthmaani surah
app.get('/api/uthmani/:surahId', async (req, res) => {
  try {
    const token = await getAccessToken()
    const surahId = req.params.surahId

    if (!surahId){
      return res.status(400).json({error: 'Surah ID is required'})
    }

    const uthmani = await getUthmaniById(token, surahId)

    res.status(200).json(uthmani)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// uthmani tajweed
app.get('/api/uthmani-tajweed/:surahId', async (req, res) => {
  try {

    const token = await getAccessToken()
    const surahId = req.params.surahId
    
    if (!surahId){
      return res.status(400).json({error: 'Surah ID is required'})
    }

    const uthmaniTajweed = await getUthmaniTajweed(token, surahId)

    res.status(200).json(uthmaniTajweed)
    
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


// translations
app.get('/api/translations/:surahId', async (req, res) => {
    try {

      const token = await getAccessToken()
      const surahId = req.params.surahId

        if (!surahId){
          return res.status(400).json({error: 'Surah ID is required'})
        }

      const translations = await getTranslations(token, surahId)
      res.status(200).json(translations)
      
    } catch (error) {
      res.status(500).json({error: error.message})
    }
})


app.get('/api/recitations', async (req, res) => {
  try {

    const token = await getAccessToken()
    // const recitation_id = req.params.recitation_id

    // if(!recitation_id){
    //   return res.status(400).json({error: 'Recitation ID is required'})
    // }

    const recitations = await getRecitations(token)

    res.status(200).json(recitations)
    
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


app.get('/api/recitation/:recitationId', async (req, res) => {

  try {

    const token = await getAccessToken()
    const recitation_id = req.params.recitationId

    if(!recitation_id){
      return res.status(400).json({error: 'Recitation ID is required'})
    }

    const recitation = await getRecitationById(token, recitation_id)
    res.status(200).json(recitation)
    
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})



const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})