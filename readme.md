GemBox.Pdf Issue
================

To test:
- Install node `22.14.0`
- Run `npm install`
- Run the npm script `run` from the `package.json` or in terminal `node start.js`

This fails for us with an error:
```
TypeName: 'GemBox.Pdf.PdfDocument',
  Message: "The type initializer for 'GemBox.Pdf.PdfDocument' threw an exception.",
  Data: {},
  InnerException: Error: Could not load file or assembly 'System.Memory, Version=4.0.1.2, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51' or one of its dependencies. Invalid pointer (Exception from HRESULT: 0x80004003 (E_POINTER))
```

If we then download `GemBox.Pdf_17.0.1648.zip` () and copy everything from `net462` into this project's root and rerun the script, it will work and a `joined.pdf` file will be added to the project.