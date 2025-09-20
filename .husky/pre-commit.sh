# cria/atualiza o arquivo
mkdir -p .husky
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
npm run precommit
EOF

# permissão (no Git Bash/Linux/Mac)
chmod +x .husky/pre-commit
