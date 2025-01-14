const Footer = () => {
  return (
    <div className="mt-auto">
      <footer className="footer footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
        <aside >
          <p >
            Copyright © {new Date().getFullYear()} - All right reserved by
            DevTinder
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
