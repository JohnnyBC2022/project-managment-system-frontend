import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectForm from "../Project/CreateProjectForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";

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
            <CreateProjectForm/>
          </DialogContent>
        </Dialog>
        <Button variant="ghost">
            Suscripción
        </Button>
      </div>

      <div className="flex gap-3 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" variant="outline" className="rounded-full border-2 border-green-500">
                    <PersonIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <p>Jonathan</p>
      </div>
    </div>
  );
};

export default Navbar;
