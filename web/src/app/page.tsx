import { MotionH1, MotionP } from '@/components/motion';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center h-screen gap-4">
			<MotionH1
				className="text-5xl font-bold"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
			>
				Zapster
			</MotionH1>
			<MotionP
				className="text-xl font-light"
				initial={{ y: -30, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				Open source team workspace
			</MotionP>
			<MotionP
				className="text-base font-light"
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				Notion, Google Calendar, Discord, Github,...
			</MotionP>
		</main>
	);
}
