import {NotionAPI} from 'notion-client'

const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL
})

export default notion
