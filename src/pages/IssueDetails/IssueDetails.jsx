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
import { useEffect } from "react";
import { fetchIssuesById, updateIssueStatus } from "@/Redux/Issue/Action";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {
  const { issueId } = useParams();

  const dispatch = useDispatch();
  const { issueDetails } = useSelector((store) => store.issue);
  const { comments } = useSelector((store) => store.comment);
  const handelUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus({ id: issueId, status }));
  };
  useEffect(() => {
    dispatch(fetchIssuesById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId, dispatch]);
  return (
    <div className="px-20 py-10 text-gray-400">
      <div className="flex justify-between p-10 border rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-lg font-semibold text-gray-400">
              {issueDetails?.title}
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Descripción:</h2>
              <p className="mt-3 text-sm text-gray-400">
                {issueDetails?.description}
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
                    {comments?.map((item) => (
                      <CommentCard item={item} key={item.id} />
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
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="hecho">Hecho</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="px-5 py-3 border-b">Detalles</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex items-center gap-10">
                  <p className="w-[7rem]">Asignado</p>
                  {issueDetails?.assignee?.fullName ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 text-xs">
                        <AvatarFallback>
                          {issueDetails?.assignee?.fullName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p>{issueDetails?.assignee?.fullName}</p>
                    </div>
                  ) : (
                    <p>Sin asignar</p>
                  )}
                </div>

                <div className="flex items-center gap-10">
                  <p className="w-[7rem]">Etiquetas</p>
                  <p>Ninguna</p>
                </div>

                <div className="flex items-center gap-10">
                  <p className="w-[7rem]">Estado</p>
                  <Badge>{issueDetails?.status}</Badge>
                </div>

                <div className="flex items-center gap-10">
                  <p className="w-[7rem]">Comunicado</p>
                  <p>26-12-2024</p>
                </div>

                <div className="flex items-center gap-10">
                  <p className="w-[7rem]">Equipo</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 text-xs">
                      <AvatarFallback>
                        {issueDetails?.assignee?.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <p>{issueDetails?.assignee?.fullName}</p>
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
