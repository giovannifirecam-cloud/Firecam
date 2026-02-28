import os
from PIL import Image

img_dir = r'c:\Users\innat\OneDrive\Documents\Firecam\assets\img'
for root, dirs, files in os.walk(img_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            path = os.path.join(root, file)
            try:
                with Image.open(path) as img:
                    width, height = img.size
                    size_kb = os.path.getsize(path) / 1024
                    print(f"{file}: {width}x{height}, {size_kb:.2f} KB")
            except Exception as e:
                print(f"Error reading {file}: {e}")
