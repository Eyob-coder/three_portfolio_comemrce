import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio'
import Ball from './Ball'
import state from '../store'
import { CustomButton } from '../components';
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation
} from '../config/motion'

const Home = () => {
	const snap = useSnapshot(state);

  return (
	<main>
		<div className="ani">
	<AnimatePresence>
		{snap.intro && snap.ball && (
			<motion.section className='home' {...slideAnimation('left')}>
				<motion.header {...slideAnimation('down')}>
					<img 
					src="./threejs.png" 
					alt="logo" 
					className='w-8 h-8 object-contain' 
					/>
				</motion.header>

				<motion.div className='home-content' {...headContainerAnimation}>
					<motion.div {...headTextAnimation} className='head-texts'>
						<h1 className="head-text">LET's <br className='xl:block hidden'/> DO IT</h1>
					</motion.div>
					<motion.div 
						{...headContentAnimation}
						className='flex flex-col gap-5'
					>
						<p className='max-w-md font-normal text-grey-600 text-base'>lets design something great <strong>together</strong></p>

						<CustomButton
						 type='filled' 
						 title='Customize it'
						 handleClick={() => { state.intro = false; state.ball = false}}
						 customStyles='w-fit px-4 py-2.5 font-bold text-sm'
						/>
					</motion.div>
				</motion.div>
			</motion.section>
		)}
		{snap.ball && <Ball/>}
	</AnimatePresence>
	</div>
		<nav>
      <a href="/">SPHERE</a>
      <ul>
        <li>Explore</li>
        <li>Create</li>
      	</ul>
    	</nav>
	</main>
  )
}

export default Home