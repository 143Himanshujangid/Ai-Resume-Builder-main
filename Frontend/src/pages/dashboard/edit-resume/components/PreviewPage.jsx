import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    console.log("PreviewPage rendered with data:", resumeData);
    console.log("Template selected:", resumeData?.template);
    console.log("Theme color:", resumeData?.themeColor);
  }, [resumeData]);

  // Render the appropriate template based on the template field
  const renderTemplate = () => {
    const templateType = resumeData?.template;
    console.log("Rendering template:", templateType);

    switch (templateType) {
      case "modern":
        console.log("Using Modern Template");
        return <ModernTemplate resumeInfo={resumeData} />;
      case "creative":
        console.log("Using Creative Template");
        return <CreativeTemplate resumeInfo={resumeData} />;
      case "classic":
      default:
        console.log("Using Classic Template (default)");
        return <ClassicTemplate resumeInfo={resumeData} />;
    }
  };

  return (
    <div className="h-full">
      {renderTemplate()}
    </div>
  );
}

export default PreviewPage;
