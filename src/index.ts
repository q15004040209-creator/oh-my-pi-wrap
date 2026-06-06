/**
 * oh-my-pi-wrap - TypeScript wrapper for oh-my-pi coding agent SDK
 *
 * @example
 * import { createAgentSession } from "./index";
 *
 * const { session } = await createAgentSession({ ... });
 * const response = await session.prompt("list .ts files");
 */

// Re-export the main SDK exports for convenient access
export {
  ModelRegistry,
  SessionManager,
  createAgentSession,
  discoverAuthStorage,
} from "@oh-my-pi/pi-coding-agent";

export type {
  AgentSession,
  AgentSessionOptions,
  ModelRegistryOptions,
  AuthStorage,
} from "@oh-my-pi/pi-coding-agent";
