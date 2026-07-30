/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectFile {
  path: string;
  name: string;
  content: string;
  language: 'html' | 'css' | 'javascript' | 'markdown' | 'text';
  description: string;
}

export interface WebsiteTheme {
  id: string;
  name: string;
  primary: string; // Tailwind or Hex color representing primary color
  secondary: string;
  accent: string;
  bgGradient: string;
  primaryHex: string; // The physical hex color injected into css variables
  secondaryHex: string;
  accentHex: string;
}

export interface WebsiteConfig {
  companyName: string;
  heroTitle: string;
  heroSub: string;
  heroBtnText: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  mission: string;
  vision: string;
  advantages: string[];
}
