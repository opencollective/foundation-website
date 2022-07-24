import CMS from 'netlify-cms-app';
import NetlifyCmsMarkdownToastWidget from 'netlify-cms-widget-markdown-toast-ui';

// Initialize the CMS object
CMS.init();
// Now the registry is available via the CMS object.
CMS.registerWidget('markdown-toast-ui', NetlifyCmsMarkdownToastWidget);
window.CMS = CMS;
