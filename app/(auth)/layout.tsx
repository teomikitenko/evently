export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full h-full bg-slate-100 justify-center items-center">
    <div>{children}</div></div>;
}
