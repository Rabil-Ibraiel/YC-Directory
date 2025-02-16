"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/validation";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { createStartup } from "@/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const route = useRouter();

  async function handleFormSubmit(prevState: any, formData: FormData) {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      async function handleCreateStartup() {
        const id = await createStartup(formValues);
        route.push(`/startup/${id}`, { scroll: true });
      }

      toast.promise(handleCreateStartup, {
        loading: "Submitting",
        success: "Submited",
        error: "Error when fetching",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = error.flatten().fieldErrors;
        setErrors(fieldError as unknown as Record<string, string>);
        toast.error("Validation Error");

        return { ...prevState, error: "Validation Error", status: "ERROR" };
      } else {
        toast.error("Unkhown Error");
        return { ...prevState, error: "Unkhown Error", status: "ERROR" };
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INTIAL",
  });
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education, ...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem you solve!",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="text-white startup-form_btn "
      >
        {isPending ? "Submitting..." : "Submit your Startup"}
        <Send className="size-6" />
      </Button>
    </form>
  );
};

export default StartupForm;
