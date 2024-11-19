# Wake Up

A Discord bot that creates PagerDuty incidents from direct messages.

> [!WARNING]
> Self-botting is against Discord's Terms of Service and can result in account termination.

## Features

- Listens for a specific wake phrase in Discord DMs
- Confirms with the sender before creating an incident
- Creates PagerDuty incidents with configurable severity

## Prerequisites

- [Bun](https://bun.sh) runtime
- [Discord](https://discord.com) token
- [PagerDuty](https://www.pagerduty.com) routing key

## Usage

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env` file with the following variables:

   ```env
   DISCORD_TOKEN=your_discord_token
   PAGERDUTY_ROUTING_KEY=your_pagerduty_routing_key
   ```

   Optional:

   ```env
   WAKE_MESSAGE=wake up
   PAGERDUTY_SEVERITY=critical
   ```

4. Start the bot:

   ```bash
   bun run src/index.ts
   ```
