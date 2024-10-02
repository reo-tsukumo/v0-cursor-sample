import { NextResponse } from 'next/server';

// チャットAPIのPOSTリクエストを処理する関数
export async function POST(req: Request) {
  // リクエストボディからメッセージを取得
  const { message } = await req.json();
  
  // ここでAIモデルとの通信や処理を行う
  // 注意: これはモックの応答です。実際のプロジェクトでは適切なAIサービスと連携する必要があります
  const botResponse = `AIの応答: ${message}`;
  
  // アーティファクトの生成（実際のプロジェクトではAIモデルの出力に基づいて生成）
  const artifact = message.includes('要約') 
    ? { title: '要約レポート', content: `"${message}"の要約内容です。` }
    : null;

  // レスポンスを返す
  return NextResponse.json({ botResponse, artifact });
}