import React, { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./general.css";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../shared/redux/store";
import { Project } from "../../shared/types";
import { Button } from "@material-tailwind/react";
import { useAllProjects } from "../../shared/Hooks/useUserProfile";
import { createProject } from "../../shared/redux/slices/adminSlices/adminSlices";
import FormSelect from "../../components/common/formSelect";

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse">
    <div className="mt-[2em] h-64 rounded-xl bg-gray-200"></div>
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="h-40 rounded-lg bg-gray-200"></div>
      <div className="h-40 rounded-lg bg-gray-200"></div>
    </div>
  </div>
);

const ProjectCard: React.FC<{
  project: Project;
  onClick: (project: Project) => void;
}> = ({ project, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = project.documentUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [project.documentUrl]);

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-cover bg-center"
      style={{
        backgroundImage:
          imageLoaded && !imageError ? `url(${project.documentUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => onClick(project)}
    >
      <article
        className={`p-6 ${!imageLoaded || imageError ? "bg-gray-100" : ""}`}
      >
        <h1 className="text-lg font-medium uppercase text-text3">
          {project.title}
        </h1>
        <Button className="mt-4 bg-coming2 text-black">{project.status}</Button>
        {!imageLoaded && !imageError && (
          <div className="mt-4">
            <ReactLoading type="spin" color="#718096" height={30} width={30} />
          </div>
        )}
        {imageError && (
          <p className="mt-4 text-red-500">Failed to load image</p>
        )}
      </article>
    </div>
  );
};

const ProjectManagement: React.FC = () => {
  const { allProjects, isLoading } = useAllProjects();
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [projectPrice, setProjectPrice] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const editorRef = useRef<any | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setProjectPrice("");
    setStatus(null);
    setFile(null);
    if (editorRef.current) {
      editorRef.current.setData("");
    }
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !description || !projectPrice || !file || !status) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectPrice", projectPrice);
    formData.append("status", status);
    if (file) {
      formData.append("document", file);
    }

    try {
      await dispatch(createProject(formData)).unwrap();
      toast.success("Project created successfully!");
      resetForm();
    } catch (error: any) {
      toast.error(error || "Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Add onSelect handler for FormSelect
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  // Extract projects array from response - adjust property name as needed
  const projectsArray = Array.isArray(allProjects)
    ? allProjects
    : allProjects?.data || [];

  return (
    <main>
      <header className="text-center">
        <h1 className="text-2xl font-bold">Project Management</h1>
      </header>
      <form className="w-[60%] py-[4em]" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectTitle" className="mb-3 flex font-medium">
            Project Title
          </label>
          <input
            type="text"
            id="projectTitle"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            className="input mb-5 h-[4em] w-full rounded-md border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />
        </div>

        <div className="mt-[2em]">
          <label htmlFor="message" className="text-lg font-medium">
            Description
          </label>
          <div className="custom-ckeditor mt-[1.4em] flex w-full rounded-md border-[1px] bg-white shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(_event: any, editor: any) => {
                const data = editor.getData();
                setDescription(data);
              }}
              config={{
                toolbar: [
                  "bold",
                  "italic",
                  "|",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "outdent",
                  "indent",
                ],
                placeholder: "Write something...",
                removePlugins: [
                  "CKFinderUploadAdapter",
                  "CKFinder",
                  "EasyImage",
                  "Image",
                  "ImageCaption",
                  "ImageStyle",
                  "ImageToolbar",
                  "ImageUpload",
                  "MediaEmbed",
                ],
              }}
            />
          </div>

          <div className="mt-[2em]">
            <label htmlFor="amount" className="mb-3 flex font-medium">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              required
              value={projectPrice}
              onChange={(e) => setProjectPrice(e.target.value)}
              placeholder="Enter project amount"
              className="input mb-5 h-[3em] min-w-[30%] rounded-md border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => document.getElementById("fileInput")?.click()}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
              >
                Choose File
              </button>
              <span className="ml-4 text-gray-500">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            <div className="w-[11em]">
              <FormSelect
                placeholder="Select Status"
                label="Status"
                options={["Coming Soon"]}
                onSelect={handleStatusChange}
                value={status || ""}
              />
            </div>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="mt-[4em] w-full rounded-full bg-text2 py-3 text-sm normal-case"
            disabled={loading}
          >
            Upload Project
          </Button>
        </div>
      </form>
      <section>
        <header>
          <h1 className="text-2xl font-bold">Previous Projects</h1>
        </header>
        <div className="projects-list mt-10">
          {isLoading ? (
            <SkeletonLoader />
          ) : projectsArray.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsArray.map((project: Project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No projects available.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectManagement;
