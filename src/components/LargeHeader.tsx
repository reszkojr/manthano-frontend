import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { HiUserCircle } from 'react-icons/hi2';

import AuthContext from '../context/AuthContext';

const Header = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const redirect = () => navigate('/');
	return (
		<header id='header'>
			<div className='text-gray flex items-center justify-around px-60 pt-10 text-xl'>
				<ReactSVG src='/m_manthano.svg' onClick={() => redirect()} className='w-12 cursor-pointer' />
				<div className='flex space-x-64'>
					<div className='flex space-x-12'>
						<Link className='transition-colors hover:text-white' to='/'>
							Home
						</Link>
						<Link className='transition-colors hover:text-white' to='/classroom'>
							Classroom
						</Link>
						<Link className='transition-colors hover:text-white' to='/faq'>
							FAQ
						</Link>
						<Link className='transition-colors hover:text-white' to='/contribute'>
							Contribute
						</Link>
					</div>
				</div>
				<div className=''>
					{user ? (
						<Link to='/profile'>
							<div className='flex space-x-2 transition-colors hover:text-white'>
								<HiUserCircle className='mt-1 h-auto w-6' /> <span>{user.username}</span>
							</div>
						</Link>
					) : (
						<Link className='call-to-btn w-60 rounded-[10px] bg-gradient-to-bl from-teal-500 to-lapis-500 px-4 py-2 font-sans' to='/login'>
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
