import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdf(buffer);

    // テキストのクリーンアップ
    let cleanedText = data.text
      .replace(/(\r\n|\n|\r)/gm, " ") // 改行を空白に置換
      .replace(/\s+/g, " ") // 複数の空白を1つの空白に置換
      .trim(); // 前後の空白を削除

    // 日本語固有の処理
    cleanedText = cleanedText
      .replace(/([。、！？])\s/g, "$1") // 句読点の後の不要な空白を削除
      .replace(/\s+/g, " ") // 再度、複数の空白を1つの空白に置換
      .replace(/([。、！？])([^」』】］｝）])/g, "$1 $2"); // 句読点の後に空白を挿入（ただし閉じカッコの前には挿入しない）

    return NextResponse.json({ text: cleanedText });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}