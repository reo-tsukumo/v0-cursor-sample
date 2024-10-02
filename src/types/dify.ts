export interface DifyResponse {
    task_id: string;
    workflow_run_id: string;
    data: {
      id: string;
      workflow_id: string;
      status: string;
      outputs: {
        text: string;
      };
      error: null | string;
      elapsed_time: number;
      total_tokens: number;
      total_steps: number;
      created_at: number;
      finished_at: number;
    };
  }
  
  export interface DifyRequestOptions {
    inputs?: {
      query?: string;
      context?: string;
      task?: string;
    };
    response_mode?: 'streaming' | 'blocking';
    conversation_id?: string | null;
    user: string;
    files?: string[];
  }