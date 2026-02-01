import { Button } from "../ui/Button";

export function Hero() {
  const bgImageUrl = "https://ik.imagekit.io/k6kki72wv/background-fhd";

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-12 lg:pt-40">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${bgImageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Centralize e <br />
            <span className="text-white">Simplifique a Gestão</span> <br />
            do seu RH com o <br />
            <span className="inline-flex items-center">
              Colab<span className="text-primary-teal">+</span>
            </span>
          </h1>

          <p className="text-white text-base md:text-lg font-medium max-w-xl mb-10 leading-relaxed opacity-90">
            Sistema desenvolvido para organizar as informações dos
            colaboradores, estruturar cargos e controlar acessos em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="px-10 py-4 text-lg rounded-xl shadow-lg shadow-primary-teal/20">
              Começar Agora
            </Button>

            <Button
              variant="outline"
              className="px-10 py-4 text-lg rounded-xl border-white/20 text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
              Ver Demo
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="relative group">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="h-8 w-2/3 bg-white/10 rounded-lg mb-8 border border-white/5"></div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="h-24 md:h-32 bg-primary-teal/20 rounded-2xl border border-primary-teal/20 transition-transform group-hover:scale-[1.02]"></div>
                <div className="h-24 md:h-32 bg-primary-teal/20 rounded-2xl border border-primary-teal/20 transition-transform group-hover:scale-[1.02] delay-75"></div>
                <div className="h-24 md:h-32 bg-primary-teal/20 rounded-2xl border border-primary-teal/20 transition-transform group-hover:scale-[1.02] delay-150"></div>
              </div>

              <div className="space-y-4">
                <div className="h-32 md:h-48 w-full bg-white/5 rounded-2xl border border-white/5 flex flex-col p-4 gap-3">
                  <div className="h-3 w-1/2 bg-white/10 rounded-full"></div>
                  <div className="h-3 w-full bg-white/5 rounded-full"></div>
                  <div className="h-3 w-3/4 bg-white/5 rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-primary-teal w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <div className="w-6 h-6 border-4 border-white rounded-[2px] transform rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
