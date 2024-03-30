import "./footer.scss";

function Footer() {
  return (
    <>
      <div id="footer">
        <div id="save_button" className="footer_button">
          Save
        </div>
        <div id="save_to_file_button" className="footer_button">
          Export
        </div>
        <div id="changelog_button" className="footer_button">
          <a href="changelog.txt" target="_blank">
            {import.meta.env.VITE_APP_VERSION}
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
