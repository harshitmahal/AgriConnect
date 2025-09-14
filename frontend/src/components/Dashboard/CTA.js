import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CTA() {

  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("loginData"));
    setUser(storedUser); // keep full object
    console.log(storedUser);
  }, []);

  return (<>

    {(!user || user.full_name === "") && (
      <section id="cta" className="bg-green-700 text-white text-center py-16 px-6">
        <h3 className="text-3xl font-bold mb-4 font-reg">Join AgriConnect Today</h3>
        <p className="mb-6 font-reg">Whether you're a farmer or a buyer, sign up now to start trading fresh produce directly.</p>
        <div className="space-x-4 margin-reg">

          <Link to="/sign-up">
            <span className='text-green'>Register as Farmer</span>
          </Link>
          <Link to="/sign-up">
            <span className='text-green'>Register as Buyer</span>
          </Link>

          {/* <button className="btn-reg text-green-700 px-6 py-2 rounded hover:bg-gray-100 mb-4 "></button>
        <button className="btn-reg text-green-700 px-6 py-2 rounded hover:bg-gray-100 ml-2 btn-2">Register as Buyer</button> */}
        </div>
        <div className='mb-4'>
          <p className="mb-6 font-reg">Already a User? </p>
          {/* <button className="btn-signin text-green-700 px-6 py-2 rounded hover:bg-gray-100 mb-4 mr-2"> */}
          <Link to="/login">
            <span className='text-green'>Sign In</span>
          </Link>
          {/* </button> */}
        </div>
      </section>
    )
    }
  </>

  );
}

export default CTA;
