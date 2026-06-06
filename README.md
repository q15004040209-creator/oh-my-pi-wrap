# oh-my-pi-wrap ⌥

> 终端 AI 编码 Agent 封装 — 基于 oh-my-pi 的 hash 编辑 + LSP + 浏览器 + 子Agent 工作流

[English](#english) | [中文](#中文)

---

## 中文

### 是什么

`oh-my-pi-wrap` 是对 [oh-my-pi](https://github.com/can1357/oh-my-pi)（原 [Pi](https://github.com/badlogic/pi-mono)）的 TypeScript 封装，提供 Node.js 环境下的 AI 编码 Agent SDK。

**核心能力：**
- **hash 锚定编辑** — 基于内容哈希的差异化编辑，首次成功率高，减少 token 消耗（Grok 4 Fast 节省 61% 输出 token）
- **32 个内置工具** — read / write / edit / search / lsp / debug / task / browser / web_search 等
- **LSP 代码智能** — 诊断、导航、符号搜索、重命名、代码操作
- **DAP 调试** — 断点、步进、线程、栈帧、变量检查
- **子 Agent 并行** — task fan-out 并行执行、typed results 返回
- **浏览器自动化** — Puppeteer 控制 headless Chromium
- **多模型路由** — 40+ provider、role 分工（default / smol / slow / plan）
- **内存持久化** — retain / recall / reflect，跨 session 记忆

### 技术栈

- **Runtime:** TypeScript + Node.js SDK (`@oh-my-pi/pi-coding-agent`)
- **原生内核:** Rust N-API addon（pi-natives: grep, shell, AST, highlight, PTY）
- **支持平台:** macOS · Linux · Windows（bun ≥ 1.3.14 / Node.js）

### 快速开始

```bash
# 安装
npm install @oh-my-pi/pi-coding-agent

# 或使用 bun（推荐）
bun install -g @oh-my-pi/pi-coding-agent

# 全局安装后获取 omp
curl -fsSL https://omp.sh/install | sh
```

### TypeScript Demo

```typescript
import {
  ModelRegistry,
  SessionManager,
  createAgentSession,
  discoverAuthStorage,
} from "@oh-my-pi/pi-coding-agent";

async function main() {
  // 发现本地认证存储（API key 等）
  const auth = await discoverAuthStorage();

  // 模型注册表
  const models = new ModelRegistry(auth);
  await models.refresh();

  // 创建 Agent Session
  const { session } = await createAgentSession({
    sessionManager: SessionManager.inMemory(),
    authStorage: auth,
    modelRegistry: models,
  });

  // 发送 prompt
  const response = await session.prompt("list .ts files");
  console.log(response);

  // 订阅事件（tool call / stream 等）
  session.on("tool", (tool) => {
    console.log("Tool called:", tool.name, tool.args);
  });
}

main().catch(console.error);
```

### 核心工具一览

| 类别 | 工具 |
|------|------|
| 文件 | `read` `write` `edit` `ast_edit` `ast_grep` `search` `find` |
| 运行时 | `bash` `eval` (Python + JS cells) `ssh` |
| 代码智能 | `lsp` `debug` (DAP) |
| 协调 | `task` `irc` `todo` `job` `ask` |
| 外部 | `browser` `web_search` `github` `generate_image` `inspect_image` |
| 记忆 | `checkpoint` `retain` `recall` `reflect` `rewind` |

### 架构

```
┌─────────────────────────────────────────────┐
│              Node.js SDK                     │
│  @oh-my-pi/pi-coding-agent                  │
├─────────────────────────────────────────────┤
│           Agent Core / TUI                  │
│  @oh-my-pi/pi-agent-core                    │
│  @oh-my-pi/pi-tui                           │
├─────────────────────────────────────────────┤
│           AI Client                         │
│  @oh-my-pi/pi-ai (40+ providers)           │
├─────────────────────────────────────────────┤
│         Rust N-API addon                    │
│  pi-shell · pi-grep · pi-ast · pi-natives  │
└─────────────────────────────────────────────┘
```

### 模型支持

**Direct API / Gateway：**
Anthropic · OpenAI · OpenAI Codex · Google Gemini · xAI · Mistral · Groq · Cerebras · Fireworks · Together · Hugging Face · NVIDIA · OpenRouter · etc.

**订阅制路由（oauth 登录）：**
Cursor · GitHub Copilot · GitLab Duo · Kimi Code · Moonshot · MiniMax · Qwen · etc.

**本地：**
Ollama · LM Studio · llama.cpp · vLLM · LiteLLM

### 相关链接

- 🌐 [omp.sh](https://omp.sh) — 官网 & 安装脚本
- 📦 [npm](https://www.npmjs.com/package/@oh-my-pi/pi-coding-agent)
- 💬 [Discord](https://discord.gg/4NMW9cdXZa)
- 📂 [GitHub](https://github.com/can1357/oh-my-pi)
- 📄 [Changelog](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/CHANGELOG.md)

---

## English

### What is it?

`oh-my-pi-wrap` is a TypeScript wrapper for [oh-my-pi](https://github.com/can1357/oh-my-pi), providing a Node.js SDK for AI-powered terminal coding agents.

**Core capabilities:**
- **Hash-anchored edits** — Content-hash-based diff patching, high first-attempt success rate, 61% fewer output tokens (Grok 4 Fast)
- **32 built-in tools** — read / write / edit / search / lsp / debug / task / browser / web_search etc.
- **LSP code intelligence** — diagnostics, navigation, symbols, renames, code actions
- **DAP debugging** — breakpoints, stepping, threads, stack, variables
- **Subagent fan-out** — parallel task execution with typed results
- **Browser automation** — Puppeteer over headless Chromium
- **Multi-model routing** — 40+ providers, role-based dispatch (default / smol / slow / plan)
- **Persistent memory** — retain / recall / reflect across sessions

### Tech Stack

- **Runtime:** TypeScript + Node.js SDK (`@oh-my-pi/pi-coding-agent`)
- **Native core:** Rust N-API addon (pi-natives: grep, shell, AST, highlight, PTY)
- **Platforms:** macOS · Linux · Windows (bun ≥ 1.3.14 / Node.js)

### Quick Start

```bash
# Install
npm install @oh-my-pi/pi-coding-agent

# Or with bun (recommended)
bun install -g @oh-my-pi/pi-coding-agent

# Global install then get omp
curl -fsSL https://omp.sh/install | sh
```

### TypeScript Demo

```typescript
import {
  ModelRegistry,
  SessionManager,
  createAgentSession,
  discoverAuthStorage,
} from "@oh-my-pi/pi-coding-agent";

async function main() {
  const auth = await discoverAuthStorage();
  const models = new ModelRegistry(auth);
  await models.refresh();

  const { session } = await createAgentSession({
    sessionManager: SessionManager.inMemory(),
    authStorage: auth,
    modelRegistry: models,
  });

  const response = await session.prompt("list .ts files");
  console.log(response);

  session.on("tool", (tool) => {
    console.log("Tool called:", tool.name, tool.args);
  });
}

main().catch(console.error);
```

### Key Tools

| Category | Tools |
|----------|-------|
| Files | `read` `write` `edit` `ast_edit` `ast_grep` `search` `find` |
| Runtime | `bash` `eval` (Python + JS cells) `ssh` |
| Code Intel | `lsp` `debug` (DAP) |
| Coordination | `task` `irc` `todo` `job` `ask` |
| External | `browser` `web_search` `github` `generate_image` `inspect_image` |
| Memory | `checkpoint` `retain` `recall` `reflect` `rewind` |

### Architecture

```
┌─────────────────────────────────────────────┐
│              Node.js SDK                     │
│  @oh-my-pi/pi-coding-agent                  │
├─────────────────────────────────────────────┤
│           Agent Core / TUI                  │
│  @oh-my-pi/pi-agent-core                    │
│  @oh-my-pi/pi-tui                           │
├─────────────────────────────────────────────┤
│           AI Client                         │
│  @oh-my-pi/pi-ai (40+ providers)            │
├─────────────────────────────────────────────┤
│         Rust N-API addon                    │
│  pi-shell · pi-grep · pi-ast · pi-natives  │
└─────────────────────────────────────────────┘
```

### Provider Support

**Direct APIs:** Anthropic · OpenAI · OpenAI Codex · Google Gemini · xAI · Mistral · Groq · Cerebras · Fireworks · Together · Hugging Face · NVIDIA · OpenRouter · etc.

**Subscription-based:** Cursor · GitHub Copilot · GitLab Duo · Kimi Code · Moonshot · MiniMax · Qwen · etc.

**Local:** Ollama · LM Studio · llama.cpp · vLLM · LiteLLM

### Links

- 🌐 [omp.sh](https://omp.sh)
- 📦 [npm](https://www.npmjs.com/package/@oh-my-pi/pi-coding-agent)
- 💬 [Discord](https://discord.gg/4NMW9cdXZa)
- 📂 [GitHub](https://github.com/can1357/oh-my-pi)

---

## License

MIT © 2025-2026 Can Bölük · Forked from [Mario Zechner](https://github.com/badlogic/pi-mono)
