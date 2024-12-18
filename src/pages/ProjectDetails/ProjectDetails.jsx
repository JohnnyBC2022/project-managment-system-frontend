import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";

const ProjectDetails = () => {

    const handleProjectInvitation=()=>{

    }

  return (
    <>
      <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                Crear un proyecto de Ecommerce
              </h1>
              <div className="space-y-5 pb-10">
                <p className="w-full md:max-w-lg lg:max-w-xl">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
                  harum laudantium nemo ducimus quibusdam culpa dignissimos!
                </p>

                <div className="flex">
                  <p className="w-36">Jefe de Projecto:</p>
                  <p>Jonathan</p>
                </div>

                <div className="flex">
                  <p className="w-36">Equipo: </p>
                  <div className="flex items-center gap-2">
                    {[1, 1, 1, 1].map((item) => (
                      <Avatar className="cursor-pointer" key={item}>
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button className="ml-2" size="sm" onClick={handleProjectInvitation}>
                          <span>Invitar</span>
                          <PlusIcon className="w-3 h-3" />
                        </Button>
                      </DialogClose>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            Añadir Miembro
                            <InviteUserForm />
                        </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex">
                  <p className="w-36">Categoría:</p>
                  <p>fullstack</p>
                </div>

                <div className="flex">
                  <p className="w-36">Estado:</p>
                  <Badge>En progreso</Badge>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
