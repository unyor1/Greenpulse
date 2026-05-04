import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const PLANTBOT_URL = `${import.meta.env.BASE_URL}plantbot/index.html`;

export function PlantbotWidget() {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{open ? (
				<div className="relative h-[70vh] max-h-[720px] w-[92vw] max-w-[420px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
					<button
						type="button"
						onClick={() => setOpen(false)}
						aria-label="Close Plantbot"
						className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-gray-700 shadow hover:bg-white"
					>
						<X className="h-4 w-4" />
					</button>
					<iframe
						title="Plantbot"
						src={PLANTBOT_URL}
						className="h-full w-full border-0"
						loading="lazy"
						allow="clipboard-read; clipboard-write"
					/>
				</div>
			) : (
				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Open Plantbot"
					className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
				>
					<MessageCircle className="h-5 w-5" />
				</button>
			)}
		</div>
	);
}
