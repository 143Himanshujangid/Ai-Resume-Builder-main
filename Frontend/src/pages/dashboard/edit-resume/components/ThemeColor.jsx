import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateResumeData } from "@/Services/GlobalApi";
import { updateThisResume } from "@/Services/resumeAPI";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  // Professional color palette
  const colors = [
    // Professional blues
    "#1A365D", // Dark blue
    "#2A4365", // Navy blue
    "#2B6CB0", // Royal blue
    "#3182CE", // Blue
    "#4299E1", // Light blue

    // Professional greens
    "#22543D", // Dark green
    "#276749", // Forest green
    "#2F855A", // Green
    "#38A169", // Medium green
    "#48BB78", // Light green

    // Professional reds/browns
    "#742A2A", // Dark red
    "#9B2C2C", // Brick red
    "#C53030", // Red
    "#822727", // Burgundy
    "#744210", // Brown

    // Professional grays/blacks
    "#1A202C", // Almost black
    "#2D3748", // Dark gray
    "#4A5568", // Medium gray
    "#718096", // Light gray
    "#A0AEC0", // Very light gray
  ];

  const [selectedColor, setSelectedColor] = useState();
  const { resume_id } = useParams();
  const onColorSelect = async (color) => {
    setSelectedColor(color);
    console.log("Changing theme color to:", color);

    try {
      // Update in database first
      const data = {
        data: {
          themeColor: color,
        },
      };

      const response = await updateThisResume(resume_id, data);
      console.log("Theme color update response:", response);

      // Then update Redux store with the full updated resume data
      if (response && response.data) {
        dispatch(addResumeData(response.data));
        console.log("Redux store updated with new theme color:", color);
      } else {
        // Fallback if response doesn't contain the full data
        dispatch(
          addResumeData({
            ...resumeInfo,
            themeColor: color,
          })
        );
        console.log("Redux store updated with theme color (fallback):", color);
      }

      toast.success("Theme Color Updated");
    } catch (error) {
      console.error("Error updating theme color:", error);
      toast.error("Error updating theme color");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          {" "}
          <Palette /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor == item && "border border-black"}
             `}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
