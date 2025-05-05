import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);
  const navigate = useNavigate();

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      console.log(
        `Printing from DashBoard List of Resumes got from Backend`,
        resumes.data
      );
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  const handleTemplateClick = (resumeId) => {
    if (resumeId) {
      navigate(`/dashboard/templates/${resumeId}`);
    } else if (resumeList.length > 0) {
      navigate(`/dashboard/templates/${resumeList[0]._id}`);
    } else {
      // If no resumes exist, show a message
      alert("Please create a resume first to access templates");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="font-bold text-3xl">My Resumes</h2>
          <p className="py-2 text-gray-600">Create and manage your professional resumes</p>
        </div>

        {resumeList.length > 0 && (
          <Button
            className="flex items-center gap-2 mt-4 md:mt-0"
            onClick={() => handleTemplateClick(resumeList[0]._id)}
          >
            <LayoutTemplate size={18} />
            Browse Templates
            <ChevronRight size={16} />
          </Button>
        )}
      </div>

      {/* Templates section */}
      {resumeList.length > 0 && (
        <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-blue-900 flex items-center">
                <LayoutTemplate className="mr-2" size={20} />
                Professional Templates
              </h3>
              <p className="text-blue-700 mt-1">
                Choose from our collection of professionally designed resume templates
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => handleTemplateClick(resumeList[0]._id)}
            >
              View All Templates
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Resumes grid */}
      <h3 className="text-xl font-semibold mb-4">My Resumes</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
