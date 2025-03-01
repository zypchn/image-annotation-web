import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Modal from "react-bootstrap/Modal";

const ImageLoader = ({ src, alt, thumbnailSize = "200x200", className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const thumbnailSrc = src ? `${src}?size=${thumbnailSize}` : null;

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        className={`image-container ${className || ""}`}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <LazyLoadImage
          alt={alt || "Tablet image"}
          src={src}
          placeholderSrc={
            thumbnailSrc || "https://via.placeholder.com/200?text=Loading..."
          }
          effect="blur"
          threshold={100}
          onClick={handleClick}
          wrapperClassName="image-wrapper"
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          afterLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div
            className="image-placeholder"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{alt || "Image View"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-0">
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageLoader;
