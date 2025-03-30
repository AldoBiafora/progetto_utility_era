declare const process: any;

export const environment = {
  production: true,
  geminiApiKey: process.env['GEMINI_API_KEY'] || ''
}; 