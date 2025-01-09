import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProject, openEditProjectModal } from "@/Redux/Project/Action";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import { DialogTitle } from "@radix-ui/react-dialog";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen]= useState(false)

  const handleDelete = () => {
    dispatch(deleteProject({ projectId: item.id }));
  };
  
  const handleUpdate = ()=>{
    setIsOpen(true)
  }

  return (
    <Card className="w-full p-5 lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate("/project/" + item.id)}
                className="text-lg font-bold cursor-pointer"
              >
                {item.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400">{item.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-full" size="icon">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleUpdate}>Actualizar</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {item.tags.map((tag) => (
            <Badge key={item.id} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Proyecto</DialogTitle>
          </DialogHeader>
          <CreateProjectForm projectData={item} /> {/* Pasa los datos del proyecto al formulario */}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProjectCard;
