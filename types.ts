export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string; // URL or Lucide icon name mapping
  downloadUrl?: string;
  tags: string[];
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
