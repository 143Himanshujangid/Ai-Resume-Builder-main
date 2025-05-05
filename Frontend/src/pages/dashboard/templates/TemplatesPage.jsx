import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { getResumeData } from "@/Services/resumeAPI";
import TemplateSelector from "../edit-resume/components/TemplateSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileEdit } from "lucide-react";

function TemplatesPage() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeData = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    if (resume_id) {
      getResumeData(resume_id).then((data) => {
        dispatch(addResumeData(data.data));
      });
    }
  }, [resume_id, dispatch]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-3xl font-bold">Resume Templates</h1>
        </div>
        
        {resume_id && (
          <Button 
            onClick={() => navigate(`/dashboard/edit-resume/${resume_id}`)}
            className="flex items-center gap-2"
          >
            <FileEdit size={18} />
            Continue Editing
          </Button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Choose from our collection of professionally designed resume templates. 
            Each template is optimized for ATS compatibility while showcasing your 
            skills and experience in a visually appealing format.
          </p>
          
          {resumeData ? (
            <TemplateSelector resumeInfo={resumeData} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading templates...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemplatesPage;
