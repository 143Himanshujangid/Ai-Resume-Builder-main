import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

function TemplateSelector({ resumeInfo }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(resumeInfo?.template || "classic");

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "A traditional resume layout with a clean, professional look",
      previewImage: "/template-previews/classic-preview.svg",
      color: "#1A365D",
      features: ["Traditional format", "Chronological layout", "Professional appearance"]
    },
    {
      id: "modern",
      name: "Modern",
      description: "A contemporary design with a sleek, minimalist aesthetic",
      previewImage: "/template-previews/modern-preview.svg",
      color: "#2B6CB0",
      features: ["Two-column layout", "Clean spacing", "Visual hierarchy"]
    },
    {
      id: "creative",
      name: "Creative",
      description: "A bold, distinctive layout that showcases your personality",
      previewImage: "/template-previews/creative-preview.svg",
      color: "#805AD5",
      features: ["Unique design elements", "Color accents", "Modern typography"]
    }
  ];

  useEffect(() => {
    if (resumeInfo?.template) {
      setSelectedTemplate(resumeInfo.template);
    }
  }, [resumeInfo]);

  const handleTemplateChange = async (templateId) => {
    setLoading(true);
    setSelectedTemplate(templateId);

    try {
      console.log("Changing template to:", templateId);

      // Update in database first
      const data = {
        data: {
          template: templateId,
        },
      };

      const response = await updateThisResume(resume_id, data);
      console.log("Template update response:", response);

      // Then update Redux store with the full updated resume data
      if (response && response.data) {
        dispatch(addResumeData(response.data));
        console.log("Redux store updated with new template:", templateId);
      } else {
        // Fallback if response doesn't contain the full data
        dispatch(
          addResumeData({
            ...resumeInfo,
            template: templateId,
          })
        );
        console.log("Redux store updated with template (fallback):", templateId);
      }

      toast.success("Template updated successfully");
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-sm text-gray-500">
          Select a professional template that best represents your career goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
              selectedTemplate === template.id
                ? "ring-2 ring-offset-2 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
            style={{
              ringColor: template.color,
              borderColor: selectedTemplate === template.id ? template.color : undefined
            }}
            onClick={() => handleTemplateChange(template.id)}
          >
            {/* Preview image */}
            <div className="relative">
              <img
                src={template.previewImage}
                alt={`${template.name} template preview`}
                className="w-full h-48 object-cover border-b"
              />

              {/* Selected indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
              )}
            </div>

            {/* Template info */}
            <div className="p-4">
              <h3
                className="font-medium text-lg"
                style={{ color: template.color }}
              >
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>

              {/* Features list */}
              <ul className="mt-3 space-y-1">
                {template.features.map((feature, index) => (
                  <li key={index} className="text-xs text-gray-500 flex items-center">
                    <span className="mr-1.5 text-xs">•</span> {feature}
                  </li>
                ))}
              </ul>

              {/* Select button */}
              <Button
                className="w-full mt-4"
                variant={selectedTemplate === template.id ? "default" : "outline"}
                style={{
                  backgroundColor: selectedTemplate === template.id ? template.color : 'transparent',
                  borderColor: template.color,
                  color: selectedTemplate === template.id ? 'white' : template.color
                }}
                onClick={() => handleTemplateChange(template.id)}
              >
                {selectedTemplate === template.id ? "Selected" : "Select Template"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-6 p-2 bg-gray-50 rounded">
          <span className="text-sm text-gray-600">Updating template...</span>
        </div>
      )}
    </div>
  );
}

export default TemplateSelector;
