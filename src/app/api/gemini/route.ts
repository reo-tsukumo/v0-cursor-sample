import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { loadPrompt } from '@/lib/loadPrompt';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GOOGLE_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

let processingStatus: 'idle' | 'processing' | 'completed' | 'error' = 'idle';
let extractedText = '';

// プロンプトを格納する変数
let pdfSummaryPrompt: string;

export async function POST(req: NextRequest) {
  try {
    processingStatus = 'processing';
    extractedText = '';
    
    // プロンプトを非同期で読み込む
    pdfSummaryPrompt = await loadPrompt('pdf-summary');
    
    const response = NextResponse.json({ message: 'Files received. Processing started.' }, { status: 202 });
    
    createSummary(await req.formData());
    
    return response;
  } catch (error) {
    console.error('Error in POST request:', error);
    processingStatus = 'error';
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
  }
}

export async function GET() {
  if (processingStatus === 'processing') {
    return NextResponse.json({ message: 'Still processing' }, { status: 202 });
  } else if (processingStatus === 'completed') {
    const result = { text: extractedText };
    // 処理完了後、抽出されたテキストをクリア
    extractedText = '';
    processingStatus = 'idle';
    return NextResponse.json(result, { status: 200 });
  } else if (processingStatus === 'error') {
    processingStatus = 'idle';
    return NextResponse.json({ error: 'An error occurred during processing' }, { status: 500 });
  } else {
    return NextResponse.json({ message: 'No processing in progress' }, { status: 404 });
  }
}

async function createSummary(formData: FormData) {
  try {
    const files = formData.getAll('files') as File[];
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    for (const file of files) {
      const fileData = await file.arrayBuffer();
      const parts = [
        {
          inlineData: {
            mimeType: file.type,
            data: Buffer.from(fileData).toString('base64')
          }
        },
        { text: pdfSummaryPrompt } // 読み込んだプロンプトを使用
      ];

      const result = await model.generateContent(parts);
      const response = await result.response;
      const summary = response.text();

      extractedText += `${file.name} の要約:\n${summary}\n\n`;
    }

    processingStatus = 'completed';
  } catch (error) {
    console.error('Error processing files:', error);
    processingStatus = 'error';
  } finally {
    // 処理完了後、ファイルデータをクリア
    formData = new FormData();
  }
}