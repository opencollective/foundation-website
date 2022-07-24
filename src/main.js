import CMS from 'netlify-cms-app';
import NetlifyCmsMarkdownToastWidget from 'netlify-cms-widget-markdown-toast-ui';

// Initialize the CMS object
CMS.init();
// Now the registry is available via the CMS object.

// Register an alternate markdown widget. This has table editing support.

// The built-in markdown widget breaks tables when editing them.
// I (@jboolean) created and published this markdown widget by wrapping the library ToastUI.

CMS.registerWidget('markdown-toast-ui', NetlifyCmsMarkdownToastWidget);
window.CMS = CMS;
