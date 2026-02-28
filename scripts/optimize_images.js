const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, '../assets/img');
const outputDir = path.resolve(__dirname, '../assets/img/optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
    const files = fs.readdirSync(imgDir);

    for (const file of files) {
        if (file.match(/\.(png|jpg|jpeg|webp)$/i)) {
            const inputPath = path.join(imgDir, file);
            const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

            console.log(`Optimizing: ${file}...`);

            try {
                await sharp(inputPath)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`✓ Saved to: ${path.relative(process.cwd(), outputPath)}`);
            } catch (err) {
                console.error(`✗ Error optimizing ${file}:`, err.message);
            }
        }
    }
}

optimizeImages().then(() => console.log('Optimization complete!'));
