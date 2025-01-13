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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { tags } from "@/constants";
import { createProject, updateProject } from "@/Redux/Project/Action";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateProjectForm = ({ projectData }) => {
  const dispatch = useDispatch();

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");

    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];

    form.setValue("tags", updatedTags);
  };

  const form = useForm({
    //resolver:zod
    defaultValues: {
      projectId: projectData?.id || "",
      name: projectData?.name || "",
      description: projectData?.description || "",
      category: projectData?.category || "fullstack",
      tags: projectData?.tags || ["Javascript", "React"],
    },
  });

  console.log("Valores del formulario:", form.getValues());

  const onSubmit = (data) => {
    console.log("Datos recibidos al enviar el formulario:", data);
    if (projectData) {
      console.log("Datos del proyecto para actualizar:", {
        ...data,
        projectId: projectData.id,
      });
      dispatch(updateProject(projectData.id, { ...data }));
    } else {
      dispatch(createProject(data));
    }

    console.log("crear datos del proyecto:", data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-5 py-5 border border-gray-700"
                    placeholder="Nombre del proyecto..."
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
                    placeholder="Descripción del proyecto..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value || "fullstack"}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      handleTagsChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Etiquetas" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item) => (
                        <SelectItem key={item.id} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex flex-wrap gap-1">
                  {field.value.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleTagsChange(item)}
                      className="flex items-center gap-2 px-4 py-1 border rounded-full cursor-pointer"
                    >
                      <span className="text-sm">{item}</span>
                      <Cross1Icon className="w-3 h-3" />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            {false ? (
              <div>
                <p>
                  Con el plan gratuito solo puedes crear 3 proyectos, por favor
                  amplía tu suscripción
                </p>
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full mt-5 text-white uppercase"
              >
                {projectData ? "Actualizar Proyecto" : "Crear Proyecto"}
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
