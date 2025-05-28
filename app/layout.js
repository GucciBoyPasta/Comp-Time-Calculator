
import '../styles/globals.css';

export const metadata = {
  title: 'Comp Time Calculator',
  description: 'Travel comp time calculator for official use',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-gray-900 font-sans">{children}</body>
    </html>
  );
}
