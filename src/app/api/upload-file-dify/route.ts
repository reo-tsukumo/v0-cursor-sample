import { NextResponse } from 'next/server'

const DIFY_API_KEY_DOCUMENT_EXTRACTION = process.env.DIFY_API_KEY_DOCUMENT_EXTRACTION
const DIFY_API_URL = 'https://api.dify.ai/v1/files/upload'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    console.log('受信したformData:', Array.from(formData.entries()))
    
    // Dify APIにファイルをアップロード
    console.log('Dify APIリクエスト開始:', DIFY_API_URL)
    const response = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY_DOCUMENT_EXTRACTION}`,
      },
      body: formData,
    })

    console.log('Dify APIレスポンスステータス:', response.status)

    if (!response.ok) {
      const error = await response.json()
      console.error('Dify APIエラーレスポンス:', error)
      throw new Error(error.message || 'ファイルのアップロードに失敗しました')
    }

    const data = await response.json()
    console.log('Dify API成功レスポンス:', data)
    return NextResponse.json(data)

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'ファイルのアップロードに失敗しました' },
      { status: 500 }
    )
  }
}