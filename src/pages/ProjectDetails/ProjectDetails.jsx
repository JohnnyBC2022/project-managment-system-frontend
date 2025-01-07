import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
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
  const dispatch=useDispatch();
  const {project}=useSelector(store=>store)
  const {id}=useParams()

  const handleProjectInvitation = () => {};
  useEffect(()=>{
    dispatch(fetchProjectById(id))
  },[id])
  return (
    <>
      <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                {project.projectDetails?.name}
              </h1>
              <div className="space-y-5 pb-10 text-sm">
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
                      <Avatar className="cursor-pointer" key={item}>
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
                      <DialogHeader>Invitar al Equipo</DialogHeader>
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
                <p className="py-5 border-b text-lg -tracking-wider">Tareas</p>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
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
