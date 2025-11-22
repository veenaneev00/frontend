import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/sections/project-detail.css";

const Header = lazy(() => import("../componets/Header"));
// const Footer = lazy(() => import('../components/Footer'));

interface ProjectData {
  id: number;
  title: string;
  type: string;
  client: string;
  software: string;
  description?: string;
  video?: string;
  images?: string[];
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Project data
  const projects: { [key: string]: ProjectData } = {
    "1": {
      id: 1,
      title: "Rayhaan Obsidian",
      type: "Official Work",
      client: "Rayhaan",
      software: "Blender, Davinci Resolve",
      description: "",
      video: "/videos/rayhaan-detail.mp4",
      images: [
        "/images/rayhaan-1.jpg",
        "/images/rayhaan-2.jpg",
        "/images/rayhaan-3.jpg",
        "/images/rayhaan-4.jpg",
      ],
    },
    "2": {
      id: 2,
      title: "Chanel N5",
      type: "Personal Project",
      client: "Rayhaan",
      software: "Blender, Davinci Resolve",
      description: "Personal project based on the iconic Chanel perfume.",
      video: "/videos/chanel-detail.mp4",
      images: [
        // '/images/chanel-1.jpg',
        // '/images/chanel-2.jpg',
      ],
    },
    "3": {
      id: 3,
      title: "Rayhaan Terra",
      type: "Personal Project",
      client: "Rayhaan",
      software: "Blender, Davinci Resolve",
      description: "Personal project based on the iconic Chanel perfume.",
      video: "/videos/chanel-detail.mp4",
      images: [
        // '/images/chanel-1.jpg',
        // '/images/chanel-2.jpg',
      ],
    },
    "4": {
      id: 4,
      title: "Gucci Flora",
      type: "Official Work",
      client: "Gucci",
      software: "Blender, Davinci Resolve",
      description:
        "Elegant 3D product visualization for the iconic Gucci Flora fragrance line.",
      video: "/videos/gucci-flora-detail.mp4",
      images: [
        "/images/gucci-flora-1.jpg",
        "/images/gucci-flora-2.jpg",
        "/images/gucci-flora-3.jpg",
      ],
    },
    "5": {
      id: 5,
      title: "Airdpods Max",
      type: "Personal Project",
      client: "Personal",
      software: "Blender, Davinci Resolve, Photoshop",
      description:
        "High-fidelity 3D rendering showcasing the premium design and details of Apple AirPods Max.",
      video: "/videos/airpods-max-detail.mp4",
      images: ["/images/airpods-max-1.jpg", "/images/airpods-max-2.jpg"],
    },
    "6": {
      id: 6,
      title: "Rayban Meta",
      type: "Official Work",
      client: "Ray-Ban",
      software: "Blender, Davinci Resolve",
      description:
        "Product visualization for the innovative Ray-Ban Meta smart glasses collaboration.",
      video: "/videos/rayban-meta-detail.mp4",
      images: [
        "/images/rayban-meta-1.jpg",
        "/images/rayban-meta-2.jpg",
        "/images/rayban-meta-3.jpg",
        "/images/rayban-meta-4.jpg",
      ],
    },
    "7": {
      id: 7,
      title: "Moncler Watch",
      type: "Personal Project",
      client: "Personal",
      software: "Blender, Davinci Resolve",
      description:
        "Luxury timepiece visualization capturing the craftsmanship and elegance of Moncler watches.",
      video: "/videos/moncler-watch-detail.mp4",
      images: ["/images/moncler-watch-1.jpg", "/images/moncler-watch-2.jpg"],
    },
    "8": {
      id: 8,
      title: "Skoda Elroq",
      type: "Official Work",
      client: "Skoda",
      software: "Blender, Davinci Resolve, Substance Painter",
      description:
        "Automotive 3D visualization for the electric Skoda Elroq, highlighting modern design and sustainability.",
      video: "/videos/skoda-elroq-detail.mp4",
      images: [
        "/images/skoda-elroq-1.jpg",
        "/images/skoda-elroq-2.jpg",
        "/images/skoda-elroq-3.jpg",
      ],
    },
    "9": {
      id: 9,
      title: "Ca' Lunga",
      type: "Personal Project",
      client: "Personal",
      software: "Blender, Davinci Resolve",
      description:
        "Artistic 3D rendering for the premium Ca' Lunga fragrance, emphasizing Italian elegance.",
      video: "/videos/ca-lunga-detail.mp4",
      images: ["/images/ca-lunga-1.jpg", "/images/ca-lunga-2.jpg"],
    },
    "10": {
      id: 10,
      title: "Louis Vuitton Alzer",
      type: "Official Work",
      client: "Louis Vuitton",
      software: "Blender, Davinci Resolve, Substance Painter",
      description:
        "Premium 3D product showcase for the iconic Louis Vuitton Alzer trunk, highlighting luxury craftsmanship.",
      video: "/videos/louis-vuitton-alzer-detail.mp4",
      images: [
        "/images/louis-vuitton-alzer-1.jpg",
        "/images/louis-vuitton-alzer-2.jpg",
        "/images/louis-vuitton-alzer-3.jpg",
        "/images/louis-vuitton-alzer-4.jpg",
      ],
    },
    // Add more projects
  };

  const project = projects[id || "1"];

  if (!project) {
    return (
      <div className="project-not-found">
        <Suspense fallback={<div className="loading-header" />}>
          <Header />
        </Suspense>
        <div className="not-found-content">
          <h1>Project Not Found</h1>
          <a href="/">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Suspense fallback={<div className="loading-header" />}>
        <Header />
      </Suspense>

      {/* Project Hero */}
      <section className="project-hero">
        <div className="project-hero-container">
          <h1 className="project-detail-title">{project.title}</h1>

          <div className="project-meta">
            <div className="project-meta-item">
              <span className="meta-label">Type:</span>
              <span className="meta-value">{project.type}</span>
            </div>
            <div className="project-meta-item">
              <span className="meta-label">Client:</span>
              <span className="meta-value">{project.client}</span>
            </div>
            <div className="project-meta-item">
              <span className="meta-label">Softwares:</span>
              <span className="meta-value">{project.software}</span>
            </div>
          </div>

          {project.description && (
            <p className="project-description">{project.description}</p>
          )}
        </div>
      </section>

      {/* Video Section */}
      {project.video && (
        <section className="project-video-section">
          <div className="project-video-container">
            <video
              className="project-video"
              controls
              autoPlay
              muted
              loop
              playsInline
              poster={project.images?.[0]}
            >
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="project-gallery">
          <div className="project-gallery-container">
            <div className="gallery-grid">
              {project.images.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Uncomment when Footer is ready */}
      {/* <Suspense fallback={<div className="section-loading" />}>
        <Footer />
      </Suspense> */}
    </div>
  );
};

export default ProjectDetails;
