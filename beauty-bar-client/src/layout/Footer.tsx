export const Footer = () =>{
    return(
        <footer className="ttext-center text-lg-start secondary-colour">
        <div className="container p-4 ">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="accent-element-colour logo">BeautyBar</h5>
              <p className="main-element-colour">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facere numquam voluptates odit ratione cumque aliquam.
              </p>
            </div>
  
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase main-element-colour">Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="main-element-colour">Link 1</a>
                </li>
                <li>
                  <a href="#!" className="main-element-colour">Link 2</a>
                </li>
              </ul>
            </div>
  
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase main-element-colour">Contact</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="main-element-colour">Phone: +1 (123) 456-7890</a>
                </li>
                <li>
                  <a href="#!" className="main-element-colour">Address: 77 Mary Lane, NJ, USA</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className="text-center p-3 main-element-colour" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          &copy; {new Date().getFullYear()} BeautyBar
        </div>
      </footer>
    )
}