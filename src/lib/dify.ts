import { DifyResponse, DifyRequestOptions } from '@/types/dify';

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = 'https://api.dify.ai/v1/workflows/run';

export async function sendMessageToDify(options: DifyRequestOptions): Promise<DifyResponse> {
  const response = await fetch(DIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIFY_API_KEY}`
    },
    body: JSON.stringify({
      inputs: options.inputs,
      response_mode: options.response_mode || 'blocking',
      user: options.user || 'default_user', // userパラメータを追加
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Dify API error: ${response.status}, ${JSON.stringify(errorData)}`);
  }

  return response.json();
}