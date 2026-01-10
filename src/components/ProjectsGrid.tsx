import React from 'react';

const ProjectsGrid: React.FC = () => {
    const projects = [
        {
            title: 'Project 1',
            description: 'Description of Project 1',
            link: '#'
        },
        {
            title: 'Project 2',
            description: 'Description of Project 2',
            link: '#'
        },
        {
            title: 'Project 3',
            description: 'Description of Project 3',
            link: '#'
        },
        {
            title: 'Project 4',
            description: 'Description of Project 4',
            link: '#'
        }
    ];

    return (
        <div className="projects-grid">
            {projects.map((project, index) => (
                <div key={index} className="project-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.link}>View Project</a>
                </div>
            ))}
        </div>
    );
};

export default ProjectsGrid;