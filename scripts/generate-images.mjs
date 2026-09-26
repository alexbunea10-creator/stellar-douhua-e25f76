// One-off concept imagery generation for the Orlando the Martyr LLC site.
// Run with: node scripts/generate-images.mjs
// Output: public/img/*.jpg (served through the Netlify Image CDN).
import { GoogleGenAI } from '@google/genai'
import { writeFile } from 'node:fs/promises'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const LOOK =
  'Editorial music-magazine photography. Desaturated palette of black, off-white and silver with one restrained accent tone. ' +
  'Natural, cinematic low light, fine 35mm film grain, generous negative space, no text, no logos, no watermarks, no captions.'

const IMAGES = [
  {
    file: 'hero.jpg',
    prompt: `Wide 21:9 establishing photograph: an empty South Jersey shore town street at blue hour, boardwalk silhouettes and a motel sign out of focus in the distance, damp asphalt reflecting light, cool silver haze. Nobody in frame. ${LOOK}`,
  },
  {
    file: 'studio.jpg',
    prompt: `A portable recording rig set up inside an ordinary living room: condenser microphone on a boom stand with a pop filter, laptop and small audio interface on a folding table, coiled cables, closed headphones, a blanket taped to the wall for treatment. Late evening lamp light. No people. ${LOOK}`,
  },
  {
    file: 'founder.jpg',
    prompt: `Vertical 4:5 concept portrait of a fictional Latino man in his late twenties, short dark hair, plain black hoodie, standing against a weathered off-white wall, arms relaxed, calm and serious expression, looking just off camera. Soft window light from the left. ${LOOK}`,
  },
  {
    file: 'artist-yxngjj.jpg',
    prompt: `Vertical 4:5 concept portrait of a fictional young man in his early twenties, dark jacket and simple chain, seated on a concrete step under a stairwell, elbows on knees, quiet confident expression. Hard single light source, deep shadows, faint cool blue accent. ${LOOK}`,
  },
  {
    file: 'artist-iceymac.jpg',
    parameter: true,
    prompt: `Vertical 4:5 concept portrait of a fictional creative in their mid twenties wearing a light grey overshirt and cap, standing in a garage doorway at night with a faint teal light spill behind them, one hand in pocket. Reserved, observant expression. ${LOOK}`,
  },
  {
    file: 'artist-yari.jpg',
    prompt: `Vertical 4:5 concept portrait of a fictional young woman in her early twenties, long dark hair, cream knit top, standing in front of a plain silver-grey wall, head slightly turned, composed expression. Soft diffused daylight with a warm amber accent. ${LOOK}`,
  },
  {
    file: 'events.jpg',
    prompt: `Wide 16:9 photograph of a small independent live music night in a modest venue: crowd silhouettes from behind, a single performer far off in the distance under one warm spotlight, haze in the air, no readable signage or text. ${LOOK}`,
  },
  {
    file: 'about.jpg',
    prompt: `Wide 16:9 still life: a scuffed hardwood floor with a notebook of handwritten lyrics (illegible scribbles, no readable words), a pair of headphones, a set of keys and a paper coffee cup arranged loosely, shot from directly above. Morning light raking across the floor. ${LOOK}`,
  },
]

for (const { file, prompt } of IMAGES) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: prompt,
    })
    const parts = response.candidates?.[0]?.content?.parts ?? []
    const image = parts.find((p) => p.inlineData)
    if (!image) {
      console.error(`no image returned for ${file}`)
      continue
    }
    await writeFile(`public/img/${file}`, Buffer.from(image.inlineData.data, 'base64'))
    console.log(`wrote public/img/${file}`)
  } catch (error) {
    console.error(`failed ${file}:`, error.message)
  }
}
