import { useState } from "react";
import { Typography, CardBody } from "@material-tailwind/react";

const GoogleFormPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <main className="mt-4">
      <CardBody className="flex flex-col gap-4">
        {isLoading && (
          <Typography className="text-center font-normal text-gray-600">
            Loading form...
          </Typography>
        )}
        <div className="w-full">
          <iframe
            src="https://docs.google.com/forms/d/1VYe1PX_ZwyYRbID9hFACufAiCFcmIhFvKj4WvguMBxQ/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            onLoad={handleIframeLoad}
            title="Google Form"
            className={isLoading ? "opacity-0" : "opacity-100"}
            sandbox="allow-scripts allow-forms allow-same-origin"
          >
            Loading…
          </iframe>

          <div className="mt-4 text-center">
            <Typography variant="small" className="text-gray-600">
              Having trouble viewing the form?{" "}
              <a
                href="https://docs.google.com/forms/d/1VYe1PX_ZwyYRbID9hFACufAiCFcmIhFvKj4WvguMBxQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open in new tab
              </a>
            </Typography>
          </div>
        </div>
      </CardBody>
    </main>
  );
};

export default GoogleFormPage;
