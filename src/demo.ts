/**
 * oh-my-pi-wrap TypeScript Demo
 *
 * 演示如何使用 @oh-my-pi/pi-coding-agent SDK 创建 AI 编码 Agent 会话。
 * Run with: npm run demo
 */

import {
  ModelRegistry,
  SessionManager,
  createAgentSession,
  discoverAuthStorage,
} from "@oh-my-pi/pi-coding-agent";

async function demoBasicPrompt() {
  console.log("[Demo] 初始化认证存储...");
  const auth = await discoverAuthStorage();

  console.log("[Demo] 初始化模型注册表...");
  const models = new ModelRegistry(auth);
  await models.refresh();

  console.log("[Demo] 创建 Agent Session...");
  const { session, destroy } = await createAgentSession({
    sessionManager: SessionManager.inMemory(),
    authStorage: auth,
    modelRegistry: models,
  });

  // 订阅工具调用事件
  session.on("tool", (tool: { name: string; args: Record<string, unknown> }) => {
    console.log(`[Tool] ${tool.name}`, JSON.stringify(tool.args));
  });

  // 订阅流式输出
  session.on("stream", (text: string) => {
    process.stdout.write(text);
  });

  try {
    console.log("\n[Demo] 发送 prompt: 列出当前目录所有 .ts 文件\n");
    const response = await session.prompt("list .ts files in current directory");
    console.log("\n[Response]", response);
  } finally {
    await destroy();
  }
}

async function demoWithCustomModel() {
  console.log("\n[Demo] 使用自定义模型 provider...");
  const auth = await discoverAuthStorage();
  const models = new ModelRegistry(auth);
  await models.refresh();

  const { session, destroy } = await createAgentSession({
    sessionManager: SessionManager.inMemory(),
    authStorage: auth,
    modelRegistry: models,
    // 指定使用的模型（通过 ModelRegistry 选择）
  });

  session.on("tool", (tool: { name: string; args: Record<string, unknown> }) => {
    console.log(`[Tool] ${tool.name}`, JSON.stringify(tool.args));
  });

  try {
    // 切换模型（通过 session API）
    const response = await session.prompt(
      "explain what this codebase does in one sentence"
    );
    console.log("[Response]", response);
  } finally {
    await destroy();
  }
}

async function demoSubagentFanOut() {
  console.log("\n[Demo] 子Agent并行任务演示...");
  const auth = await discoverAuthStorage();
  const models = new ModelRegistry(auth);
  await models.refresh();

  const { session, destroy } = await createAgentSession({
    sessionManager: SessionManager.inMemory(),
    authStorage: auth,
    modelRegistry: models,
  });

  // task 工具支持 fan-out 并行执行子agent
  // 通过 irc (inter-agent communication) 协调
  const response = await session.prompt(
    "use the task tool to run three parallel subagents: " +
      "one to find all .ts files, one to find all .json files, " +
      "and one to count total lines of code in src/"
  );
  console.log("[Response]", response);

  await destroy();
}

async function main() {
  console.log("=".repeat(60));
  console.log("oh-my-pi-wrap TypeScript Demo");
  console.log("=".repeat(60));

  try {
    await demoBasicPrompt();
    // await demoWithCustomModel();
    // await demoSubagentFanOut();
  } catch (err) {
    console.error("[Error]", err);
    process.exit(1);
  }

  console.log("\n[Demo] 完成!");
}

main();
