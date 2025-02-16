#!/bin/bash

# Configurações
OBSIDIAN_PLUGINS_DIR="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/.obsidian/plugins"
PLUGIN_NAME="obsidian-easy-quiz"

# Executa o build
echo "🛠  Building plugin..."
npm run build

# Verifica se o build foi bem sucedido
if [ $? -eq 0 ]; then
  echo "✅ Build bem sucedido!"
  
  # Cria diretório se não existir
  mkdir -p "$OBSIDIAN_PLUGINS_DIR/$PLUGIN_NAME"
  
  # Copia arquivos
  cp -v dist/main.js manifest.json styles.css "$OBSIDIAN_PLUGINS_DIR/$PLUGIN_NAME/"
  
  echo "✨ Plugin copiado para: $OBSIDIAN_PLUGINS_DIR/$PLUGIN_NAME"
else
  echo "❌ Erro no build! Verifique os logs."
  exit 1
fi