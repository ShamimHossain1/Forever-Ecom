import chokidar from "chokidar";
import simpleGit from "simple-git";

const git = simpleGit();

const ignored = [
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/build/**",
  "**/*.log",
];

const debounceMs = 2000;
let timer = null;

const watcher = chokidar.watch(".", {
  ignored,
  ignoreInitial: true,
  persistent: true,
});

watcher.on("all", (event, path) => {
  console.log(`[watcher] ${event} ${path}`);
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      console.log("[auto-commit] Staging changes...");
      await git.add(".");
      const status = await git.status();
      if (
        status.staged.length === 0 &&
        status.modified.length === 0 &&
        status.not_added.length === 0
      ) {
        console.log("[auto-commit] No changes to commit.");
        return;
      }
      const msg = `Auto-commit: ${new Date().toISOString()}`;
      await git.commit(msg);
      console.log("[auto-commit] Committed:", msg);
    } catch (err) {
      console.error("[auto-commit] Error:", err);
    }
  }, debounceMs);
});

process.on("SIGINT", () => {
  console.log("\n[auto-commit] Stopping watcher...");
  watcher.close().then(() => process.exit(0));
});
