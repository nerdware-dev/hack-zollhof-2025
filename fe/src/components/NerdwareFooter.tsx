export default function NerdwareFooter() {
  return (
    <div
      style={{ position: "fixed", bottom: "8px", pointerEvents: "none" }}
      className="w-full flex justify-center items-center gap-2"
    >
      <img src="/imgs/lavender.png" alt="logo" className="h-4" />
      <div className="text-sm font-bold text-gray-600">Nerdware</div>
    </div>
  );
}
