const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.resolve('c:/Users/innat/OneDrive/Documents/Firecam/assets/img');
const files = fs.readdirSync(imgDir);

console.log('File Name | Width x Height | Size (KB)');
console.log('---|---|---');

files.forEach(file => {
    if (file.match(/\.(png|jpg|jpeg|webp)$/i)) {
        const filePath = path.join(imgDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);

        // Use powershell to get image dimensions if possible, or just log name/size for now
        // A more reliable way without heavy libs is harder in pure node, 
        // but we can try to use a shell command to get dimensions.
        try {
            // PowerShell command to get image dimensions
            const cmd = `powershell -Command "[Reflection.Assembly]::LoadWithPartialName('System.Drawing'); $img = [System.Drawing.Image]::FromFile('${filePath.replace(/'/g, "''")}'); write-host \\"$($img.Width)x$($img.Height)\\""`;
            const dimensions = execSync(cmd).toString().trim();
            console.log(`${file} | ${dimensions} | ${sizeKB}`);
        } catch (e) {
            console.log(`${file} | Error | ${sizeKB}`);
        }
    }
});
