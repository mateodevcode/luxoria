"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("");
  const observerRefs = useRef([]);
  const sectionRefs = useRef({});
  const router = useRouter();

  const sections = [
    { id: "intro", label: "Sobre Luxoria Joyería" },
    { id: "section-1", label: "Recopilación de Información" },
    { id: "section-2", label: "Uso de la Información" },
    { id: "section-3", label: "Uso de Cookies" },
    { id: "section-4", label: "Enlaces a Terceros" },
    { id: "section-5", label: "Control de Información Personal" },
    { id: "section-6", label: "Almacenamiento y Seguridad" },
    { id: "section-7", label: "Derechos del Titular" },
    { id: "section-8", label: "Cambios en esta Política" },
    { id: "section-9", label: "Aceptación" },
  ];

  useEffect(() => {
    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current[section.id] = element;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          {
            rootMargin: "-10% 0px -80% 0px",
          }
        );

        observer.observe(element);
        observerRefs.current.push(observer);
      }
    });

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primero text-segundo md:pb-60 pb-10 pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Header */}
        <div className="col-span-full border-b border-segundo/10 py-12">
          <h1 className="text-4xl font-bold text-center text-segundo">
            Política de Privacidad
          </h1>
        </div>

        {/* Last updated */}
        <div className="col-span-full border-b border-segundo/10 py-6">
          <p className="text-center text-segundo/70">
            Última actualización: 15 de diciembre, 2025
          </p>
        </div>

        {/* Main content */}
        <div className="col-span-3 py-8 px-4 text-segundo/70">
          <div className="prose max-w-none">
            <div id="intro">
              <p>
                En <strong>Luxoria Joyería</strong> valoramos y protegemos la
                privacidad de nuestros clientes. Esta Política de Privacidad
                explica cómo recopilamos, usamos y protegemos la información
                personal que usted nos proporciona a través de nuestro sitio
                web, redes sociales, WhatsApp y otros canales de contacto.
              </p>
              <p>
                Luxoria Joyería cumple con la Ley 1581 de 2012 y las normas
                vigentes sobre protección de datos personales en Colombia.
              </p>
            </div>

            <div id="section-1">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                1. Recopilación de Información
              </h2>
              <p>
                Recopilamos información personal cuando usted realiza una
                compra, solicita información, se comunica con nosotros o
                participa en promociones, incluyendo:
              </p>
              <ul className="list-disc pl-6">
                <li>Nombre completo</li>
                <li>Número de teléfono o WhatsApp</li>
                <li>Correo electrónico</li>
                <li>Dirección de envío</li>
                <li>Información relacionada con pedidos y compras</li>
              </ul>
              <p>
                También recopilamos información técnica básica como dirección
                IP, tipo de dispositivo y comportamiento de navegación para
                mejorar la experiencia del usuario.
              </p>
            </div>

            <div id="section-2">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                2. Uso de la Información
              </h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul className="list-disc pl-6">
                <li>Procesar y gestionar pedidos de joyas.</li>
                <li>Coordinar envíos y entregas.</li>
                <li>Brindar atención al cliente y soporte.</li>
                <li>
                  Enviar promociones, novedades y ofertas (previa autorización).
                </li>
                <li>Mejorar nuestros productos y servicios.</li>
              </ul>
              <p>
                <strong>Luxoria Joyería</strong> no vende ni comparte su
                información personal con terceros sin su consentimiento, excepto
                cuando sea necesario para la entrega del producto o por
                obligación legal.
              </p>
            </div>

            <div id="section-3">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                3. Uso de Cookies
              </h2>
              <p>
                Nuestro sitio web puede utilizar cookies para mejorar la
                navegación y personalizar la experiencia del usuario. Estas
                permiten:
              </p>
              <ul className="list-disc pl-6">
                <li>Recordar preferencias del usuario.</li>
                <li>Analizar tráfico y comportamiento.</li>
                <li>Optimizar el rendimiento del sitio web.</li>
              </ul>
              <p>
                Usted puede desactivar las cookies desde su navegador; sin
                embargo, algunas funciones del sitio podrían verse afectadas.
              </p>
            </div>

            <div id="section-4">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                4. Enlaces a Terceros
              </h2>
              <p>
                Nuestro sitio puede contener enlaces a redes sociales,
                plataformas de pago o servicios externos.{" "}
                <strong>Luxoria Joyería</strong> no se hace responsable del
                manejo de la información personal por parte de dichos sitios.
                Recomendamos revisar sus políticas de privacidad.
              </p>
            </div>

            <div id="section-5">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                5. Control de Información Personal
              </h2>
              <p>Usted puede:</p>
              <ul className="list-disc pl-6">
                <li>Solicitar la actualización o corrección de sus datos.</li>
                <li>Solicitar la eliminación de su información personal.</li>
                <li>
                  Retirar su consentimiento para comunicaciones comerciales.
                </li>
              </ul>
              <p>
                Para ejercer estos derechos puede contactarnos en:
                <strong> contacto@luxoriajoyeria.com</strong>
              </p>
            </div>

            <div id="section-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                6. Almacenamiento y Seguridad
              </h2>
              <p>
                La información personal es almacenada de forma segura y solo es
                accesible por personal autorizado. Implementamos medidas
                técnicas y administrativas para proteger sus datos contra
                accesos no autorizados, pérdida o uso indebido.
              </p>
            </div>

            <div id="section-7">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                7. Derechos del Titular
              </h2>
              <p>Como titular de los datos, usted tiene derecho a:</p>
              <ul className="list-disc pl-6">
                <li>Acceder a sus datos personales.</li>
                <li>Solicitar su corrección o eliminación.</li>
                <li>Revocar la autorización otorgada.</li>
              </ul>
              <p>
                Puede ejercer estos derechos escribiendo a:
                <strong> contacto@luxoriajoyeria.com</strong>
              </p>
            </div>

            <div id="section-8">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                8. Cambios en esta Política
              </h2>
              <p>
                Luxoria Joyería se reserva el derecho de modificar esta Política
                de Privacidad en cualquier momento. Los cambios serán publicados
                en esta página con su respectiva fecha de actualización.
              </p>
            </div>

            <div id="section-9">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-segundo">
                9. Aceptación
              </h2>
              <p>
                Al utilizar nuestro sitio web o realizar una compra en
                <strong> Luxoria Joyería</strong>, usted acepta los términos de
                esta Política de Privacidad. Si no está de acuerdo, le
                recomendamos no proporcionar información personal.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 py-8 px-4 text-segundo">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4">En esta página</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`${
                    activeSection === section.id
                      ? "text-cuarto font-medium border-l-2 border-cuarto pl-3 -ml-px"
                      : "text-segundo/70 hover:text-segundo pl-3"
                  } transition-colors duration-200`}
                >
                  <button
                    onClick={() => {
                      scrollToSection(section.id);
                      router.push(`#${section.id}`);
                    }}
                    className="block py-1 text-left w-full"
                  >
                    {section.label}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
