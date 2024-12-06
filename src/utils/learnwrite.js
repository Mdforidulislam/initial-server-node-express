import fs from 'fs';
import path from 'path';

// Get the current file's directory from import.meta.url
const __direName = path.dirname(new URL(import.meta.url).pathname);

// Correct the path to handle Windows-style paths (remove 'file://' and leading slash if any)
const windowsPath = __direName.replace('file://', '').replace(/^\/([a-zA-Z]):/, '$1:').replace(/\//g, '\\');

// Define the path where the new folder will be created
const folderPath = path.join(windowsPath, 'server');

// Ensure the path is valid
console.log('Creating folder at:', folderPath);

// Create the folder (and its parent directories if they do not exist)
try {
    fs.mkdirSync(folderPath, { recursive: true });
    const filPath = path.join(folderPath,"server.js")
    if(!fs.existsSync(filPath)){
        fs.writeFileSync(filPath,"//server ocde ges here ", 'utf-8')
    }else{
      const content =   fs.readFileSync(filPath,"utf-8");
      console.log(content)
      const constnte = `const constnerexte4 = ()=>{
              console.log('hello programer ')
        }`

       fs.appendFileSync(filPath,constnte,'utf-8')
       
    }
    console.log('Folder created successfully!');
} catch (error) {
    console.error('Error creating folder:', error.message);
}

// Check if the folder exists
const folderReading = fs.existsSync(folderPath);
console.log('Does the folder exist?', folderReading);
