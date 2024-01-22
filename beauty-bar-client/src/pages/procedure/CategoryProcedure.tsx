export const CategoryProcedure = () => {
    return (
        <div className="container flex-grow-1 pt-5 pb-5">
            <div className="row g-0">
                <a href="/procedure/hair"  className="col-lg-4 category-link-block">
                <div className="hair-category-block category-block ">
                   <div> <h1 className="text-center category-header main-element-colour">HAIR</h1> </div> 
                </div>
                </a>
                
                <a href="/procedure/makeup" className="col-lg-4 category-link-block">
                <div className="makeup-category-block category-block ">
                <div> <h1 className="text-center category-header main-element-colour">MAKE-UP</h1> </div> 
                </div>
                </a>
                
              <a href="/procedure/nails" className="col-lg-4 category-link-block">
              <div className=" nails-category-block category-block">
                <div> <h1 className="text-center category-header main-element-colour">NAILS</h1> </div> 
                </div>
              </a>
                
            </div>
            
    
        </div>
    );
}