const initRichTextProps = {
  // selector:"Editor",
  menubar: false,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    // "image",
    "charmap",
    // "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    // "insertdatetime",
    // "media",
    "table",
    "help",
    "wordcount",
    // "textcolor",
  ],
  toolbar:
    "fullscreen | undo redo | bold italic|forecolor|" +
    "alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat",
  // browser_spellcheck: true,
  //   language: "en",
  // fixed_toolbar_container: "#mytoolbar",
  paste_data_images: false,
  draggable_modal: true,
  branding: false,
  help_accessibility: false,
};

export default initRichTextProps;
