/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Code, 
  Compass, 
  Download, 
  Monitor, 
  Smartphone, 
  RefreshCw, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink, 
  Folder, 
  ChevronRight, 
  Info, 
  Eye, 
  PenTool, 
  Briefcase, 
  Target, 
  HelpCircle,
  FileCode,
  CheckCircle,
  TrendingUp,
  Server,
  CloudLightning,
  CornerDownRight
} from 'lucide-react';
import { WebsiteTheme, WebsiteConfig } from './types';
import { 
  getIndexHtml, 
  getAboutHtml, 
  getContactHtml, 
  getStyleCss, 
  getScriptJs, 
  getReadmeMd,
  getPackageJson,
  generateLogoPngBase64 
} from './templates';
import JSZip from 'jszip';

// Color Presets for the Website
const THEMES: WebsiteTheme[] = [
  {
    id: 'cobalt',
    name: 'Cobalt Odyssey',
    primary: 'indigo-600',
    secondary: 'indigo-800',
    accent: 'blue-500',
    bgGradient: 'from-indigo-600 to-blue-500',
    primaryHex: '#3b82f6',
    secondaryHex: '#1d4ed8',
    accentHex: '#60a5fa'
  },
  {
    id: 'emerald',
    name: 'Emerald Forge',
    primary: 'emerald-600',
    secondary: 'emerald-800',
    accent: 'teal-500',
    bgGradient: 'from-emerald-600 to-teal-500',
    primaryHex: '#10b981',
    secondaryHex: '#047857',
    accentHex: '#14b8a6'
  },
  {
    id: 'sunset',
    name: 'Sunset Crimson',
    primary: 'rose-600',
    secondary: 'rose-800',
    accent: 'orange-500',
    bgGradient: 'from-rose-600 to-orange-500',
    primaryHex: '#f43f5e',
    secondaryHex: '#be185d',
    accentHex: '#f97316'
  },
  {
    id: 'amethyst',
    name: 'Amethyst Glow',
    primary: 'purple-600',
    secondary: 'purple-800',
    accent: 'pink-500',
    bgGradient: 'from-purple-600 to-pink-500',
    primaryHex: '#8b5cf6',
    secondaryHex: '#6d28d9',
    accentHex: '#ec4899'
  },
  {
    id: 'brutalist',
    name: 'Midnight Cyber',
    primary: 'slate-800',
    secondary: 'slate-950',
    accent: 'rose-500',
    bgGradient: 'from-slate-800 to-rose-500',
    primaryHex: '#1e293b',
    secondaryHex: '#0f172a',
    accentHex: '#f43f5e'
  }
];

// Initial Customizer Values
const INITIAL_CONFIG: WebsiteConfig = {
  companyName: 'My First AI Website',
  heroTitle: 'Transforming Business Through Artificial Intelligence',
  heroSub: 'Deploy lightning-fast static assets instantly configured for cloud scalability. Optimized for 100% score audits on Hostinger hPanel environments.',
  heroBtnText: 'Get Started Now',
  feature1Title: 'High-Speed Performance',
  feature1Desc: 'Optimized static delivery pipelines render content under 200ms with zero compilation bottlenecks.',
  feature2Title: 'Ultra Responsive Grid',
  feature2Desc: 'Adaptive container layouts span smoothly from mobile screen interfaces up to wide monitors.',
  feature3Title: 'Direct Hostinger Sync',
  feature3Desc: 'Zero-config integration. Download the bundled zip package, drop inside public_html, and go live.',
  mission: 'To democratize access to gorgeous, high-performance static websites through AI-assisted development tools.',
  vision: 'A world where local businesses and innovators launch pristine, responsive websites in seconds without dependency overhead.',
  advantages: [
    'Handwritten Static Architecture',
    'Zero NPM Dependencies Needed',
    'Perfect Hostinger hPanel Match'
  ]
};

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<'customizer' | 'explorer' | 'deploy'>('customizer');
  const [activeTheme, setActiveTheme] = useState<WebsiteTheme>(THEMES[0]);
  const [config, setConfig] = useState<WebsiteConfig>(INITIAL_CONFIG);
  
  // Custom edits on code
  const [manualEdits, setManualEdits] = useState<{ [key: string]: string }>({});
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  
  // Explorer state
  const [selectedFile, setSelectedFile] = useState<string>('index.html');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  
  // Preview simulator state
  const [previewPage, setPreviewPage] = useState<string>('index.html');
  const [deviceSize, setDeviceSize] = useState<'desktop' | 'mobile'>('desktop');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);
  
  // References
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate contents dynamically
  const generatedFiles = {
    'index.html': manualEdits['index.html'] !== undefined && isEditMode ? manualEdits['index.html'] : getIndexHtml(config, activeTheme),
    'about.html': manualEdits['about.html'] !== undefined && isEditMode ? manualEdits['about.html'] : getAboutHtml(config, activeTheme),
    'contact.html': manualEdits['contact.html'] !== undefined && isEditMode ? manualEdits['contact.html'] : getContactHtml(config, activeTheme),
    'css/style.css': manualEdits['css/style.css'] !== undefined && isEditMode ? manualEdits['css/style.css'] : getStyleCss(config, activeTheme),
    'js/script.js': manualEdits['js/script.js'] !== undefined && isEditMode ? manualEdits['js/script.js'] : getScriptJs(),
    'package.json': manualEdits['package.json'] !== undefined && isEditMode ? manualEdits['package.json'] : getPackageJson(config),
    'README.md': manualEdits['README.md'] !== undefined && isEditMode ? manualEdits['README.md'] : getReadmeMd(config),
  };

  // Sync state back from iframe postMessages (for routing links in the simulator!)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'navigate') {
        setPreviewPage(event.data.page);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update simulator iframe whenever preview page, config, or theme changes
  useEffect(() => {
    if (!iframeRef.current) return;
    
    // Core files
    const htmlContent = generatedFiles[previewPage as keyof typeof generatedFiles] || generatedFiles['index.html'];
    const cssContent = generatedFiles['css/style.css'];
    const jsContent = generatedFiles['js/script.js'];

    // Assemble dynamic document injection
    // Replace link stylesheet and script tags with fully loaded inline versions for flawless self-contained rendering
    let combinedDoc = htmlContent;
    
    // Inject style inline
    combinedDoc = combinedDoc.replace(
      /<link rel="stylesheet" href="css\/style\.css">/g,
      `<style>${cssContent}</style>`
    );
    
    // Inject link script interceptor right before script tags
    const navigationInterceptorScript = `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          // Intercept all link clicks inside simulation
          document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
              const href = this.getAttribute('href');
              if (href && (href === 'index.html' || href === 'about.html' || href === 'contact.html')) {
                e.preventDefault();
                window.parent.postMessage({ type: 'navigate', page: href }, '*');
              } else if (href && href.startsWith('http')) {
                // Prevent opening real external links in sandboxed iframe
                e.preventDefault();
                alert('External redirection to "' + href + '" simulated! In production, this link opens normally.');
              }
            });
          });

          // Intercept contact form submit with smooth modal
          const form = document.getElementById('contact-form');
          if (form) {
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              const banner = document.getElementById('form-success-banner');
              if (banner) {
                banner.classList.remove('hidden');
              }
              form.reset();
            });
          }
        });
      </script>
    `;

    // Inject JS script inline and script navigation interceptor
    combinedDoc = combinedDoc.replace(
      /<script src="js\/script\.js"><\/script>/g,
      `<script>${jsContent}</script>${navigationInterceptorScript}`
    );

    // Set srcdoc on the iframe
    iframeRef.current.srcdoc = combinedDoc;
  }, [previewPage, config, activeTheme, manualEdits, isEditMode]);

  // Handle ZIP Packaging and Download
  const handleDownloadZip = async () => {
    setIsZipping(true);
    setZipSuccess(false);
    
    try {
      const zip = new JSZip();
      
      // Add root HTML files
      zip.file('index.html', generatedFiles['index.html']);
      zip.file('about.html', generatedFiles['about.html']);
      zip.file('contact.html', generatedFiles['contact.html']);
      
      // Create and populate subdirectories
      const cssDir = zip.folder('css');
      if (cssDir) {
        cssDir.file('style.css', generatedFiles['css/style.css']);
      }
      
      const jsDir = zip.folder('js');
      if (jsDir) {
        jsDir.file('script.js', generatedFiles['js/script.js']);
      }
      
      const imagesDir = zip.folder('images');
      if (imagesDir) {
        const logoBase64 = generateLogoPngBase64(activeTheme.primaryHex, activeTheme.accentHex);
        imagesDir.file('logo.png', logoBase64, { base64: true });
      }
      
      // Add package.json (for Hostinger Git deployment compatibility)
      zip.file('package.json', generatedFiles['package.json']);
      
      // Add README documentation
      zip.file('README.md', generatedFiles['README.md']);
      
      // Generate ZIP blob
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Direct file downloader
      const blobUrl = URL.createObjectURL(content);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'Trial-Website.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);
      
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = (filename: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  // Reset custom text configurations
  const handleResetConfig = () => {
    if (window.confirm('Are you sure you want to restore the default website texts?')) {
      setConfig(INITIAL_CONFIG);
      setManualEdits({});
      setIsEditMode(false);
    }
  };

  // Update manual edit text state
  const handleCodeChange = (filename: string, value: string) => {
    setIsEditMode(true);
    setManualEdits(prev => ({
      ...prev,
      [filename]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Professional Header Bar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <CloudLightning className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              Hostinger Static Exporter
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0.0
              </span>
            </h1>
            <p className="text-xs text-slate-400">Customizable vanilla HTML5, CSS3, & JS website blueprint</p>
          </div>
        </div>

        {/* Quick export trigger button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadZip}
            disabled={isZipping}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md ${
              zipSuccess 
                ? 'bg-emerald-600 text-white shadow-emerald-600/10' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:-translate-y-0.5 shadow-indigo-600/20 active:translate-y-0'
            }`}
          >
            {isZipping ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Compiling ZIP...
              </>
            ) : zipSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Exported successfully!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Hostinger ZIP
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Dual-Panel Layout Workspace */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* LEFT WORKSTATION PANEL: Customizer, Explorer, or Deploy Guide */}
        <section className="w-[450px] border-r border-slate-800 bg-slate-950 flex flex-col shrink-0 overflow-hidden">
          
          {/* Section Selector Tab Buttons */}
          <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900 p-1 m-3 rounded-xl">
            <button 
              onClick={() => setActiveTab('customizer')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'customizer' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Customize
            </button>
            <button 
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'explorer' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              File Explorer
            </button>
            <button 
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'deploy' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              Hostinger Guide
            </button>
          </div>

          {/* ACTIVE CONTENT VIEW - Scrollable */}
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            
            {/* VIEW 1: CUSTOMIZER TAB */}
            {activeTab === 'customizer' && (
              <div className="space-y-6">
                
                {/* Visual Style Theme Picker */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      1. Brand Colors & Vibe
                    </label>
                    <span className="text-xxs text-slate-500">Injects into style.css variables</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          activeTheme.id === theme.id 
                            ? 'bg-indigo-600/10 border-indigo-500/50 text-white shadow-md' 
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Circle showcasing color combination */}
                          <div className="flex shrink-0">
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryHex }}></span>
                            <span className="w-4 h-4 rounded-full -ml-1.5 border border-slate-900" style={{ backgroundColor: theme.accentHex }}></span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold block">{theme.name}</span>
                            <span className="text-xxs text-slate-400 font-mono">{theme.primaryHex} &bull; {theme.accentHex}</span>
                          </div>
                        </div>
                        {activeTheme.id === theme.id && (
                          <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Content Inputs */}
                <div className="space-y-4 pt-4 border-t border-slate-800/60">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      2. Edit Website Copy
                    </label>
                    <button 
                      onClick={handleResetConfig}
                      className="text-xxs text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      Reset Copy
                    </button>
                  </div>

                  {/* Company/Website Name */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      Company Name
                    </span>
                    <input 
                      type="text" 
                      value={config.companyName}
                      onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                      placeholder="My First AI Website"
                    />
                  </div>

                  {/* Hero Headline */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      Hero Headline
                    </span>
                    <textarea 
                      value={config.heroTitle}
                      onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium leading-relaxed"
                      placeholder="Enter powerful hero line"
                      rows={2}
                    />
                  </div>

                  {/* Hero Subtitle */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      Hero Subtitle / Description
                    </span>
                    <textarea 
                      value={config.heroSub}
                      onChange={(e) => setConfig({ ...config, heroSub: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium leading-relaxed"
                      placeholder="Enter paragraph summary"
                      rows={3}
                    />
                  </div>

                  {/* Hero Button Text */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      Hero Button Text
                    </span>
                    <input 
                      type="text" 
                      value={config.heroBtnText}
                      onChange={(e) => setConfig({ ...config, heroBtnText: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                      placeholder="Get Started"
                    />
                  </div>

                  {/* Dynamic Feature List */}
                  <div className="pt-3 border-t border-slate-800/40 space-y-3">
                    <span className="text-xs font-semibold text-slate-400 block">Feature Cards:</span>
                    
                    {/* Card 1 */}
                    <div className="p-3 bg-slate-900/30 border border-slate-800/60 rounded-xl space-y-2">
                      <span className="text-xxs text-indigo-400 font-bold block">CARD 1</span>
                      <input 
                        type="text" 
                        value={config.feature1Title}
                        onChange={(e) => setConfig({ ...config, feature1Title: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                        placeholder="Title"
                      />
                      <textarea 
                        value={config.feature1Desc}
                        onChange={(e) => setConfig({ ...config, feature1Desc: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 leading-normal"
                        placeholder="Description"
                        rows={2}
                      />
                    </div>

                    {/* Card 2 */}
                    <div className="p-3 bg-slate-900/30 border border-slate-800/60 rounded-xl space-y-2">
                      <span className="text-xxs text-indigo-400 font-bold block">CARD 2</span>
                      <input 
                        type="text" 
                        value={config.feature2Title}
                        onChange={(e) => setConfig({ ...config, feature2Title: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                        placeholder="Title"
                      />
                      <textarea 
                        value={config.feature2Desc}
                        onChange={(e) => setConfig({ ...config, feature2Desc: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 leading-normal"
                        placeholder="Description"
                        rows={2}
                      />
                    </div>

                    {/* Card 3 */}
                    <div className="p-3 bg-slate-900/30 border border-slate-800/60 rounded-xl space-y-2">
                      <span className="text-xxs text-indigo-400 font-bold block">CARD 3</span>
                      <input 
                        type="text" 
                        value={config.feature3Title}
                        onChange={(e) => setConfig({ ...config, feature3Title: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                        placeholder="Title"
                      />
                      <textarea 
                        value={config.feature3Desc}
                        onChange={(e) => setConfig({ ...config, feature3Desc: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 leading-normal"
                        placeholder="Description"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Mission & Vision (For About Page) */}
                  <div className="pt-3 border-t border-slate-800/40 space-y-3">
                    <span className="text-xs font-semibold text-slate-400 block">About Page Info:</span>
                    <div className="space-y-2">
                      <span className="text-xxs text-slate-300 font-medium block">Our Mission</span>
                      <textarea 
                        value={config.mission}
                        onChange={(e) => setConfig({ ...config, mission: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                        placeholder="Company Mission Statement"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xxs text-slate-300 font-medium block">Our Vision</span>
                      <textarea 
                        value={config.vision}
                        onChange={(e) => setConfig({ ...config, vision: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                        placeholder="Company Vision Statement"
                        rows={2}
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* VIEW 2: CODE FILE EXPLORER & EDITOR */}
            {activeTab === 'explorer' && (
              <div className="space-y-4 flex flex-col h-full">
                
                {/* File Navigator Panel */}
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Project Tree
                  </span>
                  
                  {/* index.html */}
                  <button 
                    onClick={() => setSelectedFile('index.html')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedFile === 'index.html' 
                        ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                        : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-orange-400" />
                      index.html
                    </span>
                    <span className="text-xxs text-slate-500 font-sans">Home Page</span>
                  </button>

                  {/* about.html */}
                  <button 
                    onClick={() => setSelectedFile('about.html')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedFile === 'about.html' 
                        ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                        : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-orange-400" />
                      about.html
                    </span>
                    <span className="text-xxs text-slate-500 font-sans">About Page</span>
                  </button>

                  {/* contact.html */}
                  <button 
                    onClick={() => setSelectedFile('contact.html')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedFile === 'contact.html' 
                        ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                        : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-orange-400" />
                      contact.html
                    </span>
                    <span className="text-xxs text-slate-500 font-sans">Contact Page</span>
                  </button>

                  {/* Folder css/ */}
                  <div className="pt-2">
                    <span className="text-xxs text-slate-500 font-semibold px-1.5 flex items-center gap-1">
                      <Folder className="w-3 h-3" />
                      css
                    </span>
                    <button 
                      onClick={() => setSelectedFile('css/style.css')}
                      className={`w-full mt-1 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        selectedFile === 'css/style.css' 
                          ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                          : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                      }`}
                    >
                      <span className="flex items-center gap-2 pl-3">
                        <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
                        <FileCode className="w-4 h-4 text-blue-400" />
                        style.css
                      </span>
                      <span className="text-xxs text-slate-500 font-sans">CSS Styles</span>
                    </button>
                  </div>

                  {/* Folder js/ */}
                  <div className="pt-2">
                    <span className="text-xxs text-slate-500 font-semibold px-1.5 flex items-center gap-1">
                      <Folder className="w-3 h-3" />
                      js
                    </span>
                    <button 
                      onClick={() => setSelectedFile('js/script.js')}
                      className={`w-full mt-1 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        selectedFile === 'js/script.js' 
                          ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                          : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                      }`}
                    >
                      <span className="flex items-center gap-2 pl-3">
                        <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
                        <FileCode className="w-4 h-4 text-yellow-400" />
                        script.js
                      </span>
                      <span className="text-xxs text-slate-500 font-sans">Vanilla JS</span>
                    </button>
                  </div>

                  {/* Folder images/ */}
                  <div className="pt-2">
                    <span className="text-xxs text-slate-500 font-semibold px-1.5 flex items-center gap-1">
                      <Folder className="w-3 h-3" />
                      images
                    </span>
                    <div className="w-full mt-1 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono bg-slate-900/20 border border-slate-800 text-slate-400 cursor-not-allowed">
                      <span className="flex items-center gap-2 pl-3">
                        <CornerDownRight className="w-3.5 h-3.5 text-slate-600" />
                        <Eye className="w-4 h-4 text-purple-400 animate-pulse" />
                        logo.png
                      </span>
                      <span className="text-xxs text-slate-500 font-sans">Generated Dynamic PNG</span>
                    </div>
                  </div>

                  {/* package.json */}
                  <button 
                    onClick={() => setSelectedFile('package.json')}
                    className={`w-full mt-2 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedFile === 'package.json' 
                        ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                        : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-yellow-400" />
                      package.json
                    </span>
                    <span className="text-xxs text-slate-500 font-sans">Hostinger Manifest</span>
                  </button>

                  {/* README.md */}
                  <button 
                    onClick={() => setSelectedFile('README.md')}
                    className={`w-full mt-2 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedFile === 'README.md' 
                        ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                        : 'bg-slate-900/40 border border-transparent text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      README.md
                    </span>
                    <span className="text-xxs text-slate-500 font-sans">Documentation</span>
                  </button>
                </div>

                {/* Manual Edit Mode Status Indicator */}
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/15 rounded-xl">
                  <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1 mb-1">
                    <PenTool className="w-3.5 h-3.5" />
                    Interactive Playground Editor
                  </span>
                  <p className="text-xxs text-slate-400 leading-relaxed">
                    You can inspect or directly rewrite code inside the editor below. Doing so activates manual override mode, showing changes in the browser preview instantly!
                  </p>
                </div>
              </div>
            )}

            {/* VIEW 3: HOSTINGER DEPLOYMENT GUIDE */}
            {activeTab === 'deploy' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Deploying to Hostinger hPanel
                </span>
                
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl space-y-1">
                  <span className="text-xs font-bold block flex items-center gap-1">
                    ⚡ Hostinger Deploy Note ("Missing package.json")
                  </span>
                  <p className="text-xxs leading-relaxed text-amber-200/90">
                    If deploying directly via Hostinger's GitHub integration and seeing <em className="text-white font-mono">"This repository is missing a package.json file..."</em>:
                  </p>
                  <ul className="text-xxs list-disc list-inside text-amber-100 space-y-0.5 pt-1">
                    <li>Option A: Click <strong className="text-white">"continue as a static website"</strong> (Recommended for pure HTML/CSS/JS).</li>
                    <li>Option B: The export ZIP generated here now includes a lightweight <code className="bg-amber-950/60 text-yellow-300 px-1 py-0.5 rounded font-mono">package.json</code> file automatically!</li>
                  </ul>
                </div>

                {/* Steps Stepper */}
                <div className="space-y-4 pt-1 font-sans">
                  
                  {/* Step 1 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Export Your Project</h4>
                      <p className="text-xxs text-slate-400 leading-normal mt-0.5">
                        Click the **Download Hostinger ZIP** button on the top-right to save the zipped bundle onto your desktop.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Log into hPanel Portal</h4>
                      <p className="text-xxs text-slate-400 leading-normal mt-0.5">
                        Navigate to <a href="https://hpanel.hostinger.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">Hostinger hPanel <ExternalLink className="w-2.5 h-2.5" /></a>, input your credentials, and click on **Manage** next to your domain.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Open File Manager</h4>
                      <p className="text-xxs text-slate-400 leading-normal mt-0.5">
                        Scroll to the **Files** block and launch the **File Manager**. Access files for your corresponding website.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Open public_html Folder</h4>
                      <p className="text-xxs text-slate-400 leading-normal mt-0.5">
                        Double-click the **\`public_html\`** folder. Delete any default file generated by Hostinger (like \`default.php\` or \`index.php\`).
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Upload and Extract ZIP</h4>
                      <p className="text-xxs text-slate-400 leading-normal mt-0.5">
                        Click the **Upload File** button, choose the \`Trial-Website.zip\` archive, right-click on it inside the Hostinger browser panel, and select **Extract**. Place all extracted files directly inside \`public_html\`.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Success Validation Check */}
                <div className="mt-5 p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Ready to Test
                  </span>
                  <p className="text-xxs text-slate-400 leading-relaxed">
                    Once uploaded, open a browser window and type in your domain (e.g. \`https://mycompany.com\`). You will see your newly generated modern static website immediately load at lightning speed!
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* If explorer view is active, render code editor at the bottom or let explorer use a full height editor split */}
        </section>

        {/* RIGHT PREVIEW & EDITOR PANEL CONTAINER - FLEX ROW/COL */}
        <section className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
          
          {/* Top simulated control header */}
          <div className="h-14 border-b border-slate-800/80 bg-slate-950 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Live Browser Simulator</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                {previewPage}
              </span>
            </div>

            {/* Simulated navigation and size controls */}
            <div className="flex items-center gap-4">
              {/* Device Size Selectors */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setDeviceSize('desktop')}
                  className={`p-1.5 rounded-md transition-all ${
                    deviceSize === 'desktop' 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Simulate Large Desktop Layout"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setDeviceSize('mobile')}
                  className={`p-1.5 rounded-md transition-all ${
                    deviceSize === 'mobile' 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Simulate Mobile Touch Layout"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* simulated browser pages bar */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setPreviewPage('index.html')}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    previewPage === 'index.html' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setPreviewPage('about.html')}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    previewPage === 'about.html' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  About
                </button>
                <button 
                  onClick={() => setPreviewPage('contact.html')}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    previewPage === 'contact.html' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Split workspace area: Sandbox Frame + Source Code Inspector */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4">
            
            {/* SIMULATOR WINDOW (Takes most space) */}
            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
              {/* Window Title Bar Mock */}
              <div className="h-10 bg-slate-950 border-b border-slate-900 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block"></span>
                </div>
                {/* Browser address bar */}
                <div className="w-1/2 bg-slate-900 rounded-lg px-3 py-1 flex items-center justify-between text-xxs text-slate-400 font-mono border border-slate-800">
                  <span className="truncate">https://mycompany.com/{previewPage}</span>
                  <RefreshCw className="w-2.5 h-2.5 text-slate-500 hover:text-slate-300 cursor-pointer" />
                </div>
                <div className="w-12"></div>
              </div>

              {/* SIMULATION CONTAINER FRAME */}
              <div className="flex-1 bg-white relative flex items-center justify-center p-4 overflow-y-auto">
                <div className={`h-full bg-white transition-all duration-300 relative rounded-xl border border-slate-200 shadow-md ${
                  deviceSize === 'mobile' 
                    ? 'w-[375px] max-w-full h-[650px]' 
                    : 'w-full h-full'
                }`}>
                  <iframe 
                    ref={iframeRef}
                    title="Live website preview container"
                    className="w-full h-full rounded-xl border-none"
                    sandbox="allow-scripts allow-same-origin allow-modals"
                  />
                </div>
              </div>
            </div>

            {/* CODE INSPECTOR CODEBOX PANEL */}
            <div className="w-full md:w-[480px] bg-slate-950 rounded-2xl border border-slate-800 flex flex-col overflow-hidden shrink-0 shadow-xl">
              
              {/* Active selected file title header */}
              <div className="h-11 border-b border-slate-900 px-4 flex items-center justify-between bg-slate-950 shrink-0">
                <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  {selectedFile}
                </span>
                
                {/* Actions: Copy Code */}
                <button 
                  onClick={() => handleCopyCode(selectedFile, generatedFiles[selectedFile as keyof typeof generatedFiles])}
                  className="px-2.5 py-1 rounded bg-slate-900 text-xxs font-semibold border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 hover:bg-slate-850 active:scale-95 transition-all"
                >
                  {copiedFile === selectedFile ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>

              {/* REAL-TIME SOURCE CODE BLOCK */}
              <div className="flex-1 flex flex-col min-h-0">
                <textarea
                  value={generatedFiles[selectedFile as keyof typeof generatedFiles]}
                  onChange={(e) => handleCodeChange(selectedFile, e.target.value)}
                  className="w-full h-full bg-slate-950 p-4 font-mono text-xxs leading-relaxed text-indigo-200 border-none resize-none focus:outline-none focus:ring-0 overflow-y-auto"
                  spellCheck="false"
                  placeholder="Click File Explorer or Customizer to populate files."
                />
              </div>

              {/* Bottom stats overview panel */}
              <div className="h-10 border-t border-slate-900 px-4 flex items-center justify-between bg-slate-900/60 shrink-0 text-xxs text-slate-500 font-mono">
                <span>UTF-8 &bull; Hostinger Match</span>
                <span>{generatedFiles[selectedFile as keyof typeof generatedFiles]?.length || 0} characters</span>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Modern Compact Status Footer */}
      <footer className="h-10 border-t border-slate-800 bg-slate-950 px-6 flex items-center justify-between shrink-0 text-xxs text-slate-500 font-sans">
        <p className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-500 animate-pulse" />
          Optimized static website engine &bull; Direct deployment compatible
        </p>
        <p>&copy; {new Date().getFullYear()} Hostinger Static Site Builder. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
