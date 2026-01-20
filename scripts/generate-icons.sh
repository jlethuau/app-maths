#!/bin/bash

# Script pour générer les icônes PWA à partir du SVG
# Nécessite ImageMagick: sudo apt install imagemagick

cd "$(dirname "$0")/.."

echo "🎨 Génération des icônes PWA..."

# Vérifier si ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick n'est pas installé."
    echo "📦 Installation: sudo apt install imagemagick"
    echo ""
    echo "💡 Alternative: Utilisez un générateur en ligne:"
    echo "   https://realfavicongenerator.net/"
    echo "   ou"
    echo "   https://www.pwabuilder.com/imageGenerator"
    exit 1
fi

# Générer les icônes
convert public/icon.svg -resize 192x192 public/icon-192.png
convert public/icon.svg -resize 512x512 public/icon-512.png

echo "✅ Icônes générées:"
echo "   - public/icon-192.png (192x192)"
echo "   - public/icon-512.png (512x512)"
