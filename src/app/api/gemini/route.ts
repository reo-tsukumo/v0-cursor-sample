import { NextRequest, NextResponse } from 'next/server';

let processingStatus: 'idle' | 'processing' | 'completed' | 'error' = 'idle';
let extractedText = '';

export async function POST(req: NextRequest) {
  processingStatus = 'processing';
  
  // 即座に202 Acceptedステータスを返す
  const response = NextResponse.json({ message: 'Files received. Processing started.' }, { status: 202 });
  
  // 非同期でファイル処理を開始
  processFiles(await req.formData());
  
  return response;
}

export async function GET() {
  if (processingStatus === 'processing') {
    return NextResponse.json({ message: 'Still processing' }, { status: 202 });
  } else if (processingStatus === 'completed') {
    return NextResponse.json({ text: extractedText }, { status: 200 });
  } else if (processingStatus === 'error') {
    return NextResponse.json({ error: 'An error occurred during processing' }, { status: 500 });
  } else {
    return NextResponse.json({ message: 'No processing in progress' }, { status: 404 });
  }
}

async function processFiles(formData: FormData) {
  try {
    // ここでファイルの処理ロジックを実装
    // 例: PDFからテキストを抽出し、AIで処理する
    await new Promise(resolve => setTimeout(resolve, 5000)); // 処理時間をシミュレート
    
    // エラーをシミュレート
    throw new Error('File processing failed');

    // 以下のコードは実行されません
    // extractedText = 'This is the extracted and processed text from the PDF files.';
    // processingStatus = 'completed';
  } catch (error) {
    console.error('Error processing files:', error);
    processingStatus = 'error';
  }
}