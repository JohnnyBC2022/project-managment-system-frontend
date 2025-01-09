import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectForm from "../Project/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

const Navbar = () => {
  const navigate = useNavigate();
  const {auth}=useSelector(store=>store)
  const dispatch=useDispatch()

  const handleLogout = ()=>{
    dispatch(logout())
  }
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b">
      <div className="flex items-center gap-3">
        <p className="cursor-pointer" onClick={() => navigate("/")}>
          Gestión de Proyectos
        </p>
        <Dialog>
          <DialogTrigger>
            <Button>Añadir Proyecto</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>Crear Nuevo Proyecto</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button onClick={() => navigate("/upgrade_plan")} variant="ghost">
          Suscripción
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              size="icon"
              variant="outline"
              className="border-2 border-green-500 rounded-full"
            >
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
    </div>
  );
};

export default Navbar;
