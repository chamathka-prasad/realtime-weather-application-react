import React from 'react'
import logo from '../assets/img/logo.png'


const UpBody = () => {
    return (

        <>

            


                <div className="row">
                    <div className="col-12 mt-5">
                        <div className="row">
                            <div class="col-8 offset-2 text-center fw-bold text-light"> <img src={logo} height={40} /> Weather App</div>

                            <div className="col-lg-6 offset-lg-3 col-10 offset-1 text-center">
                                <div className="input-group mt-5 mb-3">
                                    <input type="text" className="form-control" placeholder="Enter a City" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <button className="btn btnColor fw-bold text-light" style={{ backgroundColor: "#6c5cd2" }} type="button" id="button-addon2">Add City</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            
        </>







    );
}




export default UpBody