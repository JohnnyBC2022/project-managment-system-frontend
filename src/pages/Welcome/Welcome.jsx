import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/auth");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-5 text-center space-y-7">
        <div className="flex justify-center">
          <ArchiveIcon className="w-32 h-32 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold">¡Gestiona tus proyectos!</h1>
        <p className="text-xl">Crea tu cuenta o inicia sesión pulsando en el botón</p>
        <Button onClick={handleNavigate} className="mt-5">
          Ir a Iniciar Sesión / Registrarse
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
