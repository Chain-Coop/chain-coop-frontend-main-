import React from "react";
import "./explore.css"
import explore1 from "../../../Assets/png/home/personlaptop.png"
import explore2 from "../../../Assets/png/home/tech-project.webp"
import explore3 from "../../../Assets/png/home/tech-jet-project.webp"
import person1 from "../../../Assets/png/home/Co-op-PX1.png";
import person2 from "../../../Assets/png/home/Co-op-PX2.png";


const Explore = () => {
  return (
    <main className="flex h-full items-center justify-center font-sans sm:mt-[1em] lg:mt-[5em]">
      <section className="sm:px-[1em] lg:w-[86%] lg:px-[0]">
        <header className="py-8 text-text4">
          <h1 className="mb-2 font-bold text-center sm:text-[1.2em] md:text-2xl lg:text-3xl">
            Explore Our Investment Opportunities
          </h1>
          <div className="lg:w-[53%] m-auto">
          <p className="font-sans sm:text-center lg:mt-[1.5em]">
            Invest in Tomorrow: Explore innovative, self sustaining businessess backed by the 
          power of block chain and cooperative ownership.
          </p>
          </div>
        </header>

        <div className="wrapper flex gap-[24px] flex-wrap items-center w-full">
    <div className="card">
      <div className="poster"><img src={explore1} alt="Location Unknown"/></div>
      <div className="details">
        <h1>Automated Ai Learning Platform</h1>
        <p className="desc">
          Our upcoming project leverages cutting-edge AI to streamline learning processes, designed to enhance productivity and unlock new growth opportunities for forward-thinking companies.
        </p>
      <div className="tags">
      <span className="tag">Investment</span>
      <span className="tag">Growth</span>
      <span className="tag">Innovation</span>
    </div>
			<div className="cast">
				<h3>Cast</h3>
				<ul>
					<li><img src={person1} alt="Marco Andrews" title="Marco Andrews"/></li>
					<li><img src={person2} alt="Rebecca Floyd" title="Rebecca Floyd"/></li>
				</ul>
			</div>
		</div>
	</div>
	<div className="card">
		<div className="poster"><img src={explore2} alt="explore-img"/></div>
		<div className="details">
    <h1>Automated Ai Learning Platform</h1>
      <p className="desc">
        Our upcoming project leverages cutting-edge AI to streamline learning processes, designed to enhance productivity and unlock new growth opportunities for forward-thinking companies.
      </p>
      <div className="tags">
      <span className="tag">Investment</span>
      <span className="tag">Growth</span>
      <span className="tag">Innovation</span>
    </div>
      <div className="cast">
				<h3>Cast</h3>
				<ul>
					<li><img src={person1} alt="Marco Andrews" title="Marco Andrews"/></li>
					<li><img src={person2} alt="Rebecca Floyd" title="Rebecca Floyd"/></li>
				</ul>
			</div>
		</div>
	</div>
	<div className="card">
		<div className="poster"><img src={explore3} alt="Location Unknown"/></div>
		<div className="details">
    <h1>Automated Ai Learning Platform</h1>
      <p className="desc">
        Our upcoming project leverages cutting-edge AI to streamline learning processes, designed to enhance productivity and unlock new growth opportunities for forward-thinking companies.
      </p>
      <div className="tags">
      <span className="tag">Investment</span>
      <span className="tag">Growth</span>
      <span className="tag">Innovation</span>
    </div>
      <div className="cast">
				<h3>Cast</h3>
				<ul>
					<li><img src={person1} alt="Marco Andrews" title="Marco Andrews"/></li>
					<li><img src={person2} alt="Rebecca Floyd" title="Rebecca Floyd"/></li>
				</ul>
			</div>
		</div>
	</div>
</div>
      </section>
    </main>
  );
};

export default Explore;


