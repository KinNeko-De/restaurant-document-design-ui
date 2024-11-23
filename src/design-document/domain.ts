export interface TemplatePreview {
  id: string;
  name: string;
  description: string;
  language: TemplateLanguage;
  lastModified: Date;
  tags?: string[];
  status: 'Draft' | 'Active';
  favourite: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  language: TemplateLanguage;
  lastModified: Date;
  tags?: string[];
  status: 'Draft' | 'Active';
  files?: TemplateFile[];
}

export enum TemplateLanguage {
  LuaLaTex = 0,
  Word = 1
}

export interface TemplateFile {
  name: string;
  mediaType: string;
}

export interface TemplateGateway {
  fetchTemplates: () => Promise<TemplatePreview[]>;
  fetchTemplate: (id: string) => Promise<Template>;
}