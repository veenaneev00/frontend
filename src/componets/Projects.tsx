import { useState } from 'react';
import '../assets/css/sections/projects.css';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Rayhaan Obsidian',
      image: '/images/project-1.jpg',
      category: 'Product',
    },
    {
      id: 2,
      title: 'Chanel N5',
      image: '/images/project-2.jpg',
      category: 'Luxury',
    },
    {
      id: 3,
      title: 'Rayhaan Terra',
      image: '/images/project-3.jpg',
      category: 'Abstract',
    },
    {
      id: 4,
      title: 'Gucci Flora',
      image: '/images/project-4.jpg',
      category: 'Fragrance',
    },
    {
      id: 5,
      title: 'Airdpods Max',
      image: '/images/project-5.jpg',
      category: '3D Art',
    },
    {
      id: 6,
      title: 'Rayban Meta',
      image: '/images/project-6.jpg',
      category: 'Product',
    },
    {
      id: 7,
      title: 'Moncler Watch',
      image: '/images/project-7.jpg',
      category: 'Jewelry',
    },
    {
      id: 8,
      title: 'Skoda Elroq',
      image: '/images/project-8.jpg',
      category: 'Packaging',
    },
    {
      id: 9,
      title: 'Ca’ Lunga',
      image: '/images/project-9.jpg',
      category: 'Fragrance',
    },
    {
      id: 10,
      title: 'Louis Vuitton Alzer',
      image: '/images/project-10.jpg',
      category: '3D Design',
    },
  ];

  return (
    <section className="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <h2 className="projects-title">PORTFOLIO ARCHIVE</h2>
        </div>

        {/* Regular Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/project/${project.id}`}
              className="project-item"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                />
              </div>
              
              <div className={`project-overlay ${hoveredProject === project.id ? 'project-overlay-visible' : ''}`}>
                <div className="project-info">
                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;