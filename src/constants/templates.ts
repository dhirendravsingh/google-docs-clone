export const templates = [
    {id: "blank", 
    label : "Blank document",
    imageUrl : "/blank-document.svg",
    initialContent : ``
    },

    {id: "software-proposal", 
    label : "Software development",
    imageUrl : "/software-proposal.svg",
    initialContent: `
            <h1>Software Development Proposal</h1>
            <h2>Project Overview</h2>
            <p>Describe the software project, its goals, and expected outcomes.</p>
            <h2>Scope of Work</h2>
            <p>Detail the functionalities and features that will be developed.</p>
            <h2>Timeline</h2>
            <p>Provide an estimated timeline for project completion.</p>
            <h2>Budget</h2>
            <p>Outline the expected budget and costs.</p>
            <h2>Conclusion</h2>
            <p>Summarize the proposal and provide next steps.</p>
        `
    },

    {id: "project-proposal", 
    label : "Project proposal",
    imageUrl : "/project-proposal.svg",
    initialContent: `
            <h1>Project Proposal</h1>
            <h2>Introduction</h2>
            <p>Provide a brief introduction to the project.</p>
            <h2>Objectives</h2>
            <p>List the objectives and goals of the project.</p>
            <h2>Methodology</h2>
            <p>Describe the methods and approach for executing the project.</p>
            <h2>Deliverables</h2>
            <p>Specify the expected deliverables and outcomes.</p>
            <h2>Budget & Timeline</h2>
            <p>Provide an estimated budget and timeline for completion.</p>
            <h2>Conclusion</h2>
            <p>Summarize the proposal and provide recommendations.</p>
        `
    },

    {id: "business-letter", 
    label : "Business letter",
    imageUrl : "/business-letter.svg",
    initialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, Zip Code]</p>
            <p>[Your Email]</p>
            <p>[Date]</p>
            <br>
            <p>[Recipient Name]</p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>
            <p>[City, State, Zip Code]</p>
            <br>
            <p>Dear [Recipient Name],</p>
            <p>Start your letter with a formal introduction and the purpose of writing.</p>
            <p>Provide relevant details and any necessary background information.</p>
            <p>Conclude with a professional closing statement.</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    },

    {id: "resume", 
    label : "Resume",
    imageUrl : "/resume.svg",
    initialContent: `
    <h1>[Your Name]</h1>
    <p>[Your Contact Information]</p>
    <hr>
    <h2>Summary</h2>
    <p>A brief summary highlighting your skills and experience.</p>
    <h2>Experience</h2>
    <p><strong>[Job Title]</strong> - [Company Name] (Start Date - End Date)</p>
    <p>Describe your responsibilities and achievements.</p>
    <h2>Education</h2>
    <p><strong>[Degree Name]</strong> - [Institution Name], [Year]</p>
    <h2>Skills</h2>
    <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
    </ul>
`
    },

    {id: "cover-letter", 
    label : "Cover letter",
    imageUrl : "/cover-letter.svg",
    initialContent: `
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, Zip Code]</p>
    <p>[Your Email]</p>
    <p>[Date]</p>
    <br>
    <p>[Hiring Manager's Name]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>
    <p>[City, State, Zip Code]</p>
    <br>
    <p>Dear [Hiring Manager's Name],</p>
    <p>Introduce yourself and the position you are applying for.</p>
    <p>Highlight your qualifications and how they align with the job role.</p>
    <p>Conclude with a strong closing statement and a call to action.</p>
    <br>
    <p>Sincerely,</p>
    <p>[Your Name]</p>
`
    },
    
    {id: "letter", 
    label : "Letter",
    imageUrl : "/letter.svg",
    initialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, Zip Code]</p>
            <p>[Your Email]</p>
            <p>[Date]</p>
            <br>
            <p>[Recipient Name]</p>
            <p>[Recipient's Address]</p>
            <p>[City, State, Zip Code]</p>
            <br>
            <p>Dear [Recipient Name],</p>
            <p>Write the body of your letter here.</p>
            <p>Conclude with a closing remark.</p>
            <br>
            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    }
]
