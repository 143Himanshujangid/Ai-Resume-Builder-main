import React, { useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams, useNavigate } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Button } from "@/components/ui/button";
import { LayoutTemplate } from "lucide-react";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getResumeData(resume_id).then((data) => {
      dispatch(addResumeData(data.data));
    });
  }, [resume_id]);

  return (
    <div className="p-6 md:p-10">
      {/* Template button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate(`/dashboard/templates/${resume_id}`)}
        >
          <LayoutTemplate size={16} />
          Change Template
        </Button>
      </div>

      {/* Resume editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ResumeForm />
        <PreviewPage />
      </div>
    </div>
  );
}

export default EditResume;
