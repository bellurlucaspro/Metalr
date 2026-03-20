export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/images/MetalR_bonlogo.webp"
      alt="METALR - Constructeur de structures métalliques"
      width={180}
      height={40}
      className={`${className} w-auto object-contain`}
    />
  );
}
