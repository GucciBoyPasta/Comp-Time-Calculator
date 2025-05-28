export const metadata = {
  title: 'Comp Time Calculator',
  description: 'DS-5106 style travel comp time tracker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
