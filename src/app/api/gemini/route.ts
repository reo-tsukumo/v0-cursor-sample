import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('files') as File;

    if (!file) {
      return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 });
    }

    // 常にエラーを返す
    return NextResponse.json({ status: 'error', error: 'PDFの処理中に予期せぬエラーが発生しました' }, { status: 500 });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ status: 'error', error: 'PDFの処理中にエラーが発生しました' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // 常にエラー状態を返す
  return NextResponse.json({ status: 'error', error: 'PDFの処理中にエラーが発生しました' }, { status: 500 });
}