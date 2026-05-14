import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const postingChannels = {
  geeknews: {
    label: "GeekNews Show GN",
    file: "docs/marketing/posts/geeknews-show-gn.md",
    fields: [
      ["TITLE", "제목"],
      ["BODY", "본문"],
      ["FIRST COMMENT", "첫 댓글"],
      ["AFTER POSTING LOG", "게시 후 기록"],
    ],
  },
  okky: {
    label: "OKKY Feedback",
    file: "docs/marketing/posts/okky-feedback.md",
    fields: [
      ["TITLE", "제목"],
      ["BODY", "본문"],
      ["AFTER POSTING LOG", "게시 후 기록"],
    ],
  },
  "hacker-news": {
    label: "Hacker News Show HN",
    file: "docs/marketing/posts/hacker-news-show-hn.md",
    fields: [
      ["TITLE", "Title"],
      ["TEXT OR FIRST COMMENT", "Text Or First Comment"],
      ["AFTER POSTING LOG", "After Posting Log"],
    ],
  },
  "product-hunt": {
    label: "Product Hunt",
    file: "docs/marketing/posts/product-hunt-launch.md",
    fields: [
      ["PRODUCT NAME", "Product Name"],
      ["URL", "URL"],
      ["TAGLINE", "Tagline"],
      ["DESCRIPTION", "Description"],
      ["MAKER COMMENT", "Maker Comment"],
      ["AFTER POSTING LOG", "After Posting Log"],
    ],
  },
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractCodeBlock(markdown, heading) {
  const pattern = new RegExp(
    `^## ${escapeRegExp(heading)}\\s*\\r?\\n+\\\`\\\`\\\`(?:text)?\\r?\\n([\\s\\S]*?)\\r?\\n\\\`\\\`\\\``,
    "m",
  );
  const match = markdown.match(pattern);

  if (!match) {
    throw new Error(`Missing "${heading}" section code block.`);
  }

  return match[1].trim();
}

export function listPostingChannels() {
  return Object.entries(postingChannels).map(([id, config]) => ({
    id,
    label: config.label,
    file: config.file,
  }));
}

export function readPostingPacket(channelId, options = {}) {
  const config = postingChannels[channelId];

  if (!config) {
    const available = Object.keys(postingChannels).join(", ");
    throw new Error(`Unknown posting channel "${channelId}". Available channels: ${available}`);
  }

  const root = options.root ?? process.cwd();
  const markdown = readFileSync(join(root, config.file), "utf8");
  const fields = config.fields.map(([label, heading]) => ({
    label,
    heading,
    value: extractCodeBlock(markdown, heading),
  }));

  return {
    id: channelId,
    label: config.label,
    file: config.file,
    fields,
  };
}

export function renderPostingPacket(channelId, options = {}) {
  const packet = readPostingPacket(channelId, options);
  const parts = [
    `CHANNEL: ${packet.label}`,
    `SOURCE FILE: ${packet.file}`,
    "",
    ...packet.fields.flatMap((field) => [`${field.label}:`, field.value, ""]),
    "NEXT:",
    "1. Log in to the target channel.",
    "2. Paste the title/body fields exactly as shown.",
    "3. Record the published URL in docs/ops/lead-log.md.",
    "4. Re-run pnpm monitor:gmail:query after posting.",
  ];

  return parts.join("\n").trimEnd();
}

function parseArgs(argv) {
  const args = new Map();

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[index + 1];

      if (!next || next.startsWith("--")) {
        args.set(key, true);
      } else {
        args.set(key, next);
        index += 1;
      }
    }
  }

  return args;
}

function printUsage() {
  const channels = listPostingChannels().map((channel) => `${channel.id} (${channel.label})`).join(", ");

  console.log(`Usage:
  pnpm marketing:post --channel geeknews
  pnpm marketing:post --list

Channels:
  ${channels}`);
}

function runCli() {
  const args = parseArgs(process.argv.slice(2));

  if (args.has("list")) {
    console.log(JSON.stringify(listPostingChannels(), null, 2));
    return;
  }

  const channel = args.get("channel");

  if (!channel) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  console.log(renderPostingPacket(channel));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
