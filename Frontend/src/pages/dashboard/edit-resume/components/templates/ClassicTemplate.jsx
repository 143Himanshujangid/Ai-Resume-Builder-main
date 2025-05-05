import React from "react";
import PersonalDeatailPreview from "../preview-components/PersonalDeatailPreview";
import SummeryPreview from "../preview-components/SummaryPreview";
import ExperiencePreview from "../preview-components/ExperiencePreview";
import EducationalPreview from "../preview-components/EducationalPreview";
import SkillsPreview from "../preview-components/SkillsPreview";
import ProjectPreview from "../preview-components/ProjectPreview";

function ClassicTemplate({ resumeInfo }) {
  // Log the template being rendered and its color
  console.log("Rendering Classic Template with color:", resumeInfo?.themeColor);

  return (
    <div
      className={`shadow-lg h-full p-14 border-t-[20px] print-template`}
      style={{
        borderColor: resumeInfo?.themeColor ? resumeInfo.themeColor : "#000000",
      }}
    >
      <PersonalDeatailPreview resumeInfo={resumeInfo} />
      <SummeryPreview resumeInfo={resumeInfo} />
      {resumeInfo?.experience && <ExperiencePreview resumeInfo={resumeInfo} />}
      {resumeInfo?.projects && <ProjectPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.education && <EducationalPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.skills && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
}

export default ClassicTemplate;
