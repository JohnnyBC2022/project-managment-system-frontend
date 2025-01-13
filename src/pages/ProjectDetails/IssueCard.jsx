import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue, updateIssueStatus } from "@/Redux/Issue/Action";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateIssueForm from "./CreateIssueForm";

const IssueCard = ({ item, projectId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleIssueDelete = () => {
    dispatch(deleteIssue(item.id));
  };

  const handleIssueUpdate = () => {
    setIsOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    dispatch(updateIssueStatus({ id: item.id, status: newStatus }));
  };

  const statusOptions = {
    pendiente: ["en_progreso", "hecho"],
    en_progreso: ["pendiente", "hecho"],
    hecho: ["pendiente", "en_progreso"],
  };

  return (
    <Card className="py-1 pb-2 rounded-md">
      <CardHeader className="py-0 pb-1">
        <div className="flex items-center justify-between">
          <CardTitle
            className="cursor-pointer"
            onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}
          >
            {item.title}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="rounded-full" size="icon" variant="ghost">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {statusOptions[item.status].map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onClick={() => handleStatusChange(status)}
                >
                  {status === "pendiente" && "Pendiente"}
                  {status === "en_progreso" && "En Progreso"}
                  {status === "hecho" && "Terminado"}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem onClick={handleIssueUpdate}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleIssueDelete}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <p>Tarea - {item.id}</p>
          <DropdownMenu className="w-[30rem] border border-red-400">
            <DropdownMenuTrigger>
              <Button
                className="text-white bg-gray-900 rounded-full hover:text-green-300"
                size="icon"
              >
                <Avatar>
                  <AvatarFallback>
                    <PersonIcon />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserList issueDetails={item} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar Tarea</DialogTitle>
            </DialogHeader>
            <CreateIssueForm issueData={item} status={item.status} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
