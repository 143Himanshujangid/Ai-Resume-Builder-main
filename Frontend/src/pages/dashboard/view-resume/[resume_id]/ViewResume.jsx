import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { ArrowLeft, Download, Share2 } from "lucide-react";

function ViewResume() {
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeData = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    setLoading(true);
    try {
      const response = await getResumeData(resume_id);
      console.log("Resume data loaded:", response.data);
      dispatch(addResumeData(response.data));
    } catch (error) {
      console.error("Error fetching resume:", error);
      toast.error("Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    console.log("Printing resume with template:", resumeData?.template);
    console.log("Printing resume with color:", resumeData?.themeColor);
    window.print();
  };
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header - will be hidden during print */}
      <div id="noPrint" className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Download size={16} />
              Download PDF
            </Button>

            <RWebShare
              data={{
                text: `Check out my professional resume created with AI Resume Builder`,
                url: window.location.href,
                title: `${resumeData?.firstName || 'My'} Resume`,
              }}
              onClick={() => toast.success("Resume link copied to clipboard")}
            >
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                Share
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4">
        {/* Title - will be hidden during print */}
        <div id="noPrint" className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            {loading ? "Loading resume..." : `${resumeData?.firstName || ''} ${resumeData?.lastName || ''}'s Resume`}
          </h1>
          <p className="text-gray-600">
            Your professional resume is ready to download or share
          </p>
        </div>

        {/* Resume preview */}
        <div className="flex justify-center">
          <div
            id="resumeContainer"
            className="bg-white rounded-lg shadow-lg overflow-hidden print-container"
            style={{ width: "210mm", minHeight: "297mm" }}
          >
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading resume...</p>
              </div>
            ) : (
              <ResumePreview />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewResume;
