// hooks/useResetForm.js
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const useResetForm = () => {
  const { setFormDataUsuario } = useContext(AppContext);

  const resetFormDataUsuario = () => {
    setFormDataUsuario({
      name: "",
      email: "",
      telefono: "",
      password: "",
      imageUrl: "",
      ubicacion: "",
      publicId: "",
      plan: "gratis",
      estado: "activo",
      role: "Usuario",
      opcion: "crear",
      notificaciones: [
        {
          mensaje: "Bienvenido a Seventwo!. Gracias por registrarte.",
          fecha: new Date(),
          leido: false,
        },
      ],
    });
  };

  const resetFormData = () => {
    resetFormDataUsuario();
  };

  return {
    resetFormData,
    resetFormDataUsuario,
  };
};
export default useResetForm;
