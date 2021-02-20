CMS.registerEditorComponent({
  // Internal id of the component
  id: 'ejs',
  // Visible label
  label: 'Ejs',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'code',
      label: 'Code',
      widget: 'code',
      output_code_only: true,
      default_language: 'javascript',
      allow_language_selection: false,
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<%.+%>/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      code: match[0],
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return obj.code;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return `<pre>EJS cannot be previewed, but will compile when published</pre>`;
  },
});
