import fs from 'fs/promises';
import path from 'path';

export async function loadPrompt(promptName: string): Promise<string> {
  try {
    const promptPath = path.join(process.cwd(), 'src', 'prompts', `${promptName}.txt`);
    const content = await fs.readFile(promptPath, { encoding: 'utf-8' });
    
    if (typeof content !== 'string') {
      throw new Error('Loaded prompt is not a string');
    }
    
    return content.trim();
  } catch (error) {
    console.error(`Error loading prompt ${promptName}:`, error);
    throw error;
  }
}