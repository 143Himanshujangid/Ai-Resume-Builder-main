import React from "react";

function CreativeTemplate({ resumeInfo }) {
  // Log the template being rendered and its color
  console.log("Rendering Creative Template with color:", resumeInfo?.themeColor);

  // Create a lighter version of the theme color for backgrounds
  const getLighterColor = (hexColor) => {
    // Default to black if no color is provided
    const color = hexColor || "#000000";
    // Convert hex to RGB and add opacity
    return `${color}10`;
  };

  return (
    <div className={`shadow-lg h-full bg-white overflow-hidden print-template`}>
      {/* Header section with name and title */}
      <div
        className="p-8 text-white"
        style={{ backgroundColor: resumeInfo?.themeColor || "#000000" }}
      >
        <h1 className="text-2xl font-bold text-center">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <p className="text-center text-sm mt-1">{resumeInfo?.jobTitle}</p>

        {/* Contact info in a row */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
          {resumeInfo?.phone && <span>{resumeInfo.phone}</span>}
          {resumeInfo?.email && <span>{resumeInfo.email}</span>}
          {resumeInfo?.address && <span>{resumeInfo.address}</span>}
        </div>
      </div>

      {/* Main content */}
      <div className="p-8">
        {/* Summary section */}
        {resumeInfo?.summary && (
          <div className="mb-8">
            <div
              className="inline-block px-4 py-1 mb-3 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: resumeInfo?.themeColor || "#000000" }}
            >
              About Me
            </div>
            <p className="text-sm">{resumeInfo.summary}</p>
          </div>
        )}

        {/* Two column layout for the rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            {/* Experience section */}
            {resumeInfo?.experience && resumeInfo.experience.length > 0 && (
              <div className="mb-8">
                <div
                  className="inline-block px-4 py-1 mb-3 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: resumeInfo?.themeColor || "#000000" }}
                >
                  Experience
                </div>

                <div className="space-y-4">
                  {resumeInfo.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: getLighterColor(resumeInfo?.themeColor) }}
                    >
                      <h3 className="text-sm font-bold">{exp.title}</h3>
                      <p className="text-xs">
                        {exp.companyName}
                        {exp.companyName && (exp.city || exp.state) ? ", " : ""}
                        {exp.city}
                        {exp.city && exp.state ? ", " : ""}
                        {exp.state}
                      </p>
                      <p className="text-xs opacity-75">
                        {exp.startDate}{" "}
                        {exp.startDate && (exp.currentlyWorking || exp.endDate) ? " - " : ""}
                        {exp.currentlyWorking ? "Present" : exp.endDate}
                      </p>
                      <div
                        className="text-xs mt-2"
                        dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education section */}
            {resumeInfo?.education && resumeInfo.education.length > 0 && (
              <div>
                <div
                  className="inline-block px-4 py-1 mb-3 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: resumeInfo?.themeColor || "#000000" }}
                >
                  Education
                </div>

                <div className="space-y-3">
                  {resumeInfo.education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: getLighterColor(resumeInfo?.themeColor) }}
                    >
                      <h3 className="text-sm font-bold">{edu.degree}</h3>
                      <p className="text-xs">{edu.schoolName}</p>
                      <p className="text-xs opacity-75">
                        {edu.startYear} - {edu.endYear || "Present"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            {/* Skills section */}
            {resumeInfo?.skills && resumeInfo.skills.length > 0 && (
              <div className="mb-8">
                <div
                  className="inline-block px-4 py-1 mb-3 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: resumeInfo?.themeColor || "#000000" }}
                >
                  Skills
                </div>

                <div className="flex flex-wrap gap-2">
                  {resumeInfo.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: getLighterColor(resumeInfo?.themeColor),
                        borderLeft: `3px solid ${resumeInfo?.themeColor || "#000000"}`
                      }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects section */}
            {resumeInfo?.projects && resumeInfo.projects.length > 0 && (
              <div>
                <div
                  className="inline-block px-4 py-1 mb-3 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: resumeInfo?.themeColor || "#000000" }}
                >
                  Projects
                </div>

                <div className="space-y-4">
                  {resumeInfo.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: getLighterColor(resumeInfo?.themeColor) }}
                    >
                      <h3 className="text-sm font-bold">{project.projectName}</h3>
                      {project.techStack && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.techStack.split(",").map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-white rounded-full text-xs"
                              style={{ color: resumeInfo?.themeColor || "#000000" }}
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <div
                        className="text-xs mt-2"
                        dangerouslySetInnerHTML={{ __html: project?.projectSummary }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreativeTemplate;
