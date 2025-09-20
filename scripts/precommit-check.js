#!/usr/bin/env node
"use strict";

const { execSync } = require("child_process");

function sh(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (e) {
    return "";
  }
}

// 1) Só arquivos staged adicionados/copiados/modificados
const files = (sh("git diff --cached --name-only --diff-filter=ACM") || "")
  .split("\n")
  .filter(Boolean);

if (!files.length) {
  console.log("ℹ️  Nenhum arquivo staged para verificar.");
  process.exit(0);
}

// 2) Regras
const CODE_EXT = /\.(js|jsx|ts|tsx|php)$/i;
const ENV_FILE = /^\.?env(\..+)?$/i;
const CONFIG_EXT = /\.(json|yml|yaml|config\.js|config\.ts)$/i;

// Segredos comuns (exemplos práticos; ajuste à sua realidade)
const secretPatterns = [
  /-----BEGIN (RSA|DSA|EC|OPENSSH) PRIVATE KEY-----/,
  /(api|access|private|secret|client)[-_ ]?key\s*[:=]\s*[a-z0-9_\-'"\\/]{8,}/i,
  /aws(.{0,10})?(secret|access)[-_ ]?key/i,
  /(bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+)/i, // JWT
  /(sk_(live|test)_[A-Za-z0-9]{10,})/,                         // Stripe
  /xox[abpr]-[A-Za-z0-9-]{10,}/,                               // Slack
];

// Bloqueio de console.* (inclui log/debug/info/warn/error/trace)
const consolePattern = /(^|[^A-Za-z0-9_])console\.(log|debug|info|warn|error|trace)\s*\(/;

// Padrões de código problemático
const problematicPatterns = [
  /(^|[^A-Za-z0-9_])debugger\s*;/, // debugger statements
  /(^|[^A-Za-z0-9_])alert\s*\(/, // alert statements
  /(^|[^A-Za-z0-9_])var\s+/, // var declarations (use const/let)
  /TODO|FIXME|HACK|XXX/i, // TODO comments (deve ser resolvido antes do commit)
];

// Padrões de PHP problemático
const phpProblematicPatterns = [
  /var_dump\s*\(/, // var_dump
  /print_r\s*\(/, // print_r
  /die\s*\(/, // die statements
  /exit\s*\(/, // exit statements
];

let violations = [];

function stagedContent(path) {
  try {
    return execSync(`git show :${path}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return null;
  }
}

files.forEach((file) => {
  // 3) Bloqueia qualquer arquivo .env
  if (ENV_FILE.test(file)) {
    violations.push({
      file,
      line: 0,
      type: "secret",
      snippet: "Arquivo .env não pode ser commitado.",
    });
    return;
  }

  // Ignora o próprio arquivo de validação
  if (file === 'scripts/precommit-check.js') {
    return;
  }

  const content = stagedContent(file);
  if (content == null) return;

  const isCode = CODE_EXT.test(file);
  const isJS = /\.(js|jsx|ts|tsx)$/i.test(file);
  const isPHP = /\.php$/i.test(file);
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    // 4) console.* só em arquivos de código JavaScript/TypeScript
    if (isJS && consolePattern.test(line)) {
      violations.push({
        file,
        line: idx + 1,
        type: "console",
        snippet: line.trim().slice(0, 200),
      });
    }

    // 5) Padrões problemáticos em JavaScript/TypeScript
    if (isJS) {
      for (const p of problematicPatterns) {
        if (p.test(line)) {
          violations.push({
            file,
            line: idx + 1,
            type: "problematic",
            snippet: line.trim().slice(0, 200),
          });
          break;
        }
      }
    }

    // 6) Padrões problemáticos em PHP
    if (isPHP) {
      for (const p of phpProblematicPatterns) {
        if (p.test(line)) {
          violations.push({
            file,
            line: idx + 1,
            type: "php-problematic",
            snippet: line.trim().slice(0, 200),
          });
          break;
        }
      }
    }

    // 7) segredos em qualquer texto
    for (const p of secretPatterns) {
      if (p.test(line)) {
        violations.push({
          file,
          line: idx + 1,
          type: "secret",
          snippet: line.trim().slice(0, 200),
        });
        break;
      }
    }
  });
});

if (violations.length) {
  console.error("🚫 Commit bloqueado pelas verificações de pre-commit:\n");
  for (const v of violations) {
    console.error(`• [${v.type.toUpperCase()}] ${v.file}${v.line ? ":" + v.line : ""} → ${v.snippet}`);
  }
  console.error("\nDicas:");
  console.error("  • Remova logs de produção (use logger ou condicionais por ambiente).");
  console.error("  • Nunca commite segredos: use variáveis de ambiente e .gitignore.");
  console.error("  • Remova debugger, alert, var, TODO, FIXME, HACK, XXX do código.");
  console.error("  • Em PHP: remova var_dump, print_r, die, exit.");
  console.error("  • Se for realmente necessário, crie exceções explícitas no script (com cuidado).");
  process.exit(1);
}

console.log("✅ Pre-commit OK: código validado com sucesso!");
process.exit(0);
