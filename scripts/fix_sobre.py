import sys

with open('sobre.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('duration-500', 'duration-300')
content = content.replace('text-white', 'text-zinc-50')
content = content.replace('firecam-logo-web.png', 'firecam-logo-web.webp')

with open('sobre.html', 'w', encoding='utf-8') as f:
    f.write(content)
