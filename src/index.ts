import { Client } from "discord.js-selfbot-v13";
import { enqueue } from "./pagerduty";

const wakeMessage = process.env.WAKE_MESSAGE?.toLowerCase() ?? "wake up";
const client = new Client();

client.on("messageCreate", async (message) => {
	if (!client.user || message.author.id === client.user.id) return;
	if (message.channel.type !== "DM") return;
	if (!message.content.toLowerCase().includes(wakeMessage)) return;

	try {
		await message.reply("Are you sure this is important? (yes/no)");
		const response = await message.channel.awaitMessages({
			filter: (m) => {
				return (
					m.author.id === message.author.id &&
					["yes", "no"].includes(m.content.toLowerCase())
				);
			},
			max: 1,
			time: 30000,
		});

		const first = response.first();
		if (!first) {
			await message.reply("No response received");
			return;
		}

		if (first.content.toLowerCase() !== "yes") {
			await message.reply("Cancelled");
			return;
		}

		await message.reply("Waking me up...");
		await enqueue(
			`${message.author.username} is waking you up!`,
			message.content,
		);
		await message.reply("Alert sent!");
	} catch (error) {
		await message.reply("Something went wrong while sending the alert");
		console.error(error);
	}
});

client.on("ready", async (client) => {
	console.log(`${client.user.username} is ready to wake you up!`);
});

client.on("error", (error) => {
	console.error(error);
});

client.login(process.env.DISCORD_TOKEN);
