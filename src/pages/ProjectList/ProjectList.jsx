import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { tags } from "@/constants";

const ProjectList = () => {
  const handleFilterChange = (section, value) => {
    console.log("value", value, section);
  };

  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filterSection">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl tracking-wider">Filtros</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>

            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Categoría</h1>
                  <div className="pt-5">
                    <RadioGroup
                    className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) => {
                        handleFilterChange("category", value);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">Todas</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="fullStack" id="r2" />
                        <Label htmlFor="r2">Full Stack</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="frontend" id="r3" />
                        <Label htmlFor="r3">Frontend</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="backend" id="r4" />
                        <Label htmlFor="r4">Backend</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-10">
                  <h1 className="pb-3 text-gray-400 border-b">Etiqueta</h1>
                  <div className="pt-5">
                    <RadioGroup
                    className="space-y-3 pt-5"
                      defaultValue="Todas"
                      onValueChange={(value) => {
                        handleFilterChange("tag", value);
                      }}
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-3 spacec-y-7">
                          <RadioGroupItem value={item} id={`r-${item}`} />
                          <Label htmlFor={`r-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem]"></section>
      </div>
    </>
  );
};

export default ProjectList;
