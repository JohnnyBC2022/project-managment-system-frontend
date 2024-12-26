import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const Login = () => {
  const form = useForm({
    //resolver:zod
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("registrarse:", data);
  };
  return (
    <div className="space-y-5">
      <h1 className="text-xl">Iniciar Sesión</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full py-5 px-5 border-gray-700"
                    placeholder="Tu mejor correo electrónico..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full py-5 px-5 border-gray-700"
                    placeholder="Contraseña..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full  text-white uppercase mt-5">
            Iniciar Sesión
          </Button>
          <p className="mt-5">¿Todavía no tienes tu cuenta?</p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
