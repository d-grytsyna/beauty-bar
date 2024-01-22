export const Categories = () =>{
    return (
        <div>
            <div className="container mt-5 mb-5">
                <h1 className="accent-element-colour w-100 text-center">START YOUR JOURNEY!</h1>
                <div className="row mt-3 gy-5">
                    <div className="col-lg-5 makeup-main-block"></div>
                    <div className="col-lg-7 d-flex align-items-center flex-column justify-content-center">
                        <h3 >MAKE-UP</h3>
                        <p className="categories-banner-text secondary-element-colour">At our salon, we use high-quality, professional-grade products to ensure a long-lasting and stunning finish. Our makeup artists stay updated on the latest trends and techniques, ensuring that you leave our salon feeling confident and radiant.</p>
                    </div>

                    <div className="col-lg-7 d-flex align-items-center flex-column justify-content-center">
                    <h3>HAIR</h3>
                        <p className="categories-banner-text secondary-element-colour">Using premium products and state-of-the-art techniques, we prioritize the health and vibrancy of your hair. Whether you crave a chic and sophisticated haircut or wish to experiment with vibrant hues, our salon is your go-to destination for personalized and expert hair care.</p>
                    </div>
                    <div className="col-lg-5 hair-main-block">

                    </div>

                    <div className="col-lg-5 nails-main-block"></div>
                    <div className="col-lg-7 d-flex align-items-center flex-column justify-content-center">
                        <h3>NAILS</h3>
                        <p className="categories-banner-text secondary-element-colour">From classic manicures to trendy gel enhancements, we offer a wide range of services to suit your individual preferences. Immerse yourself in a world of color, creativity, and precision as our experts deliver flawless nail treatments that leave a lasting impression.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}