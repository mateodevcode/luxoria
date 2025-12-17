export function Loader() {
  return (
    <div className="flex flex-col items-center gap-4 h-[50svh] justify-center">
      {/* Spinner animado */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-cuarto rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-segundo border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Texto de cargando con animación de puntos */}
      <div className="flex items-center gap-1 text-sm text-segundo">
        <span>Pensando</span>
        <span className="flex gap-0.5">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>
            .
          </span>
        </span>
      </div>
    </div>
  );
}
