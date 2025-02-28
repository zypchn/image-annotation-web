const Footer = () => {
  return (
    <footer
      className={"footer"}
      style={{
        width: "100%",
        borderRadius: "999px",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <p>
        {" "}
        &copy; {new Date().getFullYear()} Copyright: Developed by{" "}
        <b>Zeynep Cahan </b>{" "}
      </p>
    </footer>
  );
};

export default Footer;
