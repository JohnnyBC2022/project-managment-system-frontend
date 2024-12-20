import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
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
                    <p className="text-gray-400 text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="mt-5">
                    <h1 className="pb-3">Actividad</h1>
                    <Tabs defaultValue="comments" className="w-[400px]">
                        <TabsList className="mb-5">
                            <TabsTrigger value="all">
                                Todo
                            </TabsTrigger>
                            <TabsTrigger value="comments">
                                Comentarios
                            </TabsTrigger>
                            <TabsTrigger value="history">
                                Historial
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            Todos los cambios de la cuenta aquí
                        </TabsContent>

                        <TabsContent value="comments">
                            {/* <CreateCommentForm  issueId={issueId}/> */}
                        </TabsContent>

                        <TabsContent value="history">
                            Cambios en el historial aquí
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </ScrollArea>
   </div>
  </div>);
};

export default IssueDetails;
