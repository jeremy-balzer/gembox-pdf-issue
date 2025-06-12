const edge = require('edge-js');
const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const output = path.normalize(__dirname + '/joined.pdf').split('\\').join('/');
const gemBoxPdfLicense = "FREE-LIMITED-KEY";
const template = `
// to join files
#r "${path.normalize(__dirname + '/GemBox.Pdf.dll').split('\\').join('/')}"
using System;
using System.Runtime;
using GemBox.Pdf;
using System.Threading.Tasks;

//this class need to be name Startup as it used by edge.js
public class Startup
{
    //this method need to be named Invoke it starts program
    public async Task<object> Invoke(string input)
    {
        string document = input;
        Gembox.Create(input);
        var response = new { State = "Success" };
        return response;
    }

    //helper class do the conversion
    public class Gembox
    {
        public static void Create(string doc)
        {
            //need more work to return stream
            ComponentInfo.SetLicense("${gemBoxPdfLicense}");            
            // List of source file names.
            var fileNames = new string[]
            {
                "${path.normalize(__dirname + '/pdf_1.pdf').split('\\').join('/')}",
                "${path.normalize(__dirname + '/pdf_2.pdf').split('\\').join('/')}"
            };
    
            using (var document = new PdfDocument())
            {
                // Merge multiple PDF files into single PDF by loading source documents
                // and cloning all their pages to destination document.
                foreach (var fileName in fileNames)
                    using (var source = PdfDocument.Load(fileName))
                        document.Pages.Kids.AddClone(source.Pages);
                document.Save(doc);
            }
        }
    }
}
`;

const joinFiles = ()=>{
    try {
        var joinPDFs = edge.func(template);
    } catch(err){
        ctx.log.error(err)
        return reject(err);
    }
    joinPDFs(output, (error, result) => {
        if (error) return console.error(error);
        console.log(`PDFs joined at ${output}`);
    })
}

joinFiles();