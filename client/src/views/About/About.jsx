import React from "react";
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.about}>
      <h1 className={style.titulo}>Countries</h1>
      <p className={style.parrafo}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quo expedita facilis, voluptatem ipsa quisquam voluptatum nostrum dolores necessitatibus laudantium amet ipsam ratione quasi maiores odio esse aperiam non reprehenderit?
      </p>
      <p className={style.parrafo}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, consequuntur. Tempore tenetur quisquam aut quos aperiam eos, sunt minima nemo reiciendis ea velit nam vitae sint corporis! Ipsam, eligendi nesciunt.
      </p>
      <p className={style.parrafo}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione culpa eos vel tenetur eveniet repellat, natus alias unde, blanditiis nemo! Ipsa nemo et, minima similique consectetur suscipit eius dolores!
      </p>
      <p className={style.parrafo}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos minima voluptate nostrum doloremque officia, ullam ratione tempore quia? Et, quas hic earum alias sint similique voluptatibus inventore debitis deleniti repellendus?
      </p>
      <p className={style.parrafo}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nisi maiores magni praesentium eligendi laborum minima tenetur sequi quasi veniam, deleniti, vitae impedit! Omnis odio cumque est porro velit ipsum.
      </p>
      <p className={style.fecha}>
        React + Redux <p className={style.fecha2}>Año 2023</p>
      </p>
      <p className={style.by}>
        Santiago Marich <p className={style.by2}>Full Stack Developer</p>
      </p>
    </div>
  );
}

export default About;