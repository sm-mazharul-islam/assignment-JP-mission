import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="grid grid-cols-2  md:grid-cols-3 md:ml-[150px] text ">
        <div className="text-white">
          <h4>Find us</h4>
          <span style={{ color: "#757575" }}>
            1010 Avenue, sw 54321, chandigarh
          </span>
        </div>
        <div className="text-white">
          <h4>Call us</h4>
          <span style={{ color: "#757575" }}>9876543210 0</span>
        </div>
        <div className="text-white">
          <h4>Mail us</h4>
          <span style={{ color: "#757575" }}>9876543210 0</span>
        </div>
      </div>
      {/* <Divider style={{ background: "white" }}></Divider> */}

      <div className="copyright-area">
        <div className="">
          <div className="">
            <div className="text-center">
              <div className="copyright-text">
                <p>Copyright &copy; 2018, All Right Reserved </p>
              </div>
            </div>
            <div className="">
              {/* <div className="footer-menu">
                <ul>
                  <li>
                    <Link to="#">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Terms</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy</Link>
                  </li>
                  <li>
                    <Link to="#">Policy</Link>
                  </li>
                  <li>
                    <Link to="#">Contact</Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
