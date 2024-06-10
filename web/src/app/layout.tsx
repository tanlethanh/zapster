import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FC, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Zapster',
};

type Props = {
	children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
