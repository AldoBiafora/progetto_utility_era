declare const process: any;

export const environment = {
  production: false,
  geminiApiKey: process.env['GEMINI_API_KEY'] || ''
}; 