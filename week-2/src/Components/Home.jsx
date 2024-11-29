import React, { useEffect, useState } from 'react';
import img from '../image/img.jpeg';
import img2 from '../image/img2.png';
import web1 from '../image/web1.png'
import web2 from '../image/web2.png'
import web3 from '../image/web3.png'
import web4 from '../image/web4.png'
import web5 from '../image/web5.png'
import web6 from '../image/web6.png'
import web7 from '../image/web7.png'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  'use strict';

  useEffect(() => {
    function progressBarAndCountNumber() {
      const progress = document.querySelectorAll('.progress');
      let count = 0;
      const MAX = 100;
      const interval = setInterval(() => {
        count++;
        progress.forEach((element) => {
          if (count <= element.dataset.progress) {
            element.parentElement.style.background = `conic-gradient(#f9004d ${count}%, #212428 0)`;
            element.firstElementChild.textContent = `${count}%`;
          }
        });
        if (count >= MAX) {
          clearInterval(interval);
        }
      }, 20);
    }
    progressBarAndCountNumber();
  }, []);

  useEffect(() => {
    gsap.to('.head', {
      filter: "blur(1px)",
      scrollTrigger: {
        trigger: "body", 
        start: "top top",
        end: "1%",
        scrub: 1,
        markers: false,
        toggleActions: "play none none reverse"
      },
    });
  }, []);

  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [msj, setMsj] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!name || !email || !subject || !password) {
      alert("Please fill all details");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        password,
        subject,
        msj,
      });

      setName("");
      setEmail("");
      setPassword("");
      setSubject("");
      setMsj("");

      alert("Thanks for visiting!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  return (
    <div>
      <center>
        <header>
          <div className='header_main' >
            <div className="head"></div>
            <div className="logo">
              <span style={{ color: "#ee1e4a" }}>M</span>ansi
            </div>

            <div className="navbar">
              <a href="" style={{ color: "#ee1e4a" }}>Home</a>
              <a href="#about">About me</a>
              <a href="#section3">Skill</a>
              <a href="#section4">Work</a>
              <a href="#section5" style={{ marginRight: "10px" }}>Contact </a>
            </div>

            <button className="filter">
              <i className="fa-solid fa-gear"></i>
            </button>
            <div className="click_fill" id="click_1">
              <button className="orange_bt"></button>
              <button className="blue_bt"></button>
              <button className="pink_bt"></button>
              <button className="purple_bt"></button>
            </div>
            <button className='menu'>
              <i className="fa-solid fa-bars-staggered"></i>
            </button>

            <div className="right_menu">
              <button className='cross'>
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="menu_nav">
                <button id='menu_btn'><a href="">Home</a></button>
                <button id='menu_btn'><a href="#about">About me</a></button>
                <button id='menu_btn'><a href="#section3">Skill</a></button>
                <button id='menu_btn'><a href="">Work</a></button>
                <button id='menu_btn'><a href="">Contact</a></button>
              </div>
            </div>
          </div>
        </header>
      </center>

      {/* section-1 */}
      <br />
      <div className="container-fluid mb-4" id='section'>
        <div className="container" id='sec1_con'>
          <div className="row" id='sec1_row'>
            <div id='sec1_col1' className="col col-lg-6 col-sm-12 col-md-12">
              <img src={img} className="img-fluid" alt="..." />
            </div>
            <div id='sec1_text' className="col col-lg-6 col-sm-12 col-md-12">
              <h3 className='color'>Hi, I am</h3>
              <h1>Mansi Zariya</h1>
              <div className="text_ani">
                <span className='text text_first' >I am a</span>
                <span className='text text_second ms-2'>Web Developer</span>
              </div>
              <div className="sec1_btn">
                <button>Download CV</button>
                <button style={{ marginLeft: "10px" }} onClick={handlePopup}>Hire me <i className="ri-arrow-right-up-line"></i></button>
              </div>

            </div>
          </div>
        </div>
      </div>
      {popup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={handlePopup}>
              &times;
            </button>
            <h2>Hire Me</h2>
            <p>
              Thank you for your interest! Please contact me at{' '}
              <a href="mailto:mansi@gmail.com">mansi@gmail.com</a> or fill out the form to get in touch.
            </p>
            <form>
              <div>
                <label>Name:</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div>
                <label>Email:</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              
            
              <button type="submit">Send</button>
              <button type="submit" onClick={handlePopup}className='ms-3'>close</button>
            </form>
          </div>
        </div>
      )}

      <br />
      <div className="container-fluid" id='about'>
        <h1>About <span>Me</span></h1>
        <div className="container" id='section2'>
          <div className="row">
            <div className="col col-sm-12 com-md-12 col-lg-4 col-xs-12" id='sec2_col1'>
              <h2>"I am a Passionate Web Developer"</h2>
              <br />
              <p>Lorem ipsum dolor, consectetur adipisicing nam sunt dignissimos natus expedita accusantium quaerat, alias quis hic facere ad dicta, explicabo itaque amet cum.</p>
              <ul>
                <li><strong>Full Name :</strong> Mansi Zariya</li>
                <li><strong>Age :</strong> 19</li>
                <li><strong>Address :</strong> Rajkot, Gujrat</li>
                <li><strong>Phone Number :</strong> 01222255544</li>
                <li><strong>Email :</strong> <a href="mailto:mansi@gmail.com">mansi@gmail.com</a></li>
              </ul>
            </div>
            <div className="col col-sm-12 com-md-12 col-lg-4 col-xs-12" id='sec2_img'>
              <img src={img2} className="img-fluid" alt="..." />
            </div>
            <div className="col col-sm-12 com-md-12 col-lg-4 col-xs-12">
              <div className="row">
                <div className="col" id='lan1'>
                  <div className="devloping" id='hobby'>
                    <i className="fa-solid fa-desktop"></i>
                  </div>
                  <div className="cinema" id='hobby'>
                    <i className="fa-solid fa-film"></i>
                  </div>
                </div>
                <div className="col" id='lan1'>
                  <div className="coffee" id='hobby'>
                    <i className="fa-solid fa-mug-hot"></i>
                  </div>
                  <div className="music" id='hobby'>
                    <i className="fa-solid fa-music"></i>
                  </div>
                </div>
                <div className="col" id='lan1'>
                  <div className="games" id='hobby'>
                    <i className="fa-solid fa-puzzle-piece"></i>
                  </div>
                  <div className="Painting" id='hobby'>
                    <i className="fa-solid fa-paintbrush"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="container-fluid" id='section3'>
        <h1>My <span>Skill</span></h1>
        <div className="container" id='section3_con'>
          <div className="row" id='section3_row'>
            <div className="col col-lg-4">
              <div className="parent-skill">
                <div className="skill">
                  <div className="progress" data-progress="90" id='r1'>
                    <span className="progress-number">0%</span>
                  </div>
                </div>
                <span className="title" style={{ color: "#f6ea7a", fontWeight: "700" }}>HTML</span>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="parent-skill">
                <div className="skill">
                  <div className="progress" data-progress="80" id='r2'>
                    <span className="progress-number">0%</span>
                  </div>
                </div>
                <span className="title" style={{ color: "#e583a9", fontWeight: "700" }}>CSS</span>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="parent-skill">
                <div className="skill">
                  <div className="progress" data-progress="65" id='r3'>
                    <span className="progress-number">0%</span>
                  </div>
                </div>
                <span className="title" style={{ color: "#a2ebfe", fontWeight: "700" }}>JavaScript</span>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="parent-skill">
                <div className="skill">
                  <div className="progress" data-progress="70" id='r3'>
                    <span className="progress-number">0%</span>
                  </div>
                </div>
                <span className="title" style={{ color: "#a2ebfe", fontWeight: "700" }}>React</span>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="parent-skill">
                <div className="skill">
                  <div className="progress" data-progress="100" id='r2'>
                    <span className="progress-number">0%</span>
                  </div>
                </div>
                <span className="title" style={{ color: "#e583a9", fontWeight: "700" }}>Bootstrap</span>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="parent-skill">
                <div className="skill">
                  <div className="progress" data-progress="55" id='r1'>
                    <span className="progress-number">0%</span>
                  </div>
                </div>
                <span className="title" style={{ color: "#f6ea7a", fontWeight: "700" }}  >c language</span>
              </div>
            </div>
          </div>
          <div className="row" id='section3_row2'>

            <h1 className='mt-4'>My <span>Education</span></h1>
            <div className="col col-lg-6 col-md-12 col-sm-12" id='ed_1'>
              <div className="card1" style={{ backgroundColor: "#edf3b3" }}>
                <button id='card1_btn'>2020-2022</button>
                <h2>SSC-HSC</h2>
                <span>Panchshil School</span>
                <p>I have my complete my ssc and hsc in Panchshil school  with 80-95 pr in rajkot.</p>
              </div>
            </div>
            <div className="col col-lg-6 col-md-12 col-sm-12" id='ed_1' >
              <div className="card1" style={{ backgroundColor: "#ffd5df" }}>
                <button id='card1_btn'>2022</button>
                <h2>Graphic</h2>
                <span>Red & White Institute</span>
                <p>I have Basic knowlage of Ui/Ux and App/Web design,and i learn graphic language like photoshoap,figma.</p>
              </div>
            </div>
            <div className="col col-lg-6 col-md-12 col-sm-12" id='ed_1'>
              <div className="card1" style={{ backgroundColor: "#d5f6ff" }}>
                <button id='card1_btn'>2022-2024..+</button>
                <h2>Fullstack</h2>
                <span>Red & White Institute</span>
                <p>Currently i am learning full stack course in RNW.I have complete Html,Css,Js,React,C lan,Bootstrap.</p>
              </div>
            </div>
            <div className="col col-lg-6 col-md-12 col-sm-12" id='ed_1'>
              <div className="card1" style={{ backgroundColor: "#d6ffd5" }}>
                <button id='card1_btn'>2024</button>
                <h2>BCA</h2>
                <span>Saurashtra University / SPG</span>
                <p>Currently i am third sem of Bachelor of Computer Applications.</p>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>

      <div className="container-fluid" id='section4'>
      <h1>My <span>Project</span></h1>
        <div className="container" id='sec4_con'>
           <div className="row" id='sec4_row'>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://bootstrap-web-omega.vercel.app/"><img src={web1} alt="" /></a>
                  {/* <h3 className='bg_text'>Interior web</h3> */}
              </div>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://rocket-taupe.vercel.app/"><img src={web2} alt="" /></a>
                  {/* <h3 className='bg_text' >Interior web</h3> */}
              </div>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://interior-inky.vercel.app/"><img src={web3} alt="" /></a>
                  {/* <h3 className='bg_text'>Interior web</h3> */}
              </div>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://fruit-dusky-eight.vercel.app/"><img src={web4} alt="" /></a>
                  {/* <h3 className='bg_text'>Interior web</h3> */}
              </div>              
           </div>
           <div className="row" id='sec4_row'>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://wavy-nine.vercel.app/"><img src={web5} alt="" /></a>
                  {/* <h3 className='bg_text' >Interior web</h3> */}
              </div>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://cake-olive-five.vercel.app/"><img src={web7} alt="" /></a>
                  <h3 className='bg_text'>Interior web</h3>
              </div>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <a href="https://perfume-theta-gilt.vercel.app/"><img src={web6} alt="" /></a>
                  {/* <h3 className='bg_text'>Interior web</h3> */}
              </div>
              <div className="col col-lg-3 col-sm-6 col-xs-12 mt-2" id='col1'>
                  <img src={web1} alt="" />
                  {/* <h3 className='bg_text'>Interior web</h3> */}
              </div>
           </div>
        </div>
      </div>

      <div className="container-fluid" id='section5'>
      <h1>Contact <span>Me</span></h1>
<br /><br /><br />
              <div className="container" id='contact'>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Name :" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email :" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password :" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input 
              type="text" 
              name="subject" 
              placeholder="Subject :" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea 
              name="message" 
              rows="5" 
              placeholder="Message :" 
              value={msj}
              onChange={(e) => setMsj(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <p><strong>Phone:</strong> +152 534-468-854</p>
          <p><strong>Email:</strong> contact@example.com</p>
          <p><strong>Location:</strong> C/54 Northwest Freeway, Suite 558, Houston, USA 485</p>
        </div>
      </div>
      </div>


      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 80%;
          max-width: 400px;
          text-align: center;
          position: relative;
        }
        .popup-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        form div {
          margin: 10px 0;
        }
        input,
        textarea {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          background: #f9004d;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #e00042;
        }
      `}</style>
    </div>
  );
}
