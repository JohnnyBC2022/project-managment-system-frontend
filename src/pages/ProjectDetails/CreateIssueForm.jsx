import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createIssue, updateIssue } from "@/Redux/Issue/Action";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CreateIssueForm = ({ status, issueData }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const form = useForm({
    //resolver:zod
    defaultValues: {
      issueName: issueData?.title || "",
      description: issueData?.description || "",
    },
  });

  const onSubmit = (data) => {
    if (issueData) {
      // Actualizar tarea existente
      dispatch(
        updateIssue(issueData.id, {
          title: data.issueName,
          description: data.description,
          projectId: id,
          status,
        })
      );
    } else {
      // Crear nueva tarea
      dispatch(
        createIssue({
          title: data.issueName,
          description: data.description,
          projectId: id,
          status,
        })
      );
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="issueName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-5 py-5 border border-gray-700"
                    placeholder="Nombre tarea..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-5 py-5 border border-gray-700"
                    placeholder="Descripción..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5 text-white uppercase">
              {issueData ? "Actualizar Tarea" : "Crear Tarea"}
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
