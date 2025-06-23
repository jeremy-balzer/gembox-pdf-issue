const edge = require('edge-js');
const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const output = path.normalize(__dirname + '/gembox-doc-test.docx').split('\\').join('/');
const gemBoxDocumentLicense = "FREE-LIMITED-KEY";
const template = `
// to convert a document to pdf
#r "${path.normalize(__dirname + '/GemBox.Document.dll').split('\\').join('/')}"
#r "${path.normalize(__dirname + '/SkiaSharp.dll').split('\\').join('/')}"
using System;
using SkiaSharp;
using GemBox.Document;// library for to use
using System.Threading.Tasks;

//this class need to be name Startup as it used by edge.js
public class Startup
{
    //this method need to be named Invoke it starts program
    public async Task<object> Invoke(string input)
    {
        foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
        {
            var name = asm.GetName().Name;
            if (name == "SkiaSharp" || name == "GemBox.Document")
            {
                Console.WriteLine(asm.FullName);
                Console.WriteLine(asm.Location);
                Console.WriteLine(System.Diagnostics.FileVersionInfo.GetVersionInfo(asm.Location));
                
                
            }
        }
        Console.WriteLine(input);
        string document = input;
        Gembox.Create(input);
        return "Converted";
    }

    //helper class do the conversion
    public class Gembox
    {
        public static void Create(string doc)
        {
            //need more work to return stream
            ComponentInfo.SetLicense("${gemBoxDocumentLicense}");
            FontSettings.FontsBaseDirectory = "/fonts/";
            DocumentModel document = DocumentModel.Load(doc);
            Console.WriteLine(document);
            document.Save(doc.Replace(".docx", ".pdf"));
        }
    }
}
`;

const convert = ()=>{
    try {
        var convertDoc = edge.func(template);
    } catch(err){
        console.error(err);
    }
    convertDoc(output, (error, result) => {
        if (error) return console.error(error);
        console.log(`Document created at ${output}`);
    })
}

convert();