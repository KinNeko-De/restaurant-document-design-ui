export interface Template {
  name: string;
  description: string;
  language: TemplateLanguage;
  favourite: boolean;
  lastModified: Date;
  tags?: string[]
  status: 'Draft' | 'Active';
}

export enum TemplateLanguage {
  LuaLaTex = 0,
  Word = 1
}
