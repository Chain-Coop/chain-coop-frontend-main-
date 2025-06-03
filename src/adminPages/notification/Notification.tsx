import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "../../shared/redux/store";
import { RootState } from "../../shared/redux/rootReducer";
import { Button } from "@material-tailwind/react";
import { createNotification } from "../../shared/redux/slices/adminSlices/adminSlices";

const NotificationComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.admin.isCreatingNotification,
  );
  const error = useSelector((state: RootState) => state.admin.error);

  const postNotification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    const body: any = {
      title,
      message,
    };

    dispatch(createNotification(body))
      .unwrap()
      .then(() => {
        setTitle("");
        setMessage("");
        toast.success("Notification created successfully");
      })
      .catch((err: string) => {
        toast.error(err || "Failed to create notification");
      });
  };

  return (
    <main>
      <header className="text-center">
        <h1 className="text-2xl font-bold">Notification</h1>
      </header>
      <form className="w-[60%] py-[4em]" onSubmit={postNotification}>
        <div>
          <label htmlFor="projectTitle" className="mb-3 flex font-medium">
            Notification Title
          </label>
          <input
            type="text"
            id="projectTitle"
            required
            placeholder="Notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input mb-5 h-[4em] w-full rounded-md border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />
        </div>

        <div className="mt-[2em]">
          <label htmlFor="message" className="text-lg font-medium">
            Message
          </label>
          <div className="custom-ckeditor mt-[1.4em] flex w-full rounded-md border-[1px] bg-white shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
            <CKEditor
              editor={ClassicEditor}
              data={message}
              onChange={(_event: any, editor: any) => {
                const data = editor.getData();
                setMessage(data);
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
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <Button
          type="submit"
          className="mt-[4em] w-full rounded-full bg-text2 py-3  text-sm normal-case"
          disabled={loading}
        >
          Post
        </Button>
      </form>
    </main>
  );
};

export default NotificationComponent;
