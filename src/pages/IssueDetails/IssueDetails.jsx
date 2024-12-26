import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const handelUpdateIssueStatus = (status) => {
    console.log(status);
  };

  return (
    <div className="px-20 py-10 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-lg font-semibold text-gray-400">
              Crear Navbar
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Descripción</h2>
              <p className="text-gray-400 text-sm mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="pb-3">Actividad</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">Todo</TabsTrigger>
                  <TabsTrigger value="comments">Comentarios</TabsTrigger>
                  <TabsTrigger value="history">Historial</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  Todos los cambios de la cuenta aquí
                </TabsContent>

                <TabsContent value="comments">
                  {<CreateCommentForm issueId={issueId} />}
                  <div className="mt-8 space-y-5">
                    {[1, 1, 1].map((item) => (
                      <CommentCard key={item} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  Cambios en el historial aquí
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handelUpdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pendiente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in_progress">En Progreso</SelectItem>
              <SelectItem value="done">Hecho</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Detalles</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Asignado</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                    <p>Jonathan Baragaño</p>
                  </div>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Etiquetas</p>
                  <p>Ninguna</p>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Estado</p>
                  <Badge>En Progreso</Badge>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Comunicado</p>
                  <p>26-12-2024</p>
                </div>

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Equipo</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                    <p>Jonathan Baragaño</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
