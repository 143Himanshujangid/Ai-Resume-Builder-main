import React from "react";
import PersonalDeatailPreview from "../preview-components/PersonalDeatailPreview";
import SummeryPreview from "../preview-components/SummaryPreview";
import ExperiencePreview from "../preview-components/ExperiencePreview";
import EducationalPreview from "../preview-components/EducationalPreview";
import SkillsPreview from "../preview-components/SkillsPreview";
import ProjectPreview from "../preview-components/ProjectPreview";

function ModernTemplate({ resumeInfo }) {
  // Log the template being rendered and its color
  console.log("Rendering Modern Template with color:", resumeInfo?.themeColor);

  return (
    <div
      className={`shadow-lg h-full p-14 bg-white print-template`}
      style={{
        borderLeft: `8px solid ${resumeInfo?.themeColor ? resumeInfo.themeColor : "#000000"}`,
      }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-1/3 p-4" style={{ backgroundColor: `${resumeInfo?.themeColor}15` }}>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
              {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <p className="text-sm font-medium">{resumeInfo?.jobTitle}</p>
            <p className="text-xs mt-1">{resumeInfo?.address}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
              Contact
            </h3>
            <div className="text-xs space-y-1">
              <p>{resumeInfo?.phone}</p>
              <p>{resumeInfo?.email}</p>
            </div>
          </div>

          {resumeInfo?.skills && resumeInfo.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
                Skills
              </h3>
              <div className="space-y-2">
                {resumeInfo.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-xs font-medium">{skill.name}</p>
                    {skill.name && (
                      <div className="h-1.5 bg-gray-200 w-full mt-1">
                        <div
                          className="h-1.5"
                          style={{
                            backgroundColor: resumeInfo.themeColor,
                            width: skill?.rating * 20 + "%",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3">
          {resumeInfo?.summary && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
                Professional Summary
              </h3>
              <div className="text-xs">
                <SummeryPreview resumeInfo={resumeInfo} />
              </div>
            </div>
          )}

          {resumeInfo?.experience && resumeInfo.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
                Work Experience
              </h3>
              <div className="space-y-4">
                {resumeInfo.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 pl-3" style={{ borderColor: resumeInfo?.themeColor }}>
                    <h4 className="text-xs font-bold">{exp.title}</h4>
                    <p className="text-xs">
                      {exp.companyName}
                      {exp.companyName && (exp.city || exp.state) ? ", " : ""}
                      {exp.city}
                      {exp.city && exp.state ? ", " : ""}
                      {exp.state}
                    </p>
                    <p className="text-xs text-gray-500">
                      {exp.startDate}{" "}
                      {exp.startDate && (exp.currentlyWorking || exp.endDate) ? " - " : ""}
                      {exp.currentlyWorking ? "Present" : exp.endDate}
                    </p>
                    <div
                      className="text-xs mt-1"
                      dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeInfo?.projects && resumeInfo.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
                Projects
              </h3>
              <div className="space-y-4">
                {resumeInfo.projects.map((project, index) => (
                  <div key={index}>
                    <h4 className="text-xs font-bold">{project.projectName}</h4>
                    {project.techStack && (
                      <p className="text-xs">
                        <span className="font-medium">Tech Stack:</span> {project.techStack.split(",").join(" | ")}
                      </p>
                    )}
                    <div
                      className="text-xs mt-1"
                      dangerouslySetInnerHTML={{ __html: project?.projectSummary }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeInfo?.education && resumeInfo.education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
                Education
              </h3>
              <div className="space-y-3">
                {resumeInfo.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="text-xs font-bold">{edu.degree}</h4>
                    <p className="text-xs">{edu.schoolName}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startYear} - {edu.endYear || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;
