
export default function TopFadeGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Top Fade Grid Pattern Background */}
      <div className="absolute inset-0 z-0">
        {/* Add your pattern styles here */}
      </div>

      {children}
    </div>
  );
}


