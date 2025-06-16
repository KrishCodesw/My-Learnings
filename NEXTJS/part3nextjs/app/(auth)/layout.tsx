export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <div className="">Header</div> */}
      <body>{children}</body>
      {/* <div className="">Footer</div> */}
    </html>
  );
}
