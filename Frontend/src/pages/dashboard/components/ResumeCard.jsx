import { FaEye, FaEdit, FaTrashAlt, FaBook, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Professional gradient combinations
const gradients = [
  // Blue gradients
  "from-blue-900 via-blue-700 to-blue-500",
  "from-indigo-900 via-blue-800 to-blue-600",
  "from-slate-800 via-blue-800 to-blue-600",

  // Green gradients
  "from-emerald-900 via-emerald-700 to-emerald-500",
  "from-teal-800 via-teal-700 to-teal-500",

  // Gray/neutral gradients
  "from-gray-900 via-gray-700 to-gray-500",
  "from-slate-900 via-slate-700 to-slate-500",

  // Subtle gradients
  "from-slate-700 via-slate-600 to-slate-500",
  "from-blue-800 via-blue-700 to-blue-600",
  "from-gray-800 via-gray-700 to-gray-600",
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const gradient = getRandomGradient();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete Resume with ID", resume._id);
    try {
      const response = await deleteThisResume(resume._id);
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };
  return (
    <div
      className={`p-5 bg-gradient-to-r ${gradient} h-[380px] sm:h-auto rounded-lg flex flex-col justify-between shadow-lg transition duration-300 ease-in-out cursor-pointer hover:shadow-xl`}
    >
      <div className="flex items-center justify-center p-6 bg-white rounded-t-lg shadow-md">
        <h2
          className={`text-center font-bold text-md mx-2 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
        >
          {resume.title}
        </h2>
      </div>
      <div className="flex items-center justify-around p-4 bg-white rounded-b-lg shadow-md">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
          className="mx-2"
        >
          <FaEye className="text-gray-600 hover:text-indigo-600 transition duration-300 ease-in-out" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
          className="mx-2"
        >
          <FaEdit className="text-gray-600 hover:text-purple-600 transition duration-300 ease-in-out" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setOpenAlert(true)}
          className="mx-2"
        >
          <FaTrashAlt className="text-gray-600 hover:text-pink-600 transition duration-300 ease-in-out" />
        </Button>
        <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
