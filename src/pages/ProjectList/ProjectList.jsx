import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { tags } from "@/constants";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");

  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFilterCategory = (value) => {
    if (value.toLowerCase() === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ category: value }));
    }
  };

  const handleFilterTags = (value) => {
    if (value.toLowerCase() === "todas") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ tag: value }));
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  return (
    <>
      <div className="relative justify-center gap-5 px-5 py-5 lg:px-0 lg:flex">
        <section className="filterSection">
          <Card className="sticky p-5 top-10">
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
                      className="pt-5 space-y-3"
                      defaultValue="Todas"
                      onValueChange={(value) => {
                        handleFilterCategory(value);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">Todas</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="fullstack" id="r2" />
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
                      className="pt-5 space-y-3"
                      defaultValue="all"
                      onValueChange={(value) => {
                        handleFilterTags(value);
                      }}
                    >
                      {tags.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 spacec-y-7"
                        >
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
        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex items-center justify-between gap-2 pb-5">
            <div className="relative w-full p-0">
              <Input
                className="40% rounded-full px-10"
                placeholder="Buscar proyecto..."
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>

          <div>
            <div className="space-y-5 min-h-[74vh]">
              {keyword
                ? project.searchProjects?.map((item, index) => (
                    <ProjectCard key={`${item.id}-${index}`} item={item} />
                  ))
                : project.projects?.map((item) => (
                    <ProjectCard key={`project-${item.id}`} item={item} />
                  ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectList;
