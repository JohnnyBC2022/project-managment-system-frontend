import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();

  const handleProjectInvitation = () => {};
  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);
  return (
    <>
      <div className="mt-5 lg:px-10">
        <div className="justify-between gap-5 pb-4 lg:flex">
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className="w-full pb-10 text-gray-400">
              <h1 className="pb-5 text-lg font-semibold">
                {project.projectDetails?.name}
              </h1>
              <div className="pb-10 space-y-5 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-xl ">
                  {project.projectDetails?.description}
                </p>

                <div className="flex">
                  <p className="w-36">Jefe de Projecto:</p>
                  <p>{project.projectDetails?.owner.fullName}</p>
                </div>

                <div className="flex">
                  <p className="w-36">Equipo: </p>
                  <div className="flex items-center gap-2">
                    {project.projectDetails?.team.map((item) => (
                      <Avatar className="cursor-pointer" key={item.id}>
                        <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button
                          className="ml-2"
                          size="sm"
                          onClick={handleProjectInvitation}
                        >
                          <span>Invitar</span>
                          <PlusIcon className="w-3 h-3" />
                        </Button>
                      </DialogClose>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invitar al Equipo</DialogTitle>
                      </DialogHeader>
                      <InviteUserForm />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex">
                  <p className="w-36">Categoría:</p>
                  <p>{project.projectDetails?.category}</p>
                </div>

                <div className="flex">
                  <p className="w-36">Estado:</p>
                  <Badge>En progreso</Badge>
                </div>
              </div>

              <section>
                <p className="py-5 text-lg border-b -tracking-wider">Tareas</p>
                <div className="justify-between gap-3 py-5 lg:flex md:flex">
                  <IssueList status="pendiente" title="Pendiente" />
                  <IssueList status="en_progreso" title="En Progreso" />
                  <IssueList status="hecho" title="Terminado" />
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
