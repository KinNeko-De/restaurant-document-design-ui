export interface Template {
  id: string;
  name: string;
  description: string;
  language: TemplateLanguage;
  favourite: boolean;
  lastModified: Date;
  tags?: string[];
  status: 'Draft' | 'Active';
}

export interface TemplateDetail extends Template {
  content: string; // Example additional property
  author: string;  // Example additional property
}

export enum TemplateLanguage {
  LuaLaTex = 0,
  Word = 1
}

export interface TemplateGateway {
  fetchTemplates: () => Promise<Template[]>;
  fetchTemplate: (id: string) => Promise<TemplateDetail>;
}