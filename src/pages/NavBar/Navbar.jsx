import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navbar = () => {
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p className="cursor-pointer">Gestión de Proyectos</p>
        <Dialog>
          <DialogTrigger>
            <Button>Añadir Proyecto</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>Crear Nuevo Proyecto</DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
