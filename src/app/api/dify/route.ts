import { NextResponse } from 'next/server';
import { sendMessageToDify } from '@/lib/dify';
import { DifyResponse } from '@/types/dify';

export async function POST(req: Request) {
  try {
    const { message, context, task, user } = await req.json();
    
    const difyResponse: DifyResponse = await sendMessageToDify({
      inputs: {
        query: message,
        context: context,
        task: task
      },
      user: user
    });
    
    console.log(difyResponse);
    const llmMessage = difyResponse.data.outputs.text;
    const artifact = difyResponse.data.outputs.text ? {
      title: 'AI思考プロセス',
      content: difyResponse.data.outputs.text
    } : null;

    return NextResponse.json({ llmMessage, artifact});
  } catch (error: unknown) {
    console.error('Dify API error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}