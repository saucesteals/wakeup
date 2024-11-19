const routingKey = process.env.PAGERDUTY_ROUTING_KEY;
const severity = process.env.PAGERDUTY_SEVERITY ?? "critical";

export const enqueue = async (summary: string, source: string) => {
	const res = await fetch("https://events.pagerduty.com/v2/enqueue", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			payload: {
				summary,
				severity,
				source,
			},
			routing_key: routingKey,
			event_action: "trigger",
		}),
	});
	if (!res.ok) {
		throw new Error(`Bad response: ${res.statusText}`);
	}

	const data = await res.json();
	if (data.status !== "success") {
		throw new Error(`Failed to enqueue: ${data.message}`);
	}
};
